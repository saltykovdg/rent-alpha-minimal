package rent.common.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import rent.common.entity.BuildingEntity;
import rent.common.projection.BuildingBasic;

import java.util.List;

@RepositoryRestResource(
        collectionResourceRel = "buildings",
        path = "building",
        itemResourceRel = "building",
        excerptProjection = BuildingBasic.class)
public interface BuildingRepository extends PagingAndSortingRepository<BuildingEntity, String> {
    @Query("select distinct building from BuildingEntity building join building.street street where " +
            "street.id = :streetId order by building.house")
    List<BuildingEntity> findByStreetId(@Param("streetId") String streetId);

    @Query("select distinct building from BuildingEntity building join building.street street where " +
            "lower(street.name) like concat('%', lower(:street), '%') and " +
            "lower(building.house) like concat('%', lower(:house), '%')")
    Page<BuildingEntity> find(@Param("street") String streetName, @Param("house") String house, Pageable p);

    @Query("select building from BuildingEntity building")
    List<BuildingEntity> findAll();
}
