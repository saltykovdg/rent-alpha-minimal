package rent.common.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import rent.common.entity.StreetEntity;
import rent.common.projection.StreetBasic;

import java.util.List;

@RepositoryRestResource(
        collectionResourceRel = "streets",
        path = "street",
        itemResourceRel = "street",
        excerptProjection = StreetBasic.class)
public interface StreetRepository extends PagingAndSortingRepository<StreetEntity, String> {
    List<StreetEntity> findByNameContainingOrderByName(@Param("name") String name);

    @Query("select street from StreetEntity street join street.streetType streetType where " +
            "lower(streetType.name) like concat('%', lower(:streetType), '%') and " +
            "lower(street.name) like concat('%', lower(:name), '%') " +
            "order by streetType.name, street.name")
    Page<StreetEntity> find(@Param("streetType") String streetType, @Param("name") String name, Pageable p);
}
