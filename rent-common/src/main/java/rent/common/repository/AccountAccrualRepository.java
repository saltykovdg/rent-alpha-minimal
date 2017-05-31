package rent.common.repository;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.transaction.annotation.Transactional;
import rent.common.entity.AccountAccrualEntity;
import rent.common.projection.AccountAccrualBasic;

@RepositoryRestResource(
        collectionResourceRel = "account-accruals",
        path = "account-accrual",
        itemResourceRel = "account-accrual",
        excerptProjection = AccountAccrualBasic.class)
public interface AccountAccrualRepository extends PagingAndSortingRepository<AccountAccrualEntity, String> {
    @Modifying
    @Transactional
    @Query("delete from AccountAccrualEntity accountAccrual " +
            "where accountAccrual.accountService.id = :accountServiceId")
    void deleteByAccountServiceId(@Param("accountServiceId") String accountServiceId);

    @Modifying
    @Transactional
    @Query("delete from AccountAccrualEntity accountAccrual where " +
            "accountAccrual.accountService.id = :accountServiceId and " +
            "accountAccrual.workingPeriod.id = :workingPeriodId")
    void deleteByAccountServiceIdAndWorkingPeriodId(@Param("accountServiceId") String accountServiceId,
                                                    @Param("workingPeriodId") String workingPeriodId);

    @Modifying
    @Transactional
    @Query("delete from AccountAccrualEntity accountAccrual " +
            "where accountAccrual.workingPeriod.id = :workingPeriodId")
    void deleteByWorkingPeriodId(@Param("workingPeriodId") String workingPeriodId);

    @Query("select sum(accountAccrual.value) from AccountAccrualEntity accountAccrual where " +
            "accountAccrual.accountService.id = :accountServiceId and " +
            "accountAccrual.workingPeriod.id = :workingPeriodId")
    Double getSumByAccountServiceIdAndWorkingPeriodId(@Param("accountServiceId") String accountServiceId,
                                                      @Param("workingPeriodId") String workingPeriodId);

    @Query("select sum(accountAccrual.consumption) from AccountAccrualEntity accountAccrual" +
            " join accountAccrual.accountService accountService " +
            " join accountService.service service " +
            " join accountService.account account " +
            " join account.apartment apartment " +
            " join apartment.building building where " +
            "service.id = :serviceId and " +
            "building.id = :buildingId and " +
            "accountAccrual.workingPeriod.id = :workingPeriodId")
    Double getSumConsumptionByServiceIdAndBuildingIdAndWorkingPeriodId(@Param("serviceId") String serviceId,
                                                                       @Param("buildingId") String buildingId,
                                                                       @Param("workingPeriodId") String workingPeriodId);

    @Query("select accountAccrual from AccountAccrualEntity accountAccrual where " +
            "accountAccrual.accountService.id = :accountServiceId and " +
            "accountAccrual.workingPeriod.id = :workingPeriodId")
    AccountAccrualEntity findByAccountServiceIdAndWorkingPeriodId(@Param("accountServiceId") String accountServiceId,
                                                                  @Param("workingPeriodId") String workingPeriodId);
}
