package rent.common.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import rent.common.entity.StreetEntity;
import rent.common.projection.StreetBasic;

import java.util.List;

@RepositoryRestResource(
        collectionResourceRel = "streets",
        path = "street",
        itemResourceRel = "street",
        excerptProjection = StreetBasic.class)
public interface StreetRepository extends PagingAndSortingRepository<StreetEntity, String> {
    List<StreetEntity> findByNameContainingOrderByName(@Param("name") String name);
}
