package rent.common.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import rent.common.entity.AccountParameterEntity;
import rent.common.projection.AccountParameterBasic;

@RepositoryRestResource(
        collectionResourceRel = "account-parameters",
        path = "account-parameter",
        itemResourceRel = "account-parameter",
        excerptProjection = AccountParameterBasic.class)
public interface AccountParameterRepository extends PagingAndSortingRepository<AccountParameterEntity, String> {
}
