package rent.common.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import rent.common.entity.GenderEntity;
import rent.common.projection.GenderBasic;

import java.util.List;

@RepositoryRestResource(
        collectionResourceRel = "genders",
        path = "gender",
        itemResourceRel = "gender",
        excerptProjection = GenderBasic.class)
public interface GenderRepository extends PagingAndSortingRepository<GenderEntity, String> {
    List<GenderEntity> findByNameContainingOrderByName(@Param("name") String name);
}
