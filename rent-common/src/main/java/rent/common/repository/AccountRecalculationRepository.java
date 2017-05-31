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
import rent.common.entity.AccountRecalculationEntity;
import rent.common.projection.AccountRecalculationBasic;

import java.time.LocalDate;
import java.util.List;

@RepositoryRestResource(
        collectionResourceRel = "account-recalculations",
        path = "account-recalculation",
        itemResourceRel = "account-recalculation",
        excerptProjection = AccountRecalculationBasic.class)
public interface AccountRecalculationRepository extends PagingAndSortingRepository<AccountRecalculationEntity, String> {
    @Modifying
    @Transactional
    @Query("delete from AccountRecalculationEntity accountRecalculation " +
            "where accountRecalculation.accountService.id = :accountServiceId")
    void deleteByAccountServiceId(@Param("accountServiceId") String accountServiceId);

    @Modifying
    @Transactional
    @Query("delete from AccountRecalculationEntity accountRecalculation where " +
            "accountRecalculation.accountService.id = :accountServiceId and " +
            "accountRecalculation.workingPeriod.id = :workingPeriodId and " +
            "accountRecalculation.forWorkingPeriod.id = :forWorkingPeriodId and " +
            "accountRecalculation.recalculationType.id = :recalculationTypeId")
    void deleteByAccountServiceIdAndWorkingPeriodIdAndRecalculationTypeId(@Param("accountServiceId") String accountServiceId,
                                                                          @Param("workingPeriodId") String workingPeriodId,
                                                                          @Param("forWorkingPeriodId") String forWorkingPeriodId,
                                                                          @Param("recalculationTypeId") String recalculationTypeId);

    @Modifying
    @Transactional
    @Query("delete from AccountRecalculationEntity accountRecalculation " +
            "where accountRecalculation.workingPeriod.id = :workingPeriodId")
    void deleteByWorkingPeriodId(@Param("workingPeriodId") String workingPeriodId);

    @Modifying
    @Transactional
    @Query("delete from AccountRecalculationEntity accountRecalculation where " +
            "accountRecalculation.bundleId = :bundleId and " +
            "accountRecalculation.workingPeriod.id = :workingPeriodId")
    void deleteByBundleId(@Param("bundleId") String bundleId,
                          @Param("workingPeriodId") String workingPeriodId);

    @Query("select sum(accountRecalculation.value) from AccountRecalculationEntity accountRecalculation where " +
            "accountRecalculation.accountService.id = :accountServiceId and " +
            "accountRecalculation.forWorkingPeriod.id = :forWorkingPeriodId and " +
            "accountRecalculation.recalculationType.id = :recalculationTypeId")
    Double getSumByAccountServiceIdAndForWorkingPeriodIdAndRecalculationTypeId(@Param("accountServiceId") String accountServiceId,
                                                                               @Param("forWorkingPeriodId") String forWorkingPeriodId,
                                                                               @Param("recalculationTypeId") String recalculationTypeId);

    @Query("select sum(accountRecalculation.value) from AccountRecalculationEntity accountRecalculation where " +
            "accountRecalculation.accountService.id = :accountServiceId and " +
            "accountRecalculation.workingPeriod.id = :workingPeriodId")
    Double getSumByAccountServiceIdAndWorkingPeriodId(@Param("accountServiceId") String accountServiceId,
                                                      @Param("workingPeriodId") String workingPeriodId);

    @Query("select new rent.common.dtos.ServiceCalculationInfoDto(accountService.service, sum(accountRecalculation.value)) from AccountRecalculationEntity accountRecalculation " +
            "join accountRecalculation.accountService accountService " +
            "where accountRecalculation.bundleId = :bundleId " +
            "group by accountService.service")
    List<ServiceCalculationInfoDto> getSumInfoByBundleId(@Param("bundleId") String bundleId);

    @Query("select new rent.common.dtos.ServiceCalculationDto(accountRecalculation.recalculationType, accountRecalculation.note, accountRecalculation.forWorkingPeriod, accountRecalculation.workingPeriod, accountRecalculation.date, accountRecalculation.bundleId, sum(accountRecalculation.value)) from AccountRecalculationEntity accountRecalculation " +
            "join accountRecalculation.accountService accountService " +
            "join accountRecalculation.workingPeriod workingPeriod " +
            "join accountService.account account " +
            "where account.id = :accountId " +
            "group by accountRecalculation.recalculationType, accountRecalculation.note, accountRecalculation.forWorkingPeriod, accountRecalculation.workingPeriod, accountRecalculation.date, accountRecalculation.bundleId " +
            "order by accountRecalculation.date desc")
    Page<ServiceCalculationDto> getSumByAccountIdPageable(@Param("accountId") String accountId, Pageable p);

    @Query("select accountRecalculation from AccountRecalculationEntity accountRecalculation " +
            "join accountRecalculation.accountService accountService " +
            "join accountService.service service " +
            "join accountRecalculation.workingPeriod workingPeriod " +
            "join accountService.account account " +
            "where account.id = :accountId and workingPeriod.dateStart between :dateStart and :dateEnd " +
            "order by accountRecalculation.date desc, service.name")
    List<AccountRecalculationEntity> getByAccountIdAndPeriod(@Param("accountId") String accountId,
                                                             @Param("dateStart") LocalDate dateStart,
                                                             @Param("dateEnd") LocalDate dateEnd);
}
