package rent.api.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import rent.common.dtos.AccountCalculationDto;
import rent.common.dtos.AccountServiceCalculationDto;
import rent.common.entity.*;
import rent.common.enums.CalculationType;
import rent.common.enums.ParameterType;
import rent.common.interfaces.IPeriod;
import rent.common.repository.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.concurrent.*;

@Service
public class CalculationService {
    private final Logger log = LoggerFactory.getLogger(getClass());

    private final Integer appCalculationThreadsCount;
    private final String appLocale;
    private final AccountRepository accountRepository;
    private final WorkingPeriodRepository workingPeriodRepository;
    private final AccountAccrualRepository accountAccrualRepository;
    private final AccountRecalculationRepository accountRecalculationRepository;
    private final NormRepository normRepository;
    private final SystemPropertyService systemPropertyService;
    private final AccountOpeningBalanceRepository accountOpeningBalanceRepository;
    private final AccountPaymentRepository accountPaymentRepository;

    @Autowired
    public CalculationService(@Value("${app.calculation.threads.count}") Integer appCalculationThreadsCount,
                              @Value("${app.locale}") String appLocale,
                              AccountRepository accountRepository,
                              WorkingPeriodRepository workingPeriodRepository,
                              AccountAccrualRepository accountAccrualRepository,
                              AccountRecalculationRepository accountRecalculationRepository,
                              NormRepository normRepository,
                              SystemPropertyService systemPropertyService,
                              AccountOpeningBalanceRepository accountOpeningBalanceRepository,
                              AccountPaymentRepository accountPaymentRepository) {
        this.appCalculationThreadsCount = appCalculationThreadsCount;
        this.appLocale = appLocale;
        this.accountRepository = accountRepository;
        this.workingPeriodRepository = workingPeriodRepository;
        this.accountAccrualRepository = accountAccrualRepository;
        this.accountRecalculationRepository = accountRecalculationRepository;
        this.normRepository = normRepository;
        this.systemPropertyService = systemPropertyService;
        this.accountOpeningBalanceRepository = accountOpeningBalanceRepository;
        this.accountPaymentRepository = accountPaymentRepository;
        if (systemPropertyService.getCalculationIsActive()) {
            systemPropertyService.setCalculationActive(false);
        }
    }

    public List<AccountCalculationDto> getAccountCalculations(String accountId, String workingPeriodId) {
        AccountEntity account = accountRepository.findOne(accountId);
        WorkingPeriodEntity workingPeriod = workingPeriodRepository.findOne(workingPeriodId);
        LocalDate accountDateClose = account.getDateClose();
        List<AccountCalculationDto> list = new ArrayList<>();
        if (accountDateClose == null || accountDateClose.compareTo(workingPeriod.getDateStart()) > 0) {
            List<AccountServiceEntity> accountServices = getListForPeriod(workingPeriod, account.getServices());
            for (AccountServiceEntity accountService : accountServices) {
                AccountAccrualEntity accountAccrual = accountAccrualRepository.findByAccountServiceIdAndWorkingPeriodId(accountService.getId(), workingPeriod.getId());
                if (accountAccrual != null) {
                    Double openingBalance = accountOpeningBalanceRepository.getSumByAccountServiceIdAndWorkingPeriodId(accountService.getId(), workingPeriod.getId());
                    Double accrual = accountAccrual.getValue();
                    Double recalculation = accountRecalculationRepository.getSumByAccountServiceIdAndWorkingPeriodId(accountService.getId(), workingPeriod.getId());
                    Double payment = accountPaymentRepository.getSumByAccountServiceIdAndWorkingPeriodId(accountService.getId(), workingPeriod.getId());
                    if (openingBalance == null) openingBalance = 0D;
                    if (recalculation == null) recalculation = 0D;
                    if (payment == null) payment = 0D;
                    Double closingBalance = roundHalfUp(openingBalance + accrual + recalculation - payment);
                    AccountCalculationDto accountCalculationDto = new AccountCalculationDto();
                    accountCalculationDto.setAccountServiceId(accountService.getId());
                    accountCalculationDto.setService(accountService.getService());
                    accountCalculationDto.setTariff(accountAccrual.getTariff());
                    accountCalculationDto.setTariffCalculationType(accountAccrual.getTariffCalculationType());
                    accountCalculationDto.setTariffMeasurementUnit(accountAccrual.getTariffMeasurementUnit());
                    accountCalculationDto.setTariffValue(accountAccrual.getTariffValue());
                    accountCalculationDto.setConsumption(accountAccrual.getConsumption());
                    accountCalculationDto.setOpeningBalance(openingBalance);
                    accountCalculationDto.setAccrual(accrual);
                    accountCalculationDto.setRecalculation(recalculation);
                    accountCalculationDto.setPayment(payment);
                    accountCalculationDto.setClosingBalance(closingBalance);
                    list.add(accountCalculationDto);
                }
            }
        }
        return list;
    }

