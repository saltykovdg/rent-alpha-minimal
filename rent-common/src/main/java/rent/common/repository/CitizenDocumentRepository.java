package rent.common.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import rent.common.entity.CitizenDocumentEntity;
import rent.common.projection.CitizenDocumentBasic;

@RepositoryRestResource(
        collectionResourceRel = "citizen-documents",
        path = "citizen-document",
        itemResourceRel = "citizen-document",
        excerptProjection = CitizenDocumentBasic.class)
public interface CitizenDocumentRepository extends PagingAndSortingRepository<CitizenDocumentEntity, String> {
}
