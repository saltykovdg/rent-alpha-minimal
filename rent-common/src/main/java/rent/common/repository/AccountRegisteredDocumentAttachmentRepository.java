package rent.common.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import rent.common.entity.AccountRegisteredDocumentAttachmentEntity;
import rent.common.projection.AccountRegisteredDocumentAttachmentBasic;

@RepositoryRestResource(
        collectionResourceRel = "account-registered-document-attachments",
        path = "account-registered-document-attachment",
        itemResourceRel = "account-registered-document-attachment",
        excerptProjection = AccountRegisteredDocumentAttachmentBasic.class)
public interface AccountRegisteredDocumentAttachmentRepository extends PagingAndSortingRepository<AccountRegisteredDocumentAttachmentEntity, String> {
}