    public WorkingPeriodEntity getCurrentWorkingPeriod() {
        return workingPeriodRepository.getFirstByIdIsNotNullOrderByDateStartDesc();
    }

    private WorkingPeriodEntity createNewWorkPeriod(WorkingPeriodEntity currentWorkingPeriod) {
        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("LLLL yyyy", Locale.forLanguageTag(appLocale));
        WorkingPeriodEntity newWorkingPeriod = new WorkingPeriodEntity();
        LocalDate dateStart = currentWorkingPeriod.getDateEnd().plusDays(1);
        LocalDate dateEnd = dateStart.withDayOfMonth(dateStart.lengthOfMonth());
        newWorkingPeriod.setName(dateStart.format(dateTimeFormatter));
        newWorkingPeriod.setDateStart(dateStart);
        newWorkingPeriod.setDateEnd(dateEnd);
        workingPeriodRepository.save(newWorkingPeriod);
        return newWorkingPeriod;
    }

    public void calculateAccount(String accountId, String periodStartId, String periodEndId) {
        log.debug("calculateAccount({}, {}, {})", accountId, periodStartId, periodEndId);

        AccountEntity account = accountRepository.findOne(accountId);
        WorkingPeriodEntity periodStart = workingPeriodRepository.findOne(periodStartId);
        WorkingPeriodEntity periodEnd = workingPeriodRepository.findOne(periodEndId);
        WorkingPeriodEntity currentWorkingPeriod = getCurrentWorkingPeriod();
        List<WorkingPeriodEntity> workingPeriods = workingPeriodRepository.find(periodStart.getDateStart(), periodEnd.getDateStart());
        LocalDate accountDateClose = account.getDateClose();

        if (accountDateClose == null || accountDateClose.compareTo(currentWorkingPeriod.getDateStart()) > 0) {
            for (WorkingPeriodEntity workingPeriod : workingPeriods) {
                List<AccountServiceEntity> accountServicesAll = account.getServices();
                for (AccountServiceEntity accountService : accountServicesAll) {
                    deleteCalculationsForPeriod(accountService.getId(), currentWorkingPeriod.getId(), workingPeriod.getId());
                }
                List<AccountServiceEntity> accountServices = getListForPeriod(workingPeriod, accountServicesAll);
                List<AccountServiceCalculationDto> accountCalculations = new ArrayList<>();
                for (AccountServiceEntity accountService : accountServices) {
                    TariffEntity tariff = accountService.getTariff();
                    if (tariff != null) {
                        List<TariffValueEntity> tariffValues = getListForPeriod(workingPeriod, tariff.getValues());
                        if (tariffValues.size() > 0) {
                            TariffValueEntity tariffValue = tariffValues.get(0);
                            String calculationTypeCode = tariffValue.getCalculationType().getCode();
                            AccountServiceCalculationDto accountServiceCalculationDto = null;
                            if (calculationTypeCode.equals(CalculationType.TOTAL_AREA.getCode())) {
                                accountServiceCalculationDto = calculateByTotalArea(workingPeriod, account, accountService, tariffValue);
                            } else if (calculationTypeCode.equals(CalculationType.PEOPLES.getCode())) {
                                accountServiceCalculationDto = calculateByPeoples(workingPeriod, account, accountService, tariffValue);
                            } else if (calculationTypeCode.equals(CalculationType.METER_READING.getCode())) {
                                accountServiceCalculationDto = calculateByMeterReading(workingPeriod, account, accountService, tariffValue);
                            } else if (calculationTypeCode.equals(CalculationType.METER_READING_WATER.getCode())) {
                                accountServiceCalculationDto = calculateByMeterReadingWater(workingPeriod, account, accountService, tariffValue);
                            }
                            if (accountServiceCalculationDto != null) {
                                accountServiceCalculationDto = calculateAccountServiceGivenDaysActive(workingPeriod, accountServiceCalculationDto);
                                accountServiceCalculationDto.setTariff(tariff);
                                accountServiceCalculationDto.setTariffCalculationType(tariffValue.getCalculationType());
                                accountServiceCalculationDto.setTariffMeasurementUnit(tariffValue.getMeasurementUnit());
                                accountServiceCalculationDto.setTariffValue(tariffValue.getValue());
                                if (!currentWorkingPeriod.getId().equals(workingPeriod.getId())) {
                                    accountServiceCalculationDto = calculateAccountServiceGivenPreviousRecalculation(workingPeriod, accountServiceCalculationDto);
                                }
                            }
                            if (accountServiceCalculationDto != null) {
                                accountCalculations.add(accountServiceCalculationDto);
                            }
                        }
                    }
                }
                saveAccountCalculations(accountCalculations, currentWorkingPeriod, workingPeriod);
            }
        }
    }

