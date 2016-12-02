package rent.common.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import rent.common.entity.BuildingMaterialEntity;
import rent.common.projection.BuildingMaterialBasic;

import java.util.List;

@RepositoryRestResource(
        collectionResourceRel = "building-materials",
        path = "building-material",
        itemResourceRel = "building-material",
        excerptProjection = BuildingMaterialBasic.class)
public interface BuildingMaterialRepository extends PagingAndSortingRepository<BuildingMaterialEntity, String> {
    List<BuildingMaterialEntity> findByNameContainingOrderByName(@Param("name") String name);
}
