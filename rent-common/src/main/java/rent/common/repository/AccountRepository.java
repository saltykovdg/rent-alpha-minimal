package rent.common.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
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
    @Query("select distinct account from AccountEntity account where " +
            "lower(account.accountNumber) like concat('%', lower(:accountNumber), '%')")
    Page<AccountEntity> findByAccountNumber(@Param("accountNumber") String accountNumber, Pageable p);

    @Query("select distinct account from AccountEntity account " +
            "join account.apartment apartment " +
            "join apartment.building building " +
            "join building.street street " +
            "left join account.owners owners " +
            "left join owners.citizen citizenOwner " +
            "left join account.registered registered " +
            "left join registered.citizen citizenRegistered where " +
            "lower(account.accountNumber) like concat('%', lower(:accountNumber), '%') and " +
            "lower(street.name) like concat('%', lower(:street), '%') and " +
            "lower(building.house) like concat('%', lower(:house), '%') and " +
            "lower(apartment.apartment) like concat('%', lower(:apartment), '%') and " +
            "(lower(coalesce(citizenOwner.lastName, '')) like concat('%', lower(:lastName), '%') or " +
            "lower(coalesce(citizenRegistered.lastName, '')) like concat('%', lower(:lastName), '%'))")
    Page<AccountEntity> find(@Param("accountNumber") String accountNumber, @Param("lastName") String lastName,
                             @Param("street") String street, @Param("house") String house,
                             @Param("apartment") String apartment, Pageable p);

    @Query("select account.id from AccountEntity account")
    List<String> getAccountsIds();
}
