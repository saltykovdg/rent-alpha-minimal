package rent.common.repository;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.transaction.annotation.Transactional;
import rent.common.entity.AccountPaymentEntity;
import rent.common.projection.AccountPaymentBasic;

import java.util.List;

@RepositoryRestResource(
        collectionResourceRel = "account-payments",
        path = "account-payment",
        itemResourceRel = "account-payment",
        excerptProjection = AccountPaymentBasic.class)
public interface AccountPaymentRepository extends PagingAndSortingRepository<AccountPaymentEntity, String> {
    @Query("select distinct accountPayment from AccountPaymentEntity accountPayment " +
            "join accountPayment.accountService accountService " +
            "join accountPayment.workingPeriod workingPeriod " +
            "join accountService.account account " +
            "where account.id = :accountId order by workingPeriod.dateStart desc")
    List<AccountPaymentEntity> findByAccountId(@Param("accountId") String accountId);

    @Query("select distinct accountPayment from AccountPaymentEntity accountPayment " +
            "join accountPayment.accountService accountService " +
            "join accountPayment.workingPeriod workingPeriod " +
            "where accountService.id = :accountServiceId order by workingPeriod.dateStart desc")
    List<AccountPaymentEntity> findByAccountServiceId(@Param("accountServiceId") String accountServiceId);

    @Modifying
    @Transactional
    @Query("delete from AccountPaymentEntity accountPayment " +
            "where accountPayment.accountService.id = :accountServiceId")
    void deleteByAccountServiceId(@Param("accountServiceId") String accountServiceId);
}
