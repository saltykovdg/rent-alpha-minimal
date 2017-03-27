package rent.common.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import rent.common.entity.AccountRecalculationEntity;
import rent.common.projection.AccountRecalculationBasic;

import java.util.List;

@RepositoryRestResource(
        collectionResourceRel = "account-recalculations",
        path = "account-recalculation",
        itemResourceRel = "account-recalculation",
        excerptProjection = AccountRecalculationBasic.class)
public interface AccountRecalculationRepository extends PagingAndSortingRepository<AccountRecalculationEntity, String> {
    @Query("select distinct accountRecalculation from AccountRecalculationEntity accountRecalculation " +
            "join accountRecalculation.accountService accountService " +
            "join accountService.account account where " +
            "account.id = :accountId order by accountRecalculation.period")
    List<AccountRecalculationEntity> findByAccountId(@Param("accountId") String accountId);

    @Query("select distinct accountRecalculation from AccountRecalculationEntity accountRecalculation " +
            "join accountRecalculation.accountService accountService where " +
            "accountService.id = :accountServiceId order by accountRecalculation.period")
    List<AccountRecalculationEntity> findByAccountServiceId(@Param("accountServiceId") String accountServiceId);
}
