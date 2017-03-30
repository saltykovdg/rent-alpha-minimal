package rent.common.repository;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import rent.common.dtos.AccountCalculationDto;
import rent.common.entity.AbstractEntity;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

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

    // todo: in progress
    public List<AccountCalculationDto> getCalculationsByAccount(String accountId) {
        String hql = "select new rent.common.dtos.AccountCalculationDto(service, " +
                "coalesce(sum(openingBalances.value), 0), " +
                "coalesce(sum(accruals.value), 0), " +
                "coalesce(sum(recalculations.value), 0), " +
                "coalesce(sum(payments.value), 0)) " +
                "from AccountServiceEntity accountService " +
                "left join accountService.service service " +
                "left join accountService.account account " +
                "left join accountService.openingBalances openingBalances " +
                "left join accountService.accruals accruals " +
                "left join accountService.recalculations recalculations " +
                "left join accountService.payments payments " +
                "where account.id = :accountId" +
                "group by service";
        return entityManager.createQuery(hql, AccountCalculationDto.class)
                .setParameter("accountId", accountId)
                .getResultList();
    }
}