    private AccountServiceCalculationDto calculateAccountServiceGivenPreviousRecalculation(WorkingPeriodEntity workingPeriod, AccountServiceCalculationDto accountServiceCalculationDto) {
        String accountServiceId = accountServiceCalculationDto.getAccountService().getId();
        Double sumAccruals = accountAccrualRepository.getSumByAccountServiceIdAndWorkingPeriodId(accountServiceId, workingPeriod.getId());
        Double sumRecalculations = accountRecalculationRepository.getSumByAccountServiceIdAndForWorkingPeriodId(accountServiceId, workingPeriod.getId());
        Double currentSum = roundHalfUp(accountServiceCalculationDto.getSum());
        if (sumAccruals == null) sumAccruals = 0D;
        if (sumRecalculations == null) sumRecalculations = 0D;
        Double newSum = currentSum - (sumAccruals + sumRecalculations);
        accountServiceCalculationDto.setSum(newSum);
        return newSum == 0 ? null : accountServiceCalculationDto;
    }

    private AccountServiceCalculationDto calculateAccountServiceGivenDaysActive(WorkingPeriodEntity workingPeriod, AccountServiceCalculationDto accountServiceCalculationDto) {
        int workingPeriodDays = workingPeriod.getDateEnd().getDayOfMonth();
        int accountServiceDaysActive = getAccountServiceDaysActiveForPeriod(workingPeriod, accountServiceCalculationDto.getAccountService());
        accountServiceCalculationDto.setAccountServiceDaysActive(accountServiceDaysActive);
        if (accountServiceDaysActive < workingPeriodDays) {
            Double sum = accountServiceCalculationDto.getSum();
            Double sumPerDay = sum / (double) workingPeriodDays;
            Double sumTotal = sumPerDay * (double) accountServiceDaysActive;
            accountServiceCalculationDto.setSum(sumTotal);
        }
        log.debug("workingPeriodDays: {}, accountServiceDaysActive: {}", workingPeriodDays, accountServiceDaysActive);
        return accountServiceCalculationDto;
    }

