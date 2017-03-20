package rent.common.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import rent.common.entity.MeterEntity;
import rent.common.projection.MeterBasic;

import java.util.List;

@RepositoryRestResource(
        collectionResourceRel = "meters",
        path = "meter",
        itemResourceRel = "meter",
        excerptProjection = MeterBasic.class)
public interface MeterRepository extends PagingAndSortingRepository<MeterEntity, String> {
    List<MeterEntity> findByNameContainingOrderByName(@Param("name") String name);

    @Query("select meter from MeterEntity meter join meter.service service where service.id = :serviceId order by meter.name")
    List<MeterEntity> findByServiceId(@Param("serviceId") String serviceId);

    @Query("select meter from MeterEntity meter join meter.service service where lower(service.name) like concat('%', lower(:serviceName), '%') and lower(meter.name) like concat('%', lower(:meterName), '%')")
    Page<MeterEntity> findByServiceNameAndMeterName(@Param("serviceName") String serviceName, @Param("meterName") String meterName, Pageable p);
}
