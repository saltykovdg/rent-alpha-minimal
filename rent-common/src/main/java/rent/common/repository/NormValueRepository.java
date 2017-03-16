package rent.common.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import rent.common.entity.NormValueEntity;
import rent.common.projection.NormValueBasic;

@RepositoryRestResource(
        collectionResourceRel = "norm-values",
        path = "norm-value",
        itemResourceRel = "norm-value",
        excerptProjection = NormValueBasic.class)
public interface NormValueRepository extends PagingAndSortingRepository<NormValueEntity, String> {
}
