package rent.common.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import rent.common.entity.DistrictEntity;
import rent.common.projection.DistrictBasic;

import java.util.List;

@RepositoryRestResource(
        collectionResourceRel = "districts",
        path = "district",
        itemResourceRel = "district",
        excerptProjection = DistrictBasic.class)
public interface DistrictRepository extends PagingAndSortingRepository<DistrictEntity, String> {
    List<DistrictEntity> findByNameContainingOrderByName(@Param("name") String name);
}
