package rent.common.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import rent.common.entity.CalculationTypeEntity;
import rent.common.projection.CalculationTypeBasic;

import java.util.List;

@RepositoryRestResource(
        collectionResourceRel = "calculation-types",
        path = "calculation-type",
        itemResourceRel = "calculation-type",
        excerptProjection = CalculationTypeBasic.class)
public interface CalculationTypeRepository extends PagingAndSortingRepository<CalculationTypeEntity, String> {
    List<CalculationTypeEntity> findByNameContainingOrderByName(@Param("name") String name);
}
