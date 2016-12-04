package rent.common.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import rent.common.entity.ParameterTypeEntity;
import rent.common.projection.ParameterTypeBasic;

import java.util.List;

@RepositoryRestResource(
        collectionResourceRel = "parameter-types",
        path = "parameter-type",
        itemResourceRel = "parameter-type",
        excerptProjection = ParameterTypeBasic.class)
public interface ParameterTypeRepository extends PagingAndSortingRepository<ParameterTypeEntity, String> {
    ParameterTypeEntity findByCode(@Param("code") String code);

    List<ParameterTypeEntity> findByNameContainingOrderByName(@Param("name") String name);
}