    private int getAccountServiceDaysActiveForPeriod(WorkingPeriodEntity workingPeriod, AccountServiceEntity accountService) {
        LocalDate periodStart = workingPeriod.getDateStart();
        LocalDate periodEnd = workingPeriod.getDateEnd();
        LocalDate serviceStart = accountService.getDateStart();
        LocalDate serviceEnd = accountService.getDateEnd();
        if (serviceStart.compareTo(periodStart) < 0) {
            serviceStart = periodStart;
        }
        if (serviceEnd == null) {
            serviceEnd = periodEnd;
        } else if (serviceEnd.compareTo(periodEnd) > 0) {
            serviceEnd = periodEnd;
        }
        return (int) ChronoUnit.DAYS.between(serviceStart, serviceEnd.plusDays(1));
    }

    private <T> List<T> getListForPeriod(WorkingPeriodEntity workingPeriod, List<? extends IPeriod> list) {
        List<T> newList = new ArrayList<>();
        for (IPeriod obj : list) {
            LocalDate dateStart = obj.getDateStart();
            LocalDate dateEnd = obj.getDateEnd();
            if (dateStart.compareTo(workingPeriod.getDateEnd()) <= 0 && (dateEnd == null || dateEnd.compareTo(workingPeriod.getDateStart()) >= 0)) {
                newList.add((T) obj);
            }
        }
        return newList;
    }

    private void deleteCalculationsForPeriod(String accountServiceId, String currentWorkingPeriodId, String forWorkingPeriodId) {
        if (currentWorkingPeriodId.equals(forWorkingPeriodId)) {
            accountAccrualRepository.deleteByAccountServiceIdAndWorkingPeriodId(accountServiceId, currentWorkingPeriodId);
        } else {
            accountRecalculationRepository.deleteByAccountServiceIdAndWorkingPeriodId(accountServiceId, currentWorkingPeriodId, forWorkingPeriodId);
        }
    }

    private AccountServiceCalculationDto calculateByTotalArea(WorkingPeriodEntity workingPeriod, AccountEntity account, AccountServiceEntity accountService, TariffValueEntity tariffValue) {
        AccountServiceCalculationDto accountServiceCalculationDto = new AccountServiceCalculationDto();
        accountServiceCalculationDto.setAccountService(accountService);
        Double totalArea = getAccountTotalAreaForPeriod(account, workingPeriod);
        Double tariff = tariffValue.getValue();
        accountServiceCalculationDto.setConsumption(totalArea);
        accountServiceCalculationDto.setSum(totalArea * tariff);
        log.debug("calculateByTotalArea() -> period: {}, service: {}, consumption: {}, tariff: {}", workingPeriod.getDateStart(), accountService.getService().getName(), totalArea, tariffValue.getValue());
        return accountServiceCalculationDto;
    }

    private AccountServiceCalculationDto calculateByPeoples(WorkingPeriodEntity workingPeriod, AccountEntity account, AccountServiceEntity accountService, TariffValueEntity tariffValue) {
        AccountServiceCalculationDto accountServiceCalculationDto = new AccountServiceCalculationDto();
        accountServiceCalculationDto.setAccountService(accountService);
        Double peoples = (double) getListForPeriod(workingPeriod, account.getRegistered()).size();
        Double tariff = tariffValue.getValue();
        accountServiceCalculationDto.setConsumption(peoples);
        accountServiceCalculationDto.setSum(peoples * tariff);
        log.debug("calculateByPeoples() -> period: {}, service: {}, consumption: {}, tariff: {}", workingPeriod.getDateStart(), accountService.getService().getName(), peoples, tariffValue.getValue());
        return accountServiceCalculationDto;
    }

