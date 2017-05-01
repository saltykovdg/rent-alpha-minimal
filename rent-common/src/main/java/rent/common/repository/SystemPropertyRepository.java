package rent.common.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import rent.common.entity.SystemPropertyEntity;
import rent.common.projection.SystemPropertyBasic;

import java.util.List;

@RepositoryRestResource(
        collectionResourceRel = "system-properties",
        path = "system-property",
        itemResourceRel = "system-property",
        excerptProjection = SystemPropertyBasic.class)
public interface SystemPropertyRepository extends PagingAndSortingRepository<SystemPropertyEntity, String> {
    SystemPropertyEntity findFirstByNameContaining(@Param("name") String name);

    List<SystemPropertyEntity> findByNameContainingOrderByName(@Param("name") String name);
}
