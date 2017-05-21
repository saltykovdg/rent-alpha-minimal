package rent.common.repository;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.transaction.annotation.Transactional;
import rent.common.entity.AccountOpeningBalanceEntity;
import rent.common.projection.AccountOpeningBalanceBasic;

@RepositoryRestResource(
        collectionResourceRel = "account-opening-balances",
        path = "account-opening-balance",
        itemResourceRel = "account-opening-balance",
        excerptProjection = AccountOpeningBalanceBasic.class)
public interface AccountOpeningBalanceRepository extends PagingAndSortingRepository<AccountOpeningBalanceEntity, String> {
    @Modifying
    @Transactional
    @Query("delete from AccountOpeningBalanceEntity accountOpeningBalance " +
            "where accountOpeningBalance.accountService.id = :accountServiceId")
    void deleteByAccountServiceId(@Param("accountServiceId") String accountServiceId);

    @Modifying
    @Transactional
    @Query("delete from AccountOpeningBalanceEntity accountOpeningBalance " +
            "where accountOpeningBalance.workingPeriod.id = :workingPeriodId")
    void deleteByWorkingPeriodId(@Param("workingPeriodId") String workingPeriodId);

    @Query("select sum(accountOpeningBalance.value) from AccountOpeningBalanceEntity accountOpeningBalance where " +
            "accountOpeningBalance.accountService.id = :accountServiceId and " +
            "accountOpeningBalance.workingPeriod.id = :workingPeriodId")
    Double getSumByAccountServiceIdAndWorkingPeriodId(@Param("accountServiceId") String accountServiceId,
                                                      @Param("workingPeriodId") String workingPeriodId);
}
