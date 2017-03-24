package rent.common.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import rent.common.entity.NormEntity;
import rent.common.projection.NormBasic;

import java.util.List;

@RepositoryRestResource(
        collectionResourceRel = "norms",
        path = "norm",
        itemResourceRel = "norm",
        excerptProjection = NormBasic.class)
public interface NormRepository extends PagingAndSortingRepository<NormEntity, String> {
    List<NormEntity> findByNameContainingOrderByName(@Param("name") String name);

    @Query("select distinct norm from NormEntity norm join norm.service service where " +
            "service.id = :serviceId order by norm.name")
    List<NormEntity> findByServiceId(@Param("serviceId") String serviceId);
}
