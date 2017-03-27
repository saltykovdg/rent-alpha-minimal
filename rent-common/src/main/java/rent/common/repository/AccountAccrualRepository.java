package rent.common.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import rent.common.entity.AccountAccrualEntity;
import rent.common.projection.AccountAccrualBasic;

import java.util.List;

@RepositoryRestResource(
        collectionResourceRel = "account-accruals",
        path = "account-accrual",
        itemResourceRel = "account-accrual",
        excerptProjection = AccountAccrualBasic.class)
public interface AccountAccrualRepository extends PagingAndSortingRepository<AccountAccrualEntity, String> {
    @Query("select distinct accountAccrual from AccountAccrualEntity accountAccrual " +
            "join accountAccrual.accountService accountService " +
            "join accountService.account account where " +
            "account.id = :accountId order by accountAccrual.period")
    List<AccountAccrualEntity> findByAccountId(@Param("accountId") String accountId);

    @Query("select distinct accountAccrual from AccountAccrualEntity accountAccrual " +
            "join accountAccrual.accountService accountService where " +
            "accountService.id = :accountServiceId order by accountAccrual.period")
    List<AccountAccrualEntity> findByAccountServiceId(@Param("accountServiceId") String accountServiceId);
}
