package rent.common.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import rent.common.entity.MeterEntity;
import rent.common.projection.MeterBasic;

@RepositoryRestResource(
        collectionResourceRel = "meters",
        path = "meter",
        itemResourceRel = "meter",
        excerptProjection = MeterBasic.class)
public interface MeterRepository extends PagingAndSortingRepository<MeterEntity, String> {
    @Query("select distinct meter from MeterEntity meter join meter.service service join meter.meterType meterType where " +
            "lower(meterType.name) like concat('%', lower(:meterType), '%') and " +
            "lower(service.name) like concat('%', lower(:service), '%') and " +
            "lower(meter.name) like concat('%', lower(:name), '%') and " +
            "lower(meter.serialNumber) like concat('%', lower(:serialNumber), '%') ")
    Page<MeterEntity> find(@Param("meterType") String meterType,
                           @Param("service") String service,
                           @Param("name") String name,
                           @Param("serialNumber") String serialNumber, Pageable p);

    @Query("select distinct meter from MeterEntity meter join meter.service service join meter.meterType meterType where " +
            "lower(service.name) like concat('%', lower(:service), '%') and " +
            "lower(meter.name) like concat('%', lower(:name), '%') and " +
            "lower(meter.serialNumber) like concat('%', lower(:serialNumber), '%') and " +
            "meterType.code = '01'")
    Page<MeterEntity> findIndividual(@Param("service") String service,
                                     @Param("name") String name,
                                     @Param("serialNumber") String serialNumber, Pageable p);

    @Query("select distinct meter from MeterEntity meter join meter.service service join meter.meterType meterType where " +
            "lower(service.name) like concat('%', lower(:service), '%') and " +
            "lower(meter.name) like concat('%', lower(:name), '%') and " +
            "lower(meter.serialNumber) like concat('%', lower(:serialNumber), '%') and " +
            "meterType.code = '02'")
    Page<MeterEntity> findCommonHouse(@Param("service") String service,
                                      @Param("name") String name,
                                      @Param("serialNumber") String serialNumber, Pageable p);
}
