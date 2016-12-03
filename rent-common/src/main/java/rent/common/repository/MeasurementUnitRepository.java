package rent.common.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import rent.common.entity.MeasurementUnitEntity;
import rent.common.projection.MeasurementUnitBasic;

import java.util.List;

@RepositoryRestResource(
        collectionResourceRel = "measurement-units",
        path = "measurement-unit",
        itemResourceRel = "measurement-unit",
        excerptProjection = MeasurementUnitBasic.class)
public interface MeasurementUnitRepository extends PagingAndSortingRepository<MeasurementUnitEntity, String> {
    List<MeasurementUnitEntity> findByNameContainingOrderByName(@Param("name") String name);
}
