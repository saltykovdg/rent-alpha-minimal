package rent.common.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import rent.common.entity.ApartmentEntity;
import rent.common.projection.ApartmentBasic;

import java.util.List;

@RepositoryRestResource(
        collectionResourceRel = "apartments",
        path = "apartment",
        itemResourceRel = "apartment",
        excerptProjection = ApartmentBasic.class)
public interface ApartmentRepository extends PagingAndSortingRepository<ApartmentEntity, String> {
    @Query("select distinct apartment from ApartmentEntity apartment join apartment.building building where " +
            "building.id = :buildingId order by apartment.apartment")
    List<ApartmentEntity> findByBuildingId(@Param("buildingId") String buildingId);

    @Query("select distinct apartment from ApartmentEntity apartment join apartment.building building join building.street street where " +
            "lower(street.name) like concat('%', lower(:street), '%') and " +
            "lower(building.house) like concat('%', lower(:house), '%') and " +
            "lower(apartment.apartment) like concat('%', lower(:apartment), '%')")
    Page<ApartmentEntity> find(@Param("street") String street, @Param("house") String house,
                               @Param("apartment") String apartment, Pageable p);
}
