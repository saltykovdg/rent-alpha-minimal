package rent.common.repository;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import rent.common.dtos.AccountCalculationDto;
import rent.common.dtos.AccountServiceCalculationDto;
import rent.common.entity.*;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.math.BigDecimal;
import java.util.*;

@Repository
@Transactional("rentDBTransactionManager")
public class CommonRepository {
    @PersistenceContext(unitName = "rentDBPersistenceUnit")
    private EntityManager entityManager;

    public AbstractEntity save(AbstractEntity entity) {
        return entityManager.merge(entity);
    }

    public AbstractEntity findOne(Class<? extends AbstractEntity> abstractEntityClass, String id) {
        return entityManager.find(abstractEntityClass, id);
    }

    public List<AccountCalculationDto> getAccountCalculations(String accountId, String workingPeriodId) {
        List<AccountCalculationDto> results = new ArrayList<>();
        List<AccountServiceCalculationDto> openingBalances;
        List<AccountServiceCalculationDto> accruals;
        List<AccountServiceCalculationDto> recalculations;
        List<AccountServiceCalculationDto> payments;

        String hql = "select new rent.common.dtos.AccountServiceCalculationDto(accountService, sum(openingBalances.value)) " +
                "from AccountOpeningBalanceEntity openingBalances " +
                "join openingBalances.accountService accountService " +
                "join openingBalances.workingPeriod workingPeriod " +
                "join accountService.account account " +
                "where account.id = :accountId and workingPeriod.id = :workingPeriodId " +
                "group by accountService";
        openingBalances = entityManager.createQuery(hql, AccountServiceCalculationDto.class)
                .setParameter("accountId", accountId)
                .setParameter("workingPeriodId", workingPeriodId)
                .getResultList();

        hql = "select new rent.common.dtos.AccountServiceCalculationDto(accountService, sum(accruals.value), sum(accruals.consumption), tariff, tariffCalculationType, tariffMeasurementUnit, accruals.tariffValue) " +
                "from AccountAccrualEntity accruals " +
                "join accruals.accountService accountService " +
                "join accruals.tariff tariff " +
                "join accruals.tariffCalculationType tariffCalculationType " +
                "join accruals.tariffMeasurementUnit tariffMeasurementUnit " +
                "join accruals.workingPeriod workingPeriod " +
                "join accountService.account account " +
                "where account.id = :accountId and workingPeriod.id = :workingPeriodId " +
                "group by accountService, tariff, tariffCalculationType, tariffMeasurementUnit, accruals.tariffValue";
        accruals = entityManager.createQuery(hql, AccountServiceCalculationDto.class)
                .setParameter("accountId", accountId)
                .setParameter("workingPeriodId", workingPeriodId)
                .getResultList();

        hql = "select new rent.common.dtos.AccountServiceCalculationDto(accountService, sum(recalculations.value), sum(recalculations.consumption), tariff, tariffCalculationType, tariffMeasurementUnit, recalculations.tariffValue) " +
                "from AccountRecalculationEntity recalculations " +
                "join recalculations.accountService accountService " +
                "join recalculations.tariff tariff " +
                "join recalculations.tariffCalculationType tariffCalculationType " +
                "join recalculations.tariffMeasurementUnit tariffMeasurementUnit " +
                "join recalculations.workingPeriod workingPeriod " +
                "join accountService.account account " +
                "where account.id = :accountId and workingPeriod.id = :workingPeriodId " +
                "group by accountService, tariff, tariffCalculationType, tariffMeasurementUnit, recalculations.tariffValue";
        recalculations = entityManager.createQuery(hql, AccountServiceCalculationDto.class)
                .setParameter("accountId", accountId)
                .setParameter("workingPeriodId", workingPeriodId)
                .getResultList();

        hql = "select new rent.common.dtos.AccountServiceCalculationDto(accountService, sum(payments.value)) " +
                "from AccountPaymentEntity payments " +
                "join payments.accountService accountService " +
                "join payments.workingPeriod workingPeriod " +
                "join accountService.account account " +
                "where account.id = :accountId and workingPeriod.id = :workingPeriodId " +
                "group by accountService";
        payments = entityManager.createQuery(hql, AccountServiceCalculationDto.class)
                .setParameter("accountId", accountId)
                .setParameter("workingPeriodId", workingPeriodId)
                .getResultList();

        WorkingPeriodEntity workingPeriod = (WorkingPeriodEntity) this.findOne(WorkingPeriodEntity.class, workingPeriodId);

        hql = "select accountService from AccountServiceEntity accountService " +
                "join accountService.account account " +
                "join accountService.service service " +
                "where account.id = :accountId and accountService.dateStart <= :periodEnd and " +
                "(accountService.dateEnd is null or (accountService.dateEnd >= :periodStart)) " +
                "order by service.name";
        List<AccountServiceEntity> accountServices = entityManager.createQuery(hql, AccountServiceEntity.class)
                .setParameter("accountId", accountId)
                .setParameter("periodStart", workingPeriod.getDateStart())
                .setParameter("periodEnd", workingPeriod.getDateEnd())
                .getResultList();

        for (AccountServiceEntity accountService : accountServices) {
            String accountServiceId = accountService.getId();
            AccountCalculationDto calculation = new AccountCalculationDto();
            calculation.setAccountServiceId(accountServiceId);
            calculation.setService(accountService.getService());
            calculation.setTariff(getTariffCalculation(accountServiceId, accruals));
            calculation.setTariffCalculationType(getTariffCalculationTypeCalculation(accountServiceId, accruals));
            calculation.setTariffMeasurementUnit(getTariffMeasurementUnitCalculation(accountServiceId, accruals));
            calculation.setTariffValue(getTariffValueCalculation(accountServiceId, accruals));
            calculation.setOpeningBalance(getServiceCalculation(accountServiceId, openingBalances));
            calculation.setConsumption(getServiceConsumption(accountServiceId, accruals));
            calculation.setAccrual(getServiceCalculation(accountServiceId, accruals));
            calculation.setRecalculation(getServiceCalculation(accountServiceId, recalculations));
            calculation.setPayment(getServiceCalculation(accountServiceId, payments));
            Double closingBalance = calculation.getOpeningBalance();
            closingBalance += calculation.getAccrual();
            closingBalance -= calculation.getPayment();
            closingBalance += calculation.getRecalculation();
            BigDecimal closingBalanceRounded = new BigDecimal(closingBalance);
            calculation.setClosingBalance(closingBalanceRounded.setScale(6, BigDecimal.ROUND_HALF_UP).doubleValue());
            results.add(calculation);
        }

        boolean accountCalculationsIsEmpty = true;
        for (AccountCalculationDto accountCalculationDto : results) {
            if (accountCalculationDto.getTariffValue() > 0) {
                accountCalculationsIsEmpty = false;
            }
        }
        if (accountCalculationsIsEmpty) {
            results.clear();
        }
        return results;
    }

