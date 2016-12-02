package rent.common.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import rent.common.entity.StreetTypeEntity;
import rent.common.projection.StreetTypeBasic;

import java.util.List;

@RepositoryRestResource(
        collectionResourceRel = "street-types",
        path = "street-type",
        itemResourceRel = "street-type",
        excerptProjection = StreetTypeBasic.class)
public interface StreetTypeRepository extends PagingAndSortingRepository<StreetTypeEntity, String> {
    List<StreetTypeEntity> findByNameContainingOrderByName(@Param("name") String name);
}