    private AccountServiceCalculationDto calculateByMeterReading(WorkingPeriodEntity workingPeriod, AccountEntity account, AccountServiceEntity accountService, TariffValueEntity tariffValue) {
        AccountServiceCalculationDto accountServiceCalculationDto = new AccountServiceCalculationDto();
        accountServiceCalculationDto.setAccountService(accountService);
        Double consumption = 0D;
        Double tariff = tariffValue.getValue();

        List<AccountMeterEntity> accountMeters = getListForPeriod(workingPeriod, account.getMeters());
        List<AccountRegisteredEntity> accountRegistered = getListForPeriod(workingPeriod, account.getRegistered());
        int accountRegisteredCount = accountRegistered.size();
        boolean accountMeterIsNotExistsForService = true;
        Double normValue = getNormValueForPeriod(workingPeriod, accountService.getService()) * accountRegisteredCount;

        for (AccountMeterEntity accountMeter : accountMeters) {
            MeterEntity meter = accountMeter.getMeter();
            ServiceEntity service = meter.getService();
            if (service.getId().equals(accountService.getService().getId())) {
                accountMeterIsNotExistsForService = false;
                List<MeterValueEntity> meterValues = getMeterValuesForPeriod(meter, workingPeriod);
                for (MeterValueEntity meterValue : meterValues) {
                    consumption += meterValue.getConsumption();
                }
                if (meterValues.isEmpty() || consumption > normValue) {
                    consumption = normValue;
                }
            }
        }

        if (accountMeterIsNotExistsForService) {
            consumption = normValue;
        }

        accountServiceCalculationDto.setConsumption(consumption);
        accountServiceCalculationDto.setSum(consumption * tariff);

        log.debug("calculateByMeterReading() -> period: {}, service: {}, consumption: {}, tariff: {}", workingPeriod.getDateStart(), accountService.getService().getName(), consumption, tariffValue.getValue());
        return accountServiceCalculationDto;
    }

    private AccountServiceCalculationDto calculateByMeterReadingWater(WorkingPeriodEntity workingPeriod, AccountEntity account, AccountServiceEntity accountService, TariffValueEntity tariffValue) {
        AccountServiceCalculationDto accountServiceCalculationDto = new AccountServiceCalculationDto();
        accountServiceCalculationDto.setAccountService(accountService);
        Double consumption = 0D;
        Double tariff = tariffValue.getValue();

        List<ServiceEntity> servicesWater = getServicesWaterForPeriod(workingPeriod, account, tariffValue);
        List<String> servicesWaterIds = getServicesWaterIds(servicesWater);
        List<AccountMeterEntity> accountMeters = getListForPeriod(workingPeriod, account.getMeters());
        List<AccountRegisteredEntity> accountRegistered = getListForPeriod(workingPeriod, account.getRegistered());
        int accountRegisteredCount = accountRegistered.size();
        boolean accountMeterIsNotExistsForService = true;

        for (AccountMeterEntity accountMeter : accountMeters) {
            MeterEntity meter = accountMeter.getMeter();
            ServiceEntity service = meter.getService();
            if (servicesWaterIds.contains(service.getId())) {
                accountMeterIsNotExistsForService = false;
                Double meterConsumption = 0D;
                Double normValue = getNormValueForPeriod(workingPeriod, service) * accountRegisteredCount;
                List<MeterValueEntity> meterValues = getMeterValuesForPeriod(meter, workingPeriod);
                for (MeterValueEntity meterValue : meterValues) {
                    meterConsumption += meterValue.getConsumption();
                }
                if (meterValues.isEmpty() || meterConsumption > normValue) {
                    meterConsumption = normValue;
                }
                consumption += meterConsumption;
            }
        }

        if (accountMeterIsNotExistsForService) {
            for (ServiceEntity service : servicesWater) {
                consumption += getNormValueForPeriod(workingPeriod, service) * accountRegisteredCount;
            }
        }

        accountServiceCalculationDto.setConsumption(consumption);
        accountServiceCalculationDto.setSum(consumption * tariff);

        log.debug("calculateByMeterReadingWater() -> period: {}, service: {}, consumption: {}, tariff: {}", workingPeriod.getDateStart(), accountService.getService().getName(), consumption, tariffValue.getValue());
        return accountServiceCalculationDto;
    }

