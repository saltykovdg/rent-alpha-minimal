package rent.common.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import rent.common.entity.AccountRegisteredEntity;
import rent.common.projection.AccountRegisteredBasic;

@RepositoryRestResource(
        collectionResourceRel = "account-registered",
        path = "account-registered",
        itemResourceRel = "account-registered",
        excerptProjection = AccountRegisteredBasic.class)
public interface AccountRegisteredRepository extends PagingAndSortingRepository<AccountRegisteredEntity, String> {
}
