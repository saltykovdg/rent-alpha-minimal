package rent.common.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import rent.common.entity.CitizenDocumentAttachmentEntity;
import rent.common.projection.CitizenDocumentAttachmentBasic;

@RepositoryRestResource(
        collectionResourceRel = "citizen-document-attachments",
        path = "citizen-document-attachment",
        itemResourceRel = "citizen-document-attachment",
        excerptProjection = CitizenDocumentAttachmentBasic.class)
public interface CitizenDocumentAttachmentRepository extends PagingAndSortingRepository<CitizenDocumentAttachmentEntity, String> {
}
