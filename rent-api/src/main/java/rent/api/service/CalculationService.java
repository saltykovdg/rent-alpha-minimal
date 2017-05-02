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
import rent.common.enums.SystemPropertyType;
import rent.common.interfaces.IPeriod;
import rent.common.repository.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

@Service
public class CalculationService {
    private final Logger log = LoggerFactory.getLogger(getClass());

    private final Integer appCalculationThreadsCount;
    private final String appLocale;
    private final CommonRepository commonRepository;
    private final AccountRepository accountRepository;
    private final WorkingPeriodRepository workingPeriodRepository;
    private final AccountAccrualRepository accountAccrualRepository;
    private final AccountRecalculationRepository accountRecalculationRepository;
    private final NormRepository normRepository;
    private final SystemPropertyRepository systemPropertyRepository;
    private final AccountOpeningBalanceRepository accountOpeningBalanceRepository;
    private final AccountServiceRepository accountServiceRepository;

    @Autowired
    public CalculationService(@Value("${app.calculation.threads.count}") Integer appCalculationThreadsCount, @Value("${app.locale}") String appLocale,
                              CommonRepository commonRepository, AccountRepository accountRepository,
                              WorkingPeriodRepository workingPeriodRepository, AccountAccrualRepository accountAccrualRepository,
                              AccountRecalculationRepository accountRecalculationRepository, NormRepository normRepository,
                              SystemPropertyRepository systemPropertyRepository, AccountOpeningBalanceRepository accountOpeningBalanceRepository,
                              AccountServiceRepository accountServiceRepository) {
        this.appCalculationThreadsCount = appCalculationThreadsCount;
        this.appLocale = appLocale;
        this.commonRepository = commonRepository;
        this.accountRepository = accountRepository;
        this.workingPeriodRepository = workingPeriodRepository;
        this.accountAccrualRepository = accountAccrualRepository;
        this.accountRecalculationRepository = accountRecalculationRepository;
        this.normRepository = normRepository;
        this.systemPropertyRepository = systemPropertyRepository;
        this.accountOpeningBalanceRepository = accountOpeningBalanceRepository;
        this.accountServiceRepository = accountServiceRepository;

        if (getSystemPropertyCalculationIsActive()) {
            setSystemPropertyCalculationActive(false);
        }
    }

    public List<AccountCalculationDto> getAccountCalculations(String accountId, String workingPeriodId) {
        return commonRepository.getAccountCalculations(accountId, workingPeriodId);
    }

    public WorkingPeriodEntity getCurrentWorkingPeriod() {
        return workingPeriodRepository.getFirstByIdIsNotNullOrderByDateStartDesc();
    }

