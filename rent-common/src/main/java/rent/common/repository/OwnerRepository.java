package rent.common.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import rent.common.entity.OwnerEntity;
import rent.common.projection.OwnerBasic;

@RepositoryRestResource(
        collectionResourceRel = "owners",
        path = "owner",
        itemResourceRel = "owner",
        excerptProjection = OwnerBasic.class)
public interface OwnerRepository extends PagingAndSortingRepository<OwnerEntity, String> {
}
