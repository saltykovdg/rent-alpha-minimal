package rent.common.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import rent.common.entity.GenderTypeEntity;
import rent.common.projection.GenderTypeBasic;

import java.util.List;

@RepositoryRestResource(
        collectionResourceRel = "gender-types",
        path = "gender-type",
        itemResourceRel = "gender-type",
        excerptProjection = GenderTypeBasic.class)
public interface GenderTypeRepository extends PagingAndSortingRepository<GenderTypeEntity, String> {
    List<GenderTypeEntity> findByNameContainingOrderByName(@Param("name") String name);
}
