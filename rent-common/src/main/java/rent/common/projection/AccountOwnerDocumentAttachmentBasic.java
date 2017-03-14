package rent.common.projection;

import org.springframework.data.rest.core.config.Projection;
import rent.common.entity.AccountOwnerDocumentAttachmentEntity;

@Projection(types = {AccountOwnerDocumentAttachmentEntity.class})
public interface AccountOwnerDocumentAttachmentBasic extends AbstractBasic {
    String getName();

    String getUrlLink();
}
