package rent.common.repository;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import rent.common.dtos.AccountCalculationDto;
import rent.common.dtos.ServiceCalculationDto;
import rent.common.entity.AbstractEntity;
import rent.common.entity.ServiceEntity;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.time.LocalDate;
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

    public List<AccountCalculationDto> getCalculationsByAccount(String accountId, LocalDate period) {
        List<AccountCalculationDto> results = new ArrayList<>();
        List<ServiceCalculationDto> openingBalances;
        List<ServiceCalculationDto> accruals;
        List<ServiceCalculationDto> recalculations;
        List<ServiceCalculationDto> payments;

        String hql = "select new rent.common.dtos.ServiceCalculationDto(accountService.service, sum(openingBalances.value)) " +
                "from AccountOpeningBalanceEntity openingBalances " +
                "join openingBalances.accountService accountService " +
                "join accountService.account account " +
                "where account.id = :accountId and openingBalances.period = :period " +
                "group by accountService.service";
        openingBalances = entityManager.createQuery(hql, ServiceCalculationDto.class)
                .setParameter("accountId", accountId)
                .setParameter("period", period)
                .getResultList();

        hql = "select new rent.common.dtos.ServiceCalculationDto(accountService.service, sum(accruals.value)) " +
                "from AccountAccrualEntity accruals " +
                "join accruals.accountService accountService " +
                "join accountService.account account " +
                "where account.id = :accountId and accruals.period = :period " +
                "group by accountService.service";
        accruals = entityManager.createQuery(hql, ServiceCalculationDto.class)
                .setParameter("accountId", accountId)
                .setParameter("period", period)
                .getResultList();

        hql = "select new rent.common.dtos.ServiceCalculationDto(accountService.service, sum(recalculations.value)) " +
                "from AccountRecalculationEntity recalculations " +
                "join recalculations.accountService accountService " +
                "join accountService.account account " +
                "where account.id = :accountId and recalculations.period = :period " +
                "group by accountService.service";
        recalculations = entityManager.createQuery(hql, ServiceCalculationDto.class)
                .setParameter("accountId", accountId)
                .setParameter("period", period)
                .getResultList();

        hql = "select new rent.common.dtos.ServiceCalculationDto(accountService.service, sum(payments.value)) " +
                "from AccountPaymentEntity payments " +
                "join payments.accountService accountService " +
                "join accountService.account account " +
                "where account.id = :accountId and payments.period = :period " +
                "group by accountService.service";
        payments = entityManager.createQuery(hql, ServiceCalculationDto.class)
                .setParameter("accountId", accountId)
                .setParameter("period", period)
                .getResultList();

        hql = "select distinct service from AccountServiceEntity accountService " +
                "join accountService.service service " +
                "join accountService.account account " +
                "where account.id = :accountId and " +
                "accountService.dateStart <= :period and " +
                "(accountService.dateEnd is null or accountService.dateEnd >= :period)" +
                "order by service.name";
        List<ServiceEntity> services = entityManager.createQuery(hql, ServiceEntity.class)
                .setParameter("accountId", accountId)
                .setParameter("period", period)
                .getResultList();

        for (ServiceEntity service : services) {
            AccountCalculationDto calculation = new AccountCalculationDto();
            calculation.setService(service);
            calculation.setOpeningBalances(getServiceCalculation(service.getId(), openingBalances));
            calculation.setAccruals(getServiceCalculation(service.getId(), accruals));
            calculation.setRecalculations(getServiceCalculation(service.getId(), recalculations));
            calculation.setPayments(getServiceCalculation(service.getId(), payments));
            results.add(calculation);
        }

        return results;
    }

    private Double getServiceCalculation(String serviceId, List<ServiceCalculationDto> list) {
        Double sum = 0D;
        for (ServiceCalculationDto serviceCalculation : list) {
            if (serviceCalculation.getService().getId().equals(serviceId)) {
                sum += serviceCalculation.getSum();
            }
        }
        return sum;
    }
}
