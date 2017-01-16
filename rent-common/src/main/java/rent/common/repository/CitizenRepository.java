package rent.common.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import rent.common.entity.CitizenEntity;
import rent.common.projection.CitizenBasic;

@RepositoryRestResource(
        collectionResourceRel = "citizens",
        path = "citizen",
        itemResourceRel = "citizen",
        excerptProjection = CitizenBasic.class)
public interface CitizenRepository extends PagingAndSortingRepository<CitizenEntity, String> {
}
