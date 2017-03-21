package rent.common.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import rent.common.entity.AccountMeterEntity;
import rent.common.projection.AccountMeterBasic;

@RepositoryRestResource(
        collectionResourceRel = "account-meters",
        path = "account-meter",
        itemResourceRel = "account-meter",
        excerptProjection = AccountMeterBasic.class)
public interface AccountMeterRepository extends PagingAndSortingRepository<AccountMeterEntity, String> {
}