    private Double getAccountTotalAreaForPeriod(AccountEntity account, WorkingPeriodEntity workingPeriod) {
        Double totalArea = account.getApartment().getTotalArea();
        List<AccountParameterEntity> parameters = getListForPeriod(workingPeriod, account.getParameters());
        for (AccountParameterEntity parameter : parameters) {
            if (parameter.getParameterType().getCode().equals(ParameterType.TOTAL_AREA.getCode())) {
                try {
                    totalArea = Double.valueOf(parameter.getValue());
                    break;
                } catch (NumberFormatException e) {
                    // do nothing
                }
            }
        }
        return totalArea;
    }

    private List<MeterValueEntity> getMeterValuesForPeriod(MeterEntity meter, WorkingPeriodEntity workingPeriod) {
        List<MeterValueEntity> list = new ArrayList<>();
        List<MeterValueEntity> meterValues = meter.getValues();
        for (MeterValueEntity meterValue : meterValues) {
            LocalDate dateValue = meterValue.getDateValue();
            if (dateValue.compareTo(workingPeriod.getDateStart()) >= 0 && dateValue.compareTo(workingPeriod.getDateEnd()) <= 0) {
                list.add(meterValue);
            }
        }
        return list;
    }

    private List<ServiceEntity> getServicesWaterForPeriod(WorkingPeriodEntity workingPeriod, AccountEntity account, TariffValueEntity tariffValueWater) {
        List<ServiceEntity> list = new ArrayList<>();
        List<AccountServiceEntity> accountServices = getListForPeriod(workingPeriod, account.getServices());
        for (AccountServiceEntity accountService : accountServices) {
            TariffEntity tariff = accountService.getTariff();
            List<TariffValueEntity> tariffValues = getListForPeriod(workingPeriod, tariff.getValues());
            if (tariffValues.size() > 0) {
                TariffValueEntity serviceTariffValue = tariffValues.get(0);
                if (serviceTariffValue.getMeasurementUnit().getId().equals(tariffValueWater.getMeasurementUnit().getId())) {
                    list.add(accountService.getService());
                }
            }
        }
        return list;
    }

    private List<String> getServicesWaterIds(List<ServiceEntity> services) {
        List<String> list = new ArrayList<>();
        for (ServiceEntity service : services) {
            list.add(service.getId());
        }
        return list;
    }

    private Double getNormValueForPeriod(WorkingPeriodEntity workingPeriod, ServiceEntity service) {
        Double value = 0D;
        List<NormEntity> norms = normRepository.findByServiceId(service.getId());
        for (NormEntity norm : norms) {
            List<NormValueEntity> normValues = getListForPeriod(workingPeriod, norm.getValues());
            if (normValues.size() > 0) {
                NormValueEntity normValue = normValues.get(0);
                value = normValue.getValue();
                break;
            }
        }
        return value;
    }

    private Double roundHalfUp(Double value) {
        BigDecimal bigDecimal = new BigDecimal(value);
        return bigDecimal.setScale(6, BigDecimal.ROUND_HALF_UP).doubleValue();
    }

