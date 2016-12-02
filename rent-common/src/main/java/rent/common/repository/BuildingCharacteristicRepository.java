package rent.common.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import rent.common.entity.BuildingCharacteristicEntity;

@RepositoryRestResource(
        collectionResourceRel = "building-characteristics",
        path = "building-characteristics",
        itemResourceRel = "building-characteristics")
public interface BuildingCharacteristicRepository extends PagingAndSortingRepository<BuildingCharacteristicEntity, String> {
}
