package rent.common.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
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
}
