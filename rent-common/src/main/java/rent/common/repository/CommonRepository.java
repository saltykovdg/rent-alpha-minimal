package rent.common.repository;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import rent.common.dtos.AccountCalculationDto;
import rent.common.dtos.AccountServiceCalculationDto;
import rent.common.entity.AbstractEntity;
import rent.common.entity.AccountServiceEntity;
import rent.common.entity.WorkingPeriodEntity;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
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

        hql = "select new rent.common.dtos.AccountServiceCalculationDto(accountService, sum(accruals.value), sum(accruals.consumption)) " +
                "from AccountAccrualEntity accruals " +
                "join accruals.accountService accountService " +
                "join accruals.workingPeriod workingPeriod " +
                "join accountService.account account " +
                "where account.id = :accountId and workingPeriod.id = :workingPeriodId " +
                "group by accountService";
        accruals = entityManager.createQuery(hql, AccountServiceCalculationDto.class)
                .setParameter("accountId", accountId)
                .setParameter("workingPeriodId", workingPeriodId)
                .getResultList();

        hql = "select new rent.common.dtos.AccountServiceCalculationDto(accountService, sum(recalculations.value), sum(recalculations.consumption)) " +
                "from AccountRecalculationEntity recalculations " +
                "join recalculations.accountService accountService " +
                "join recalculations.workingPeriod workingPeriod " +
                "join accountService.account account " +
                "where account.id = :accountId and workingPeriod.id = :workingPeriodId " +
                "group by accountService";
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
            AccountCalculationDto calculation = new AccountCalculationDto();
            calculation.setService(accountService.getService());
            calculation.setTariff(accountService.getTariff());
            calculation.setOpeningBalance(getServiceCalculation(accountService.getId(), openingBalances));
            calculation.setConsumption(getServiceConsumption(accountService.getId(), accruals));
            calculation.setAccrual(getServiceCalculation(accountService.getId(), accruals));
            calculation.setRecalculation(getServiceCalculation(accountService.getId(), recalculations));
            calculation.setPayment(getServiceCalculation(accountService.getId(), payments));
            Double closingBalance = calculation.getOpeningBalance();
            closingBalance += calculation.getAccrual();
            closingBalance -= calculation.getPayment();
            closingBalance += calculation.getRecalculation();
            calculation.setClosingBalance(closingBalance);
            results.add(calculation);
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

    private Double getServiceConsumption(String accountServiceId, List<AccountServiceCalculationDto> list) {
        Double consumption = 0D;
        for (AccountServiceCalculationDto accountServiceCalculationDto : list) {
            if (accountServiceCalculationDto.getAccountService().getId().equals(accountServiceId)) {
                consumption += accountServiceCalculationDto.getConsumption();
            }
        }
        return consumption;
    }

    public void deleteCalculationsByAccountServiceId(String accountServiceId) {
        String hql = "delete from AccountOpeningBalanceEntity accountOpeningBalance " +
                "where accountOpeningBalance.accountService.id = :accountServiceId";
        entityManager.createQuery(hql).setParameter("accountServiceId", accountServiceId)
                .executeUpdate();

        hql = "delete from AccountAccrualEntity accountAccrual " +
                "where accountAccrual.accountService.id = :accountServiceId";
        entityManager.createQuery(hql).setParameter("accountServiceId", accountServiceId)
                .executeUpdate();

        hql = "delete from AccountRecalculationEntity accountRecalculation " +
                "where accountRecalculation.accountService.id = :accountServiceId";
        entityManager.createQuery(hql).setParameter("accountServiceId", accountServiceId)
                .executeUpdate();

        hql = "delete from AccountPaymentEntity accountPayment " +
                "where accountPayment.accountService.id = :accountServiceId";
        entityManager.createQuery(hql).setParameter("accountServiceId", accountServiceId)
                .executeUpdate();
    }

    public void deleteCalculationsForPeriod(String accountServiceId, String currentWorkingPeriodId, String forWorkingPeriodId) {
        if (currentWorkingPeriodId.equals(forWorkingPeriodId)) {
            String hql = "delete from AccountAccrualEntity accountAccrual where " +
                    "accountAccrual.accountService.id = :accountServiceId and " +
                    "accountAccrual.workingPeriod.id = :currentWorkingPeriodId";
            entityManager.createQuery(hql)
                    .setParameter("accountServiceId", accountServiceId)
                    .setParameter("currentWorkingPeriodId", currentWorkingPeriodId)
                    .executeUpdate();
        } else {
            String hql = "delete from AccountRecalculationEntity accountRecalculation where " +
                    "accountRecalculation.accountService.id = :accountServiceId and " +
                    "accountRecalculation.workingPeriod.id = :currentWorkingPeriodId and " +
                    "accountRecalculation.forWorkingPeriod.id = :forWorkingPeriodId";
            entityManager.createQuery(hql)
                    .setParameter("accountServiceId", accountServiceId)
                    .setParameter("currentWorkingPeriodId", currentWorkingPeriodId)
                    .setParameter("forWorkingPeriodId", forWorkingPeriodId)
                    .executeUpdate();
        }
    }
}
