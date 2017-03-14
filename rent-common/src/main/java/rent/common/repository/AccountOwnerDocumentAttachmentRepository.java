package rent.common.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import rent.common.entity.AccountOwnerDocumentAttachmentEntity;
import rent.common.projection.AccountOwnerDocumentAttachmentBasic;

@RepositoryRestResource(
        collectionResourceRel = "account-owner-document-attachments",
        path = "account-owner-document-attachment",
        itemResourceRel = "account-owner-document-attachment",
        excerptProjection = AccountOwnerDocumentAttachmentBasic.class)
public interface AccountOwnerDocumentAttachmentRepository extends PagingAndSortingRepository<AccountOwnerDocumentAttachmentEntity, String> {
}
