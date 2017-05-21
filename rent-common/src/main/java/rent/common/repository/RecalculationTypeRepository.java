package rent.common.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import rent.common.entity.RecalculationTypeEntity;
import rent.common.projection.RecalculationTypeBasic;

import java.util.List;

@RepositoryRestResource(
        collectionResourceRel = "recalculation-types",
        path = "recalculation-type",
        itemResourceRel = "recalculation-type",
        excerptProjection = RecalculationTypeBasic.class)
public interface RecalculationTypeRepository extends PagingAndSortingRepository<RecalculationTypeEntity, String> {
    RecalculationTypeEntity findByCode(@Param("code") String code);

    List<RecalculationTypeEntity> findByNameContainingOrderByCode(@Param("name") String name);
}
