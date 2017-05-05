package rent.common.repository;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.transaction.annotation.Transactional;
import rent.common.entity.WorkingPeriodEntity;
import rent.common.projection.WorkingPeriodBasic;

import java.time.LocalDate;
import java.util.List;

@RepositoryRestResource(
        collectionResourceRel = "working-periods",
        path = "working-period",
        itemResourceRel = "working-period",
        excerptProjection = WorkingPeriodBasic.class)
public interface WorkingPeriodRepository extends PagingAndSortingRepository<WorkingPeriodEntity, String> {
    WorkingPeriodEntity findByDateStart(@Param("dateStart") LocalDate dateStart);

    List<WorkingPeriodEntity> findByNameContainingOrderByDateStartDesc(@Param("name") String name);

    WorkingPeriodEntity getFirstByIdIsNotNullOrderByDateStartAsc();

    WorkingPeriodEntity getFirstByIdIsNotNullOrderByDateStartDesc();

    @Query("select workingPeriod from WorkingPeriodEntity workingPeriod " +
            "where workingPeriod.dateStart between :periodStart and :periodEnd")
    List<WorkingPeriodEntity> find(@Param("periodStart") LocalDate periodStart, @Param("periodEnd") LocalDate periodEnd);

    @Modifying
    @Transactional
    @Query("delete from WorkingPeriodEntity workingPeriod " +
            "where workingPeriod.id = :workingPeriodId")
    void deleteById(@Param("workingPeriodId") String workingPeriodId);
}
