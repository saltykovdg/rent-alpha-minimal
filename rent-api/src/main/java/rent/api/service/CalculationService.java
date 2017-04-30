package rent.api.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
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
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

@Service
public class CalculationService {
    private final Logger log = LoggerFactory.getLogger(getClass());

    private final CommonRepository commonRepository;
    private final AccountRepository accountRepository;
    private final WorkingPeriodRepository workingPeriodRepository;
    private final AccountAccrualRepository accountAccrualRepository;
    private final AccountRecalculationRepository accountRecalculationRepository;
    private final NormRepository normRepository;

    @Autowired
    public CalculationService(CommonRepository commonRepository, AccountRepository accountRepository,
                              WorkingPeriodRepository workingPeriodRepository, AccountAccrualRepository accountAccrualRepository,
                              AccountRecalculationRepository accountRecalculationRepository, NormRepository normRepository) {
        this.commonRepository = commonRepository;
        this.accountRepository = accountRepository;
        this.workingPeriodRepository = workingPeriodRepository;
        this.accountAccrualRepository = accountAccrualRepository;
        this.accountRecalculationRepository = accountRecalculationRepository;
        this.normRepository = normRepository;
    }

    public List<AccountCalculationDto> getAccountCalculations(String accountId, String workingPeriodId) {
        return commonRepository.getAccountCalculations(accountId, workingPeriodId);
    }

    public void calculateAccount(String accountId, String periodStartId, String periodEndId) {
        log.info("calculateAccount({}, {}, {})", accountId, periodStartId, periodEndId);

        AccountEntity account = accountRepository.findOne(accountId);
        WorkingPeriodEntity periodStart = workingPeriodRepository.findOne(periodStartId);
        WorkingPeriodEntity periodEnd = workingPeriodRepository.findOne(periodEndId);
        WorkingPeriodEntity currentWorkingPeriod = workingPeriodRepository.getFirstByIdIsNotNullOrderByDateStartDesc();
        List<WorkingPeriodEntity> workingPeriods = workingPeriodRepository.find(periodStart.getDateStart(), periodEnd.getDateStart());

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
        log.info("workingPeriodDays: {}, accountServiceDaysActive: {}", workingPeriodDays, accountServiceDaysActive);
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
        log.info("calculateByTotalArea() -> period: {}, service: {}, consumption: {}, tariff: {}", workingPeriod.getDateStart(), accountService.getService().getName(), totalArea, tariffValue.getValue());
        return accountServiceCalculationDto;
    }

    private AccountServiceCalculationDto calculateByPeoples(WorkingPeriodEntity workingPeriod, AccountEntity account, AccountServiceEntity accountService, TariffValueEntity tariffValue) {
        AccountServiceCalculationDto accountServiceCalculationDto = new AccountServiceCalculationDto();
        accountServiceCalculationDto.setAccountService(accountService);
        Double peoples = (double) getListForPeriod(workingPeriod, account.getRegistered()).size();
        Double tariff = tariffValue.getValue();
        accountServiceCalculationDto.setConsumption(peoples);
        accountServiceCalculationDto.setSum(peoples * tariff);
        log.info("calculateByPeoples() -> period: {}, service: {}, consumption: {}, tariff: {}", workingPeriod.getDateStart(), accountService.getService().getName(), peoples, tariffValue.getValue());
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

        log.info("calculateByMeterReading() -> period: {}, service: {}, consumption: {}, tariff: {}", workingPeriod.getDateStart(), accountService.getService().getName(), consumption, tariffValue.getValue());
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

        log.info("calculateByMeterReadingWater() -> period: {}, service: {}, consumption: {}, tariff: {}", workingPeriod.getDateStart(), accountService.getService().getName(), consumption, tariffValue.getValue());
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
}
