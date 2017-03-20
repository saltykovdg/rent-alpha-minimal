package rent.common.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import rent.common.entity.MeterTypeEntity;
import rent.common.projection.MeterTypeBasic;

import java.util.List;

@RepositoryRestResource(
        collectionResourceRel = "meter-types",
        path = "meter-type",
        itemResourceRel = "meter-type",
        excerptProjection = MeterTypeBasic.class)
public interface MeterTypeRepository extends PagingAndSortingRepository<MeterTypeEntity, String> {
    MeterTypeEntity findByCode(@Param("code") String code);

    List<MeterTypeEntity> findByNameContainingOrderByName(@Param("name") String name);
}
