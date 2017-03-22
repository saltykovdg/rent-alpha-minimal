package rent.common.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import rent.common.entity.BuildingMeterEntity;
import rent.common.projection.BuildingMeterBasic;

@RepositoryRestResource(
        collectionResourceRel = "building-meters",
        path = "building-meter",
        itemResourceRel = "building-meter",
        excerptProjection = BuildingMeterBasic.class)
public interface BuildingMeterRepository extends PagingAndSortingRepository<BuildingMeterEntity, String> {
}