    public WorkingPeriodEntity createNewWorkPeriod(WorkingPeriodEntity currentWorkingPeriod) {
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
                            if (accountServiceCalculationDto != null && !currentWorkingPeriod.getId().equals(workingPeriod.getId())) {
                                accountServiceCalculationDto = calculateAccountServiceGivenPreviousRecalculation(workingPeriod, accountServiceCalculationDto);
                            }
                            if (accountServiceCalculationDto != null) {
                                accountServiceCalculationDto = calculateAccountServiceGivenDaysActive(workingPeriod, accountServiceCalculationDto);
                                accountServiceCalculationDto.setTariff(tariff);
                                accountServiceCalculationDto.setTariffCalculationType(tariffValue.getCalculationType());
                                accountServiceCalculationDto.setTariffMeasurementUnit(tariffValue.getMeasurementUnit());
                                accountServiceCalculationDto.setTariffValue(tariffValue.getValue());
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
        Double sumAccruals = commonRepository.getAccountServiceSumAccrualsForPeriod(accountServiceId, workingPeriod.getId());
        Double sumRecalculations = commonRepository.getAccountServiceSumRecalculationsForPeriod(accountServiceId, workingPeriod.getId());
        Double currentSum = accountServiceCalculationDto.getSum() - (sumAccruals + sumRecalculations);
        accountServiceCalculationDto.setSum(currentSum);
        return currentSum == 0 ? null : accountServiceCalculationDto;
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
        commonRepository.deleteCalculationsForPeriod(accountServiceId, currentWorkingPeriodId, forWorkingPeriodId);
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
        List<AccountEntity> accounts = accountRepository.getAccounts();
        setSystemPropertyCalculationActive(true);
        setSystemPropertyCalculationAccountsCount(accounts.size());
        setSystemPropertyCalculationAccountsCalculated(0);
        for (int i = 0; i < appCalculationThreadsCount; i++) {
            new CalculationThread(this, accounts, periodStartId, periodEndId);
        }
    }

    public void closeWorkingPeriod() {
        List<AccountEntity> accounts = accountRepository.getAccounts();
        setSystemPropertyCalculationActive(true);
        setSystemPropertyCalculationAccountsCount(accounts.size());
        setSystemPropertyCalculationAccountsCalculated(0);
        WorkingPeriodEntity currentWorkingPeriod = getCurrentWorkingPeriod();
        WorkingPeriodEntity newWorkingPeriod = createNewWorkPeriod(currentWorkingPeriod);
        for (int i = 0; i < appCalculationThreadsCount; i++) {
            new CalculationThread(this, accounts, currentWorkingPeriod, newWorkingPeriod);
        }
    }

    public void calculateCloseWorkingPeriod(AccountEntity account, WorkingPeriodEntity currentWorkingPeriod, WorkingPeriodEntity newWorkingPeriod) {
        LocalDate accountDateClose = account.getDateClose();
        if (accountDateClose == null || accountDateClose.compareTo(newWorkingPeriod.getDateStart()) > 0) {
            List<AccountCalculationDto> accountCalculations = getAccountCalculations(account.getId(), currentWorkingPeriod.getId());
            for (AccountCalculationDto accountCalculationDto : accountCalculations) {
                Double closingBalance = accountCalculationDto.getClosingBalance();
                if (closingBalance != 0) {
                    AccountOpeningBalanceEntity accountOpeningBalance = new AccountOpeningBalanceEntity();
                    accountOpeningBalance.setWorkingPeriod(newWorkingPeriod);
                    accountOpeningBalance.setAccountService(accountServiceRepository.findOne(accountCalculationDto.getAccountServiceId()));
                    accountOpeningBalance.setValue(closingBalance);
                    accountOpeningBalanceRepository.save(accountOpeningBalance);
                }
                calculateAccount(account.getId(), newWorkingPeriod.getId(), newWorkingPeriod.getId());
            }
        }
    }

    public boolean getSystemPropertyCalculationIsActive() {
        SystemPropertyEntity systemProperty = systemPropertyRepository.findFirstByNameContaining(SystemPropertyType.CALCULATION_IS_ACTIVE.getName());
        return systemProperty.getValue().equals("1");
    }

    public void setSystemPropertyCalculationActive(Boolean active) {
        SystemPropertyEntity systemProperty = systemPropertyRepository.findFirstByNameContaining(SystemPropertyType.CALCULATION_IS_ACTIVE.getName());
        systemProperty.setValue(active ? "1" : "0");
        systemPropertyRepository.save(systemProperty);
    }

    public void setSystemPropertyCalculationAccountsCount(Integer accountsCount) {
        SystemPropertyEntity systemProperty = systemPropertyRepository.findFirstByNameContaining(SystemPropertyType.CALCULATION_ACCOUNTS_COUNT.getName());
        systemProperty.setValue(accountsCount.toString());
        systemPropertyRepository.save(systemProperty);
    }

    public void setSystemPropertyCalculationAccountsCalculated(Integer accountsCalculated) {
        SystemPropertyEntity systemProperty = systemPropertyRepository.findFirstByNameContaining(SystemPropertyType.CALCULATION_ACCOUNTS_CALCULATED.getName());
        systemProperty.setValue(accountsCalculated.toString());
        systemPropertyRepository.save(systemProperty);
    }
}
