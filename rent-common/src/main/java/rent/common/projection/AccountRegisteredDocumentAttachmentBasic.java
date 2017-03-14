package rent.common.projection;

import org.springframework.data.rest.core.config.Projection;
import rent.common.entity.AccountRegisteredDocumentAttachmentEntity;

@Projection(types = {AccountRegisteredDocumentAttachmentEntity.class})
public interface AccountRegisteredDocumentAttachmentBasic extends AbstractBasic {
    String getName();

    String getUrlLink();
}
