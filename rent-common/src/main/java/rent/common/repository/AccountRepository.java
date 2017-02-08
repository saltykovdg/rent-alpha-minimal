package rent.common.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import rent.common.entity.AccountEntity;
import rent.common.projection.AccountBasic;

@RepositoryRestResource(
        collectionResourceRel = "accounts",
        path = "account",
        itemResourceRel = "account",
        excerptProjection = AccountBasic.class)
public interface AccountRepository extends PagingAndSortingRepository<AccountEntity, String> {
    @Query("select account from AccountEntity account where lower(account.accountNumber) like concat('%', lower(:accountNumber), '%')")
    Page<AccountEntity> findByAccountNumber(@Param("accountNumber") String accountNumber, Pageable p);
}
