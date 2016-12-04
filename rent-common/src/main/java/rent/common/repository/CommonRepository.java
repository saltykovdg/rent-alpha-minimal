package rent.common.repository;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import rent.common.entity.AbstractEntity;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

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
}
