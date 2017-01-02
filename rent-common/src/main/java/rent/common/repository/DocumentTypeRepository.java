package rent.common.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import rent.common.entity.DocumentTypeEntity;
import rent.common.entity.MeasurementUnitEntity;
import rent.common.projection.DocumentTypeBasic;

import java.util.List;

@RepositoryRestResource(
        collectionResourceRel = "document-types",
        path = "document-type",
        itemResourceRel = "document-type",
        excerptProjection = DocumentTypeBasic.class)
public interface DocumentTypeRepository extends PagingAndSortingRepository<DocumentTypeEntity, String> {
    List<MeasurementUnitEntity> findByNameContainingOrderByName(@Param("name") String name);
}
