package rent.common.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import rent.common.entity.AccountServiceEntity;
import rent.common.projection.AccountServiceBasic;

@RepositoryRestResource(
        collectionResourceRel = "account-services",
        path = "account-service",
        itemResourceRel = "account-service",
        excerptProjection = AccountServiceBasic.class)
public interface AccountServiceRepository extends PagingAndSortingRepository<AccountServiceEntity, String> {
}
