package rent.common.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.transaction.annotation.Transactional;
import rent.common.dtos.ServiceCalculationDto;
import rent.common.dtos.ServiceCalculationInfoDto;
import rent.common.entity.AccountPaymentEntity;
import rent.common.projection.AccountPaymentBasic;

import java.util.List;

@RepositoryRestResource(
        collectionResourceRel = "account-payments",
        path = "account-payment",
        itemResourceRel = "account-payment",
        excerptProjection = AccountPaymentBasic.class)
public interface AccountPaymentRepository extends PagingAndSortingRepository<AccountPaymentEntity, String> {
    @Modifying
    @Transactional
    @Query("delete from AccountPaymentEntity accountPayment " +
            "where accountPayment.accountService.id = :accountServiceId")
    void deleteByAccountServiceId(@Param("accountServiceId") String accountServiceId);

    @Modifying
    @Transactional
    @Query("delete from AccountPaymentEntity accountPayment " +
            "where accountPayment.workingPeriod.id = :workingPeriodId")
    void deleteByWorkingPeriodId(@Param("workingPeriodId") String workingPeriodId);

    @Modifying
    @Transactional
    @Query("delete from AccountPaymentEntity accountPayment where " +
            "accountPayment.bundleId = :paymentBundleId and " +
            "accountPayment.workingPeriod.id = :workingPeriodId")
    void deleteByBundleId(@Param("paymentBundleId") String paymentBundleId,
                          @Param("workingPeriodId") String workingPeriodId);

    @Query("select sum(accountPayment.value) from AccountPaymentEntity accountPayment where " +
            "accountPayment.accountService.id = :accountServiceId and " +
            "accountPayment.workingPeriod.id = :workingPeriodId")
    Double getSumByAccountServiceIdAndWorkingPeriodId(@Param("accountServiceId") String accountServiceId,
                                                      @Param("workingPeriodId") String workingPeriodId);

    @Query("select new rent.common.dtos.ServiceCalculationInfoDto(accountService.service, sum(accountPayment.value)) from AccountPaymentEntity accountPayment " +
            "join accountPayment.accountService accountService " +
            "where accountPayment.bundleId = :bundleId " +
            "group by accountService.service")
    List<ServiceCalculationInfoDto> getSumInfoByBundleId(@Param("bundleId") String bundleId);

    @Query("select new rent.common.dtos.ServiceCalculationDto(accountPayment.workingPeriod, accountPayment.date, accountPayment.bundleId, sum(accountPayment.value)) from AccountPaymentEntity accountPayment " +
            "join accountPayment.accountService accountService " +
            "join accountPayment.workingPeriod workingPeriod " +
            "join accountService.account account " +
            "where account.id = :accountId " +
            "group by accountPayment.workingPeriod, accountPayment.date, accountPayment.bundleId " +
            "order by accountPayment.date desc")
    Page<ServiceCalculationDto> getSumByAccountIdPageable(@Param("accountId") String accountId, Pageable p);
}
