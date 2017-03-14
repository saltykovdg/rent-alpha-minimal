package rent.common.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import rent.common.entity.AccountOwnerEntity;
import rent.common.projection.AccountOwnerBasic;

@RepositoryRestResource(
        collectionResourceRel = "account-owners",
        path = "account-owner",
        itemResourceRel = "account-owner",
        excerptProjection = AccountOwnerBasic.class)
public interface AccountOwnerRepository extends PagingAndSortingRepository<AccountOwnerEntity, String> {
}
