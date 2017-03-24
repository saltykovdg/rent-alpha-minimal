package rent.common.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import rent.common.entity.TariffEntity;
import rent.common.projection.TariffBasic;

import java.util.List;

@RepositoryRestResource(
        collectionResourceRel = "tariffs",
        path = "tariff",
        itemResourceRel = "tariff",
        excerptProjection = TariffBasic.class)
public interface TariffRepository extends PagingAndSortingRepository<TariffEntity, String> {
    List<TariffEntity> findByNameContainingOrderByName(@Param("name") String name);

    @Query("select distinct tariff from TariffEntity tariff join tariff.service service where " +
            "service.id = :serviceId order by tariff.name")
    List<TariffEntity> findByServiceId(@Param("serviceId") String serviceId);
}