    private Double getServiceCalculation(String accountServiceId, List<AccountServiceCalculationDto> list) {
        Double sum = 0D;
        for (AccountServiceCalculationDto accountServiceCalculationDto : list) {
            if (accountServiceCalculationDto.getAccountService().getId().equals(accountServiceId)) {
                sum += accountServiceCalculationDto.getSum();
            }
        }
        return sum;
    }

    private TariffEntity getTariffCalculation(String accountServiceId, List<AccountServiceCalculationDto> list) {
        TariffEntity tariff = null;
        for (AccountServiceCalculationDto accountServiceCalculationDto : list) {
            if (accountServiceCalculationDto.getAccountService().getId().equals(accountServiceId)) {
                tariff = accountServiceCalculationDto.getTariff();
            }
        }
        return tariff;
    }

    private CalculationTypeEntity getTariffCalculationTypeCalculation(String accountServiceId, List<AccountServiceCalculationDto> list) {
        CalculationTypeEntity tariffCalculationType = null;
        for (AccountServiceCalculationDto accountServiceCalculationDto : list) {
            if (accountServiceCalculationDto.getAccountService().getId().equals(accountServiceId)) {
                tariffCalculationType = accountServiceCalculationDto.getTariffCalculationType();
            }
        }
        return tariffCalculationType;
    }

    private MeasurementUnitEntity getTariffMeasurementUnitCalculation(String accountServiceId, List<AccountServiceCalculationDto> list) {
        MeasurementUnitEntity tariffMeasurementUnit = null;
        for (AccountServiceCalculationDto accountServiceCalculationDto : list) {
            if (accountServiceCalculationDto.getAccountService().getId().equals(accountServiceId)) {
                tariffMeasurementUnit = accountServiceCalculationDto.getTariffMeasurementUnit();
            }
        }
        return tariffMeasurementUnit;
    }

    private Double getTariffValueCalculation(String accountServiceId, List<AccountServiceCalculationDto> list) {
        Double tariffValue = 0D;
        for (AccountServiceCalculationDto accountServiceCalculationDto : list) {
            if (accountServiceCalculationDto.getAccountService().getId().equals(accountServiceId)) {
                tariffValue = accountServiceCalculationDto.getTariffValue();
            }
        }
        return tariffValue;
    }

    private Double getServiceConsumption(String accountServiceId, List<AccountServiceCalculationDto> list) {
        Double consumption = 0D;
        for (AccountServiceCalculationDto accountServiceCalculationDto : list) {
            if (accountServiceCalculationDto.getAccountService().getId().equals(accountServiceId)) {
                consumption += accountServiceCalculationDto.getConsumption();
            }
        }
        return consumption;
    }
}
