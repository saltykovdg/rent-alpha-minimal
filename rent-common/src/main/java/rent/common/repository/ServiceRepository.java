package rent.common.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import rent.common.entity.ServiceEntity;
import rent.common.projection.ServiceBasic;

import java.util.List;

@RepositoryRestResource(
        collectionResourceRel = "services",
        path = "service",
        itemResourceRel = "service",
        excerptProjection = ServiceBasic.class)
public interface ServiceRepository extends PagingAndSortingRepository<ServiceEntity, String> {
    List<ServiceEntity> findByNameContainingOrderByName(@Param("name") String name);
}
