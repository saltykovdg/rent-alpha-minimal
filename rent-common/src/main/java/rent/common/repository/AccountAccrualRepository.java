package rent.common.repository;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.transaction.annotation.Transactional;
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
            "join accountAccrual.workingPeriod workingPeriod " +
            "join accountService.account account " +
            "where account.id = :accountId order by workingPeriod.dateStart desc")
    List<AccountAccrualEntity> findByAccountId(@Param("accountId") String accountId);

    @Query("select distinct accountAccrual from AccountAccrualEntity accountAccrual " +
            "join accountAccrual.accountService accountService " +
            "join accountAccrual.workingPeriod workingPeriod " +
            "where accountService.id = :accountServiceId order by workingPeriod.dateStart desc")
    List<AccountAccrualEntity> findByAccountServiceId(@Param("accountServiceId") String accountServiceId);

    @Modifying
    @Transactional
    @Query("delete from AccountAccrualEntity accountAccrual " +
            "where accountAccrual.accountService.id = :accountServiceId")
    void deleteByAccountServiceId(@Param("accountServiceId") String accountServiceId);

    @Modifying
    @Transactional
    @Query("delete from AccountAccrualEntity accountAccrual where " +
            "accountAccrual.accountService.id = :accountServiceId and " +
            "accountAccrual.workingPeriod.id = :workingPeriodId")
    void deleteByAccountServiceIdAndWorkingPeriodId(@Param("accountServiceId") String accountServiceId,
                                                    @Param("workingPeriodId") String workingPeriodId);
}
