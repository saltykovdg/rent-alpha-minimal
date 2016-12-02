package rent.common.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import rent.common.entity.ContractorTypeEntity;
import rent.common.projection.ContractorTypeBasic;

import java.util.List;

@RepositoryRestResource(
        collectionResourceRel = "contractor-types",
        path = "contractor-type",
        itemResourceRel = "contractor-type",
        excerptProjection = ContractorTypeBasic.class)
public interface ContractorTypeRepository extends PagingAndSortingRepository<ContractorTypeEntity, String> {
    List<ContractorTypeEntity> findByNameContainingOrderByName(@Param("name") String name);
}
