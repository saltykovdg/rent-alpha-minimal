package rent.common.repository;

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
}