    private void saveAccountCalculations(List<AccountServiceCalculationDto> accountCalculations, WorkingPeriodEntity currentWorkingPeriod, WorkingPeriodEntity forWorkingPeriod) {
        for (AccountServiceCalculationDto accountServiceCalculationDto : accountCalculations) {
            if (currentWorkingPeriod.getId().equals(forWorkingPeriod.getId())) {
                AccountAccrualEntity accountAccrual = new AccountAccrualEntity();
                accountAccrual.setAccountService(accountServiceCalculationDto.getAccountService());
                accountAccrual.setConsumption(roundHalfUp(accountServiceCalculationDto.getConsumption()));
                accountAccrual.setValue(roundHalfUp(accountServiceCalculationDto.getSum()));
                accountAccrual.setWorkingPeriod(currentWorkingPeriod);
                accountAccrual.setTariff(accountServiceCalculationDto.getTariff());
                accountAccrual.setTariffCalculationType(accountServiceCalculationDto.getTariffCalculationType());
                accountAccrual.setTariffMeasurementUnit(accountServiceCalculationDto.getTariffMeasurementUnit());
                accountAccrual.setTariffValue(accountServiceCalculationDto.getTariffValue());
                accountAccrual.setAccountServiceDaysActive(accountServiceCalculationDto.getAccountServiceDaysActive());
                accountAccrualRepository.save(accountAccrual);
            } else {
                AccountRecalculationEntity accountRecalculation = new AccountRecalculationEntity();
                accountRecalculation.setAccountService(accountServiceCalculationDto.getAccountService());
                accountRecalculation.setConsumption(roundHalfUp(accountServiceCalculationDto.getConsumption()));
                accountRecalculation.setValue(roundHalfUp(accountServiceCalculationDto.getSum()));
                accountRecalculation.setWorkingPeriod(currentWorkingPeriod);
                accountRecalculation.setForWorkingPeriod(forWorkingPeriod);
                accountRecalculation.setTariff(accountServiceCalculationDto.getTariff());
                accountRecalculation.setTariffCalculationType(accountServiceCalculationDto.getTariffCalculationType());
                accountRecalculation.setTariffMeasurementUnit(accountServiceCalculationDto.getTariffMeasurementUnit());
                accountRecalculation.setTariffValue(accountServiceCalculationDto.getTariffValue());
                accountRecalculation.setAccountServiceDaysActive(accountServiceCalculationDto.getAccountServiceDaysActive());
                accountRecalculationRepository.save(accountRecalculation);
            }
        }
    }

    public void calculateAccounts(String periodStartId, String periodEndId) {
        if (!systemPropertyService.getCalculationIsActive()) {
            List<String> accountsIds = accountRepository.getAccountsIds();
            systemPropertyService.setCalculationActive(true);
            systemPropertyService.setCalculationAccountsCount(accountsIds.size());
            systemPropertyService.setCalculationAccountsCalculated(0);

            ExecutorService executorService = Executors.newFixedThreadPool(appCalculationThreadsCount);
            List<Future<Integer>> futures = new ArrayList<>();
            for (String accountId : accountsIds) {
                Callable<Integer> task = new CalculationThread(this, accountId, periodStartId, periodEndId);
                Future<Integer> future = executorService.submit(task);
                futures.add(future);
            }

            executorService.shutdown();
            createCalculationWatcher(futures);

            log.info("calculateAccounts() -> periodStartId: {}, periodEndId: {}", periodStartId, periodEndId);
        }
    }

    public void closeWorkingPeriod() {
        if (!systemPropertyService.getCalculationIsActive()) {
            List<String> accountsIds = accountRepository.getAccountsIds();
            systemPropertyService.setCalculationActive(true);
            systemPropertyService.setCalculationAccountsCount(accountsIds.size());
            systemPropertyService.setCalculationAccountsCalculated(0);
            WorkingPeriodEntity currentWorkingPeriod = getCurrentWorkingPeriod();
            WorkingPeriodEntity newWorkingPeriod = createNewWorkPeriod(currentWorkingPeriod);

            ExecutorService executorService = Executors.newFixedThreadPool(appCalculationThreadsCount);
            List<Future<Integer>> futures = new ArrayList<>();
            for (String accountId : accountsIds) {
                Callable<Integer> task = new CalculationThread(this, accountId, currentWorkingPeriod, newWorkingPeriod);
                Future<Integer> future = executorService.submit(task);
                futures.add(future);
            }

            executorService.shutdown();
            createCalculationWatcher(futures);

            log.info("closeWorkingPeriod() -> name: {}, dateStart: {}", currentWorkingPeriod.getName(), currentWorkingPeriod.getDateStart());
        }
    }

