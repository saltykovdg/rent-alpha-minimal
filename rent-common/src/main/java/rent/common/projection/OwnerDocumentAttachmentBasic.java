package rent.common.projection;

import org.springframework.data.rest.core.config.Projection;
import rent.common.entity.OwnerDocumentAttachmentEntity;

@Projection(types = {OwnerDocumentAttachmentEntity.class})
public interface OwnerDocumentAttachmentBasic extends AbstractBasic {
    String getName();

    String getUrlLink();
}
