package rent.common.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import rent.common.entity.AccountOpeningBalanceEntity;
import rent.common.projection.AccountOpeningBalanceBasic;

import java.util.List;

@RepositoryRestResource(
        collectionResourceRel = "account-opening-balances",
        path = "account-opening-balance",
        itemResourceRel = "account-opening-balance",
        excerptProjection = AccountOpeningBalanceBasic.class)
public interface AccountOpeningBalanceRepository extends PagingAndSortingRepository<AccountOpeningBalanceEntity, String> {
    @Query("select distinct accountOpeningBalance from AccountOpeningBalanceEntity accountOpeningBalance " +
            "join accountOpeningBalance.accountService accountService " +
            "join accountOpeningBalance.workingPeriod workingPeriod " +
            "join accountService.account account " +
            "where account.id = :accountId order by workingPeriod.dateStart desc")
    List<AccountOpeningBalanceEntity> findByAccountId(@Param("accountId") String accountId);

    @Query("select distinct accountOpeningBalance from AccountOpeningBalanceEntity accountOpeningBalance " +
            "join accountOpeningBalance.accountService accountService " +
            "join accountOpeningBalance.workingPeriod workingPeriod " +
            "where accountService.id = :accountServiceId order by workingPeriod.dateStart desc")
    List<AccountOpeningBalanceEntity> findByAccountServiceId(@Param("accountServiceId") String accountServiceId);
}
