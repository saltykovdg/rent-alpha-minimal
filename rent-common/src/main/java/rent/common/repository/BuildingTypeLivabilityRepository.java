package rent.common.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import rent.common.entity.BuildingTypeLivabilityEntity;
import rent.common.projection.BuildingTypeLivabilityBasic;

import java.util.List;

@RepositoryRestResource(
        collectionResourceRel = "building-types-livability",
        path = "building-type-livability",
        itemResourceRel = "building-type-livability",
        excerptProjection = BuildingTypeLivabilityBasic.class)
public interface BuildingTypeLivabilityRepository extends PagingAndSortingRepository<BuildingTypeLivabilityEntity, String> {
    List<BuildingTypeLivabilityEntity> findByNameContainingOrderByName(@Param("name") String name);
}
