package rent.common.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import rent.common.entity.RegistrationTypeEntity;
import rent.common.projection.RegistrationTypeBasic;

import java.util.List;

@RepositoryRestResource(
        collectionResourceRel = "registration-types",
        path = "registration-type",
        itemResourceRel = "registration-type",
        excerptProjection = RegistrationTypeBasic.class)
public interface RegistrationTypeRepository extends PagingAndSortingRepository<RegistrationTypeEntity, String> {
    List<RegistrationTypeEntity> findByNameContainingOrderByName(@Param("name") String name);
}
