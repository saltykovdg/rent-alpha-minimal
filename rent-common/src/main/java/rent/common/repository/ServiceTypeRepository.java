package rent.common.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import rent.common.entity.ServiceTypeEntity;
import rent.common.projection.ServiceTypeBasic;

import java.util.List;

@RepositoryRestResource(
        collectionResourceRel = "service-types",
        path = "service-type",
        itemResourceRel = "service-type",
        excerptProjection = ServiceTypeBasic.class)
public interface ServiceTypeRepository extends PagingAndSortingRepository<ServiceTypeEntity, String> {
    List<ServiceTypeEntity> findByNameContainingOrderByName(@Param("name") String name);
}