    void calculateCloseWorkingPeriod(String accountId, WorkingPeriodEntity currentWorkingPeriod, WorkingPeriodEntity newWorkingPeriod) {
        AccountEntity account = accountRepository.findOne(accountId);
        LocalDate accountDateClose = account.getDateClose();
        if (accountDateClose == null || accountDateClose.compareTo(newWorkingPeriod.getDateStart()) > 0) {
            List<AccountServiceEntity> accountServices = getListForPeriod(newWorkingPeriod, account.getServices());
            for (AccountServiceEntity accountService : accountServices) {
                Double openingBalance = accountOpeningBalanceRepository.getSumByAccountServiceIdAndWorkingPeriodId(accountService.getId(), currentWorkingPeriod.getId());
                Double accrual = accountAccrualRepository.getSumByAccountServiceIdAndWorkingPeriodId(accountService.getId(), currentWorkingPeriod.getId());
                Double recalculation = accountRecalculationRepository.getSumByAccountServiceIdAndWorkingPeriodId(accountService.getId(), currentWorkingPeriod.getId());
                Double payment = accountPaymentRepository.getSumByAccountServiceIdAndWorkingPeriodId(accountService.getId(), currentWorkingPeriod.getId());
                if (openingBalance == null) openingBalance = 0D;
                if (accrual == null) accrual = 0D;
                if (recalculation == null) recalculation = 0D;
                if (payment == null) payment = 0D;
                Double closingBalance = roundHalfUp(openingBalance + accrual + recalculation - payment);
                if (closingBalance != 0) {
                    AccountOpeningBalanceEntity accountOpeningBalance = new AccountOpeningBalanceEntity();
                    accountOpeningBalance.setWorkingPeriod(newWorkingPeriod);
                    accountOpeningBalance.setAccountService(accountService);
                    accountOpeningBalance.setValue(closingBalance);
                    accountOpeningBalanceRepository.save(accountOpeningBalance);
                }
            }
            calculateAccount(accountId, newWorkingPeriod.getId(), newWorkingPeriod.getId());
        }
    }

    private void createCalculationWatcher(List<Future<Integer>> futures) {
        ExecutorService executorServiceWatcher = Executors.newSingleThreadExecutor();
        Callable<Integer> taskWatcher = () -> {
            try {
                int accountsCalculatedPrev = 0;
                while (true) {
                    int accountsCalculated = 0;
                    for (Future<Integer> future : futures) {
                        if (future.isDone() || future.isCancelled()) {
                            accountsCalculated++;
                        }
                    }
                    if (accountsCalculated != accountsCalculatedPrev){
                        systemPropertyService.setCalculationAccountsCalculated(accountsCalculated);
                        accountsCalculatedPrev = accountsCalculated;
                    }
                    if (accountsCalculated == futures.size()) {
                        systemPropertyService.setCalculationActive(false);
                        break;
                    }
                }
            } catch (Exception e) {
                log.error(e.getMessage(), e);
            }
            return 0;
        };
        executorServiceWatcher.submit(taskWatcher);
        executorServiceWatcher.shutdown();
    }

    public void deleteCalculationsByAccountServiceId(String accountServiceId) {
        accountOpeningBalanceRepository.deleteByAccountServiceId(accountServiceId);
        accountAccrualRepository.deleteByAccountServiceId(accountServiceId);
        accountRecalculationRepository.deleteByAccountServiceId(accountServiceId);
        accountPaymentRepository.deleteByAccountServiceId(accountServiceId);
    }

    public void rollbackCurrentWorkingPeriod() {
        if (!systemPropertyService.getCalculationIsActive()) {
            if (workingPeriodRepository.count() > 1) {
                WorkingPeriodEntity currentWorkingPeriod = getCurrentWorkingPeriod();
                accountOpeningBalanceRepository.deleteByWorkingPeriodId(currentWorkingPeriod.getId());
                accountAccrualRepository.deleteByWorkingPeriodId(currentWorkingPeriod.getId());
                accountRecalculationRepository.deleteByWorkingPeriodId(currentWorkingPeriod.getId());
                accountPaymentRepository.deleteByWorkingPeriodId(currentWorkingPeriod.getId());
                workingPeriodRepository.deleteById(currentWorkingPeriod.getId());
                log.info("rollbackCurrentWorkingPeriod() -> name: {}, dateStart: {}", currentWorkingPeriod.getName(), currentWorkingPeriod.getDateStart());
            }
        }
    }
}
