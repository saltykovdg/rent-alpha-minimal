package rent.common.projection;

import org.springframework.data.rest.core.config.Projection;
import rent.common.entity.AccountOwnerEntity;

import java.util.Date;
import java.util.List;

@Projection(types = {AccountOwnerEntity.class})
public interface AccountOwnerBasic extends AbstractBasic {
    CitizenBasic getCitizen();

    DocumentTypeBasic getDocumentType();

    String getDocumentSeries();

    String getDocumentNumber();

    String getDocumentIssuingAuthority();

    Date getDocumentDateIssue();

    List<AccountOwnerDocumentAttachmentBasic> getDocumentAttachments();

    Date getDateStart();

    Date getDateEnd();
}
