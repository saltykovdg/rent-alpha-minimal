package rent.common.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import rent.common.entity.OwnerDocumentAttachmentEntity;
import rent.common.projection.OwnerDocumentAttachmentBasic;

@RepositoryRestResource(
        collectionResourceRel = "owner-document-attachments",
        path = "owner-document-attachment",
        itemResourceRel = "owner-document-attachment",
        excerptProjection = OwnerDocumentAttachmentBasic.class)
public interface OwnerDocumentAttachmentRepository extends PagingAndSortingRepository<OwnerDocumentAttachmentEntity, String> {
}
