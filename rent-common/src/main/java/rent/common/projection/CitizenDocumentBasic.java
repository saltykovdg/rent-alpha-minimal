package rent.common.projection;

import org.springframework.data.rest.core.config.Projection;
import rent.common.entity.CitizenDocumentEntity;

import java.util.Date;
import java.util.List;

@Projection(types = {CitizenDocumentEntity.class})
public interface CitizenDocumentBasic extends AbstractBasic {
    DocumentTypeBasic getDocumentType();

    String getDocumentSeries();

    String getDocumentNumber();

    String getDocumentIssuingAuthority();

    Date getDocumentDateIssue();

    List<CitizenDocumentAttachmentBasic> getDocumentAttachments();

    Date getDateStart();

    Date getDateEnd();
}
