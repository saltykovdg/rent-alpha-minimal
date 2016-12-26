package rent.common.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import rent.common.entity.TariffValueEntity;
import rent.common.projection.TariffValueBasic;

@RepositoryRestResource(
        collectionResourceRel = "tariff-values",
        path = "tariff-value",
        itemResourceRel = "tariff-value",
        excerptProjection = TariffValueBasic.class)
public interface TariffValueRepository extends PagingAndSortingRepository<TariffValueEntity, String> {
}
