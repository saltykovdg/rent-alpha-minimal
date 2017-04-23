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
    @Query("select apartment from ApartmentEntity apartment " +
            "join apartment.building building " +
            "join building.street street " +
            "where building.id = :buildingId " +
            "order by street.name, building.houseNumber, apartment.apartmentNumber")
    List<ApartmentEntity> findByBuildingId(@Param("buildingId") String buildingId);

    @Query("select apartment from ApartmentEntity apartment " +
            "join apartment.building building " +
            "join building.street street where " +
            "lower(street.name) like concat('%', lower(:street), '%') and " +
            "lower(building.house) like concat('%', lower(:house), '%') and " +
            "lower(apartment.apartment) like concat('%', lower(:apartment), '%') " +
            "order by street.name, building.houseNumber, apartment.apartmentNumber")
    Page<ApartmentEntity> find(@Param("street") String street, @Param("house") String house,
                               @Param("apartment") String apartment, Pageable p);

    @Query("select apartment from ApartmentEntity apartment")
    List<ApartmentEntity> findAll();
}
