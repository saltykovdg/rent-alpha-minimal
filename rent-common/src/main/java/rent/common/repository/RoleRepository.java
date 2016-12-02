package rent.common.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import rent.common.entity.RoleEntity;
import rent.common.projection.RoleBasic;

import java.util.List;

@RepositoryRestResource(
        collectionResourceRel = "roles",
        path = "role",
        itemResourceRel = "role",
        excerptProjection = RoleBasic.class)
public interface RoleRepository extends PagingAndSortingRepository<RoleEntity, String> {
    RoleEntity findByName(@Param("name") String name);

    List<RoleEntity> findByNameContainingOrderByName(@Param("name") String name);
}
