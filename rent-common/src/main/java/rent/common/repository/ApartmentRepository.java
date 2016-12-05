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
    @Query("select apartment from ApartmentEntity apartment join apartment.building building where building.id = :buildingId order by apartment.apartment")
    List<ApartmentEntity> findByBuildingId(@Param("buildingId") String buildingId);

    @Query("select apartment from ApartmentEntity apartment join apartment.building building join building.street street where street.name like concat('%', :streetName, '%') and building.house like concat('%', :buildingName, '%')")
    Page<ApartmentEntity> findByStreetNameAndBuildingName(@Param("streetName") String streetName, @Param("buildingName") String buildingName, Pageable p);
}
