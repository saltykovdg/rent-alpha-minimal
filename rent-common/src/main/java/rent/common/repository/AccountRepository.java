package rent.common.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import rent.common.entity.AccountEntity;
import rent.common.projection.AccountBasic;

import java.util.List;

@RepositoryRestResource(
        collectionResourceRel = "accounts",
        path = "account",
        itemResourceRel = "account",
        excerptProjection = AccountBasic.class)
public interface AccountRepository extends PagingAndSortingRepository<AccountEntity, String> {
    List<AccountEntity> findByAccountNumberContainingOrderByAccountNumber(@Param("accountNumber") String accountNumber);
}
