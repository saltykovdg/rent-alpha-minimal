package rent.common.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import rent.common.entity.MeterValueEntity;
import rent.common.projection.MeterValueBasic;

@RepositoryRestResource(
        collectionResourceRel = "meter-values",
        path = "meter-value",
        itemResourceRel = "meter-value",
        excerptProjection = MeterValueBasic.class)
public interface MeterValueRepository extends PagingAndSortingRepository<MeterValueEntity, String> {
}
