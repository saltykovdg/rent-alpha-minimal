package rent.api.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import rent.common.dtos.ServiceCalculationDto;
import rent.common.dtos.ServiceCalculationInfoDto;
import rent.common.entity.*;
import rent.common.enums.RecalculationType;
import rent.common.repository.AccountAccrualRepository;
import rent.common.repository.AccountRecalculationRepository;
import rent.common.repository.AccountServiceRepository;
import rent.common.repository.RecalculationTypeRepository;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class RecalculationService {
    private final Logger log = LoggerFactory.getLogger(getClass());

    private final CalculationService calculationService;
    private final AccountAccrualRepository accountAccrualRepository;
    private final AccountRecalculationRepository accountRecalculationRepository;
    private final AccountServiceRepository accountServiceRepository;
    private final RecalculationTypeRepository recalculationTypeRepository;

    public RecalculationService(CalculationService calculationService,
                                AccountAccrualRepository accountAccrualRepository,
                                AccountRecalculationRepository accountRecalculationRepository,
                                AccountServiceRepository accountServiceRepository,
                                RecalculationTypeRepository recalculationTypeRepository) {
        this.calculationService = calculationService;
        this.accountAccrualRepository = accountAccrualRepository;
        this.accountRecalculationRepository = accountRecalculationRepository;
        this.accountServiceRepository = accountServiceRepository;
        this.recalculationTypeRepository = recalculationTypeRepository;
    }

    /**
     * Добавление коррекционной суммы на лс
     *
     * @param accountServiceId идентификатор услуги лс
     * @param sum              сумма
     */
    public void addRecalculation(String accountServiceId, Double sum, String note) {
        log.info("addRecalculation({}, {}, {})", accountServiceId, sum, note);
        if (sum != 0D) {
            WorkingPeriodEntity currentWorkingPeriod = calculationService.getCurrentWorkingPeriod();
            String currentWorkingPeriodId = currentWorkingPeriod.getId();
            AccountServiceEntity accountService = accountServiceRepository.findOne(accountServiceId);
            AccountEntity account = accountService.getAccount();
            calculationService.calculateAccount(account.getId(), currentWorkingPeriodId, currentWorkingPeriodId);
            AccountAccrualEntity accountAccrual = accountAccrualRepository.findByAccountServiceIdAndWorkingPeriodId(accountServiceId, currentWorkingPeriodId);
            if (accountAccrual != null) {
                RecalculationTypeEntity recalculationType = recalculationTypeRepository.findByCode(RecalculationType.CORRECTION_AMOUNT.getCode());
                String bundleId = UUID.randomUUID().toString();
                LocalDateTime date = LocalDateTime.now();
                AccountRecalculationEntity accountRecalculation = new AccountRecalculationEntity();
                accountRecalculation.setRecalculationType(recalculationType);
                accountRecalculation.setAccountService(accountService);
                accountRecalculation.setConsumption(accountAccrual.getConsumption());
                accountRecalculation.setValue(sum);
                accountRecalculation.setNote(note);
                accountRecalculation.setWorkingPeriod(currentWorkingPeriod);
                accountRecalculation.setForWorkingPeriod(currentWorkingPeriod);
                accountRecalculation.setDate(date);
                accountRecalculation.setBundleId(bundleId);
                accountRecalculation.setTariff(accountAccrual.getTariff());
                accountRecalculation.setTariffCalculationType(accountAccrual.getTariffCalculationType());
                accountRecalculation.setTariffMeasurementUnit(accountAccrual.getTariffMeasurementUnit());
                accountRecalculation.setTariffValue(accountAccrual.getTariffValue());
                accountRecalculation.setAccountServiceDaysActive(accountAccrual.getAccountServiceDaysActive());
                accountRecalculationRepository.save(accountRecalculation);
            }
        }
    }

    /**
     * Удалять перерасчеты можно только за текущий рабочий период
     *
     * @param bundleId бандл перерасчета
     */
    public void deleteRecalculation(String bundleId) {
        log.info("deleteRecalculation({})", bundleId);
        String workingPeriodId = calculationService.getCurrentWorkingPeriod().getId();
        accountRecalculationRepository.deleteByBundleId(bundleId, workingPeriodId);
    }

    public Page<ServiceCalculationDto> getAccountRecalculations(String accountId, Pageable p) {
        log.info("getAccountRecalculations({}, {})", accountId, p);
        Page<ServiceCalculationDto> page = accountRecalculationRepository.getSumByAccountIdPageable(accountId, p);
        if (page != null && page.hasContent()) {
            for (ServiceCalculationDto serviceCalculationDto : page.getContent()) {
                List<ServiceCalculationInfoDto> serviceCalculationInfoList = accountRecalculationRepository.getSumInfoByBundleId(serviceCalculationDto.getBundleId());
                if (serviceCalculationInfoList == null) {
                    serviceCalculationInfoList = Collections.emptyList();
                }
                serviceCalculationDto.setServiceCalculationInfoList(serviceCalculationInfoList);
            }
        }
        return page;
    }
}
