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

import java.time.LocalDate;
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

    @Autowired
    public CalculationService(CommonRepository commonRepository, AccountRepository accountRepository,
                              WorkingPeriodRepository workingPeriodRepository, AccountAccrualRepository accountAccrualRepository,
                              AccountRecalculationRepository accountRecalculationRepository) {
        this.commonRepository = commonRepository;
        this.accountRepository = accountRepository;
        this.workingPeriodRepository = workingPeriodRepository;
        this.accountAccrualRepository = accountAccrualRepository;
        this.accountRecalculationRepository = accountRecalculationRepository;
    }

    public List<AccountCalculationDto> getAccountCalculations(String accountId, String workingPeriodId) {
        return commonRepository.getAccountCalculations(accountId, workingPeriodId);
    }

    public void calculateAccount(String accountId, String periodStartId, String periodEndId) {
        AccountEntity account = accountRepository.findOne(accountId);
        WorkingPeriodEntity periodStart = workingPeriodRepository.findOne(periodStartId);
        WorkingPeriodEntity periodEnd = workingPeriodRepository.findOne(periodEndId);
        WorkingPeriodEntity currentWorkingPeriod = workingPeriodRepository.getFirstByIdIsNotNullOrderByDateStartDesc();
        List<WorkingPeriodEntity> workingPeriods = workingPeriodRepository.find(periodStart.getDateStart(), periodEnd.getDateStart());

        for (WorkingPeriodEntity workingPeriod : workingPeriods) {
            List<AccountServiceEntity> accountServicesAll = account.getServices();
            for (AccountServiceEntity serviceEntity : accountServicesAll) {
                deleteCalculationsForPeriod(serviceEntity.getId(), currentWorkingPeriod.getId(), workingPeriod.getId());
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
                            accountCalculations.add(accountServiceCalculationDto);
                        }
                    }
                }
            }
            saveAccountCalculations(accountCalculations, currentWorkingPeriod, workingPeriod);
        }

        log.info("calculateAccount({}, {}, {})", accountId, periodStartId, periodEndId);
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
        for (AccountMeterEntity accountMeter : accountMeters) {
            MeterEntity meter = accountMeter.getMeter();
            ServiceEntity service = meter.getService();
            if (service.getId().equals(accountService.getService().getId())) {
                List<MeterValueEntity> meterValues = getMeterValuesForPeriod(meter, workingPeriod);
                for (MeterValueEntity meterValue : meterValues) {
                    consumption += meterValue.getConsumption();
                }
            }
        }

        accountServiceCalculationDto.setConsumption(consumption);
        accountServiceCalculationDto.setSum(consumption * tariff);

        log.info("calculateByMeterReading() -> period: {}, service: {}, consumption: {}, tariff: {}", workingPeriod.getDateStart(), accountService.getService().getName(), consumption, tariffValue.getValue());
        return consumption > 0 ? accountServiceCalculationDto : null;
    }

    private AccountServiceCalculationDto calculateByMeterReadingWater(WorkingPeriodEntity workingPeriod, AccountEntity account, AccountServiceEntity accountService, TariffValueEntity tariffValue) {
        AccountServiceCalculationDto accountServiceCalculationDto = new AccountServiceCalculationDto();
        accountServiceCalculationDto.setAccountService(accountService);
        Double consumption = 0D;
        Double tariff = tariffValue.getValue();

        List<String> servicesWaterIds = getServicesWaterIdsForPeriod(workingPeriod, account, tariffValue);
        List<AccountMeterEntity> accountMeters = getListForPeriod(workingPeriod, account.getMeters());
        for (AccountMeterEntity accountMeter : accountMeters) {
            MeterEntity meter = accountMeter.getMeter();
            String serviceId = meter.getService().getId();
            if (servicesWaterIds.contains(serviceId)) {
                List<MeterValueEntity> meterValues = getMeterValuesForPeriod(meter, workingPeriod);
                for (MeterValueEntity meterValue : meterValues) {
                    consumption += meterValue.getConsumption();
                }
            }
        }

        accountServiceCalculationDto.setConsumption(consumption);
        accountServiceCalculationDto.setSum(consumption * tariff);

        log.info("calculateByMeterReadingWater() -> period: {}, service: {}, consumption: {}, tariff: {}", workingPeriod.getDateStart(), accountService.getService().getName(), consumption, tariffValue.getValue());
        return consumption > 0 ? accountServiceCalculationDto : null;
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

    private List<String> getServicesWaterIdsForPeriod(WorkingPeriodEntity workingPeriod, AccountEntity account, TariffValueEntity tariffValueWater) {
        List<String> list = new ArrayList<>();
        List<AccountServiceEntity> accountServices = getListForPeriod(workingPeriod, account.getServices());
        for (AccountServiceEntity accountService : accountServices) {
            TariffEntity tariff = accountService.getTariff();
            List<TariffValueEntity> tariffValues = getListForPeriod(workingPeriod, tariff.getValues());
            if (tariffValues.size() > 0) {
                TariffValueEntity serviceTariffValue = tariffValues.get(0);
                if (serviceTariffValue.getMeasurementUnit().getId().equals(tariffValueWater.getMeasurementUnit().getId())) {
                    list.add(accountService.getService().getId());
                }
            }
        }
        return list;
    }

    private void saveAccountCalculations(List<AccountServiceCalculationDto> accountCalculations, WorkingPeriodEntity currentWorkingPeriod, WorkingPeriodEntity forWorkingPeriod) {
        for (AccountServiceCalculationDto accountServiceCalculationDto : accountCalculations) {
            if (currentWorkingPeriod.getId().equals(forWorkingPeriod.getId())) {
                AccountAccrualEntity accountAccrual = new AccountAccrualEntity();
                accountAccrual.setAccountService(accountServiceCalculationDto.getAccountService());
                accountAccrual.setConsumption(accountServiceCalculationDto.getConsumption());
                accountAccrual.setValue(accountServiceCalculationDto.getSum());
                accountAccrual.setWorkingPeriod(currentWorkingPeriod);
                accountAccrualRepository.save(accountAccrual);
            } else {
                AccountRecalculationEntity accountRecalculation = new AccountRecalculationEntity();
                accountRecalculation.setAccountService(accountServiceCalculationDto.getAccountService());
                accountRecalculation.setConsumption(accountServiceCalculationDto.getConsumption());
                accountRecalculation.setValue(accountServiceCalculationDto.getSum());
                accountRecalculation.setWorkingPeriod(currentWorkingPeriod);
                accountRecalculation.setForWorkingPeriod(forWorkingPeriod);
                accountRecalculationRepository.save(accountRecalculation);
            }
        }
    }
}
