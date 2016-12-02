package rent.common.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import rent.common.entity.ContractorEntity;
import rent.common.projection.ContractorBasic;

import java.util.List;

@RepositoryRestResource(
        collectionResourceRel = "contractors",
        path = "contractor",
        itemResourceRel = "contractor",
        excerptProjection = ContractorBasic.class)
public interface ContractorRepository extends PagingAndSortingRepository<ContractorEntity, String> {
    List<ContractorEntity> findByNameContainingOrderByName(@Param("name") String name);
}
