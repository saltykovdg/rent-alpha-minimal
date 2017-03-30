package rent.common.projection;

import org.springframework.data.rest.core.config.Projection;
import rent.common.entity.AccountOwnerEntity;

import java.time.LocalDate;
import java.util.List;

@Projection(types = {AccountOwnerEntity.class})
public interface AccountOwnerBasic extends AbstractBasic {
    CitizenBasic getCitizen();

    DocumentTypeBasic getDocumentType();

    String getDocumentSeries();

    String getDocumentNumber();

    String getDocumentIssuingAuthority();

    LocalDate getDocumentDateIssue();

    List<AccountOwnerDocumentAttachmentBasic> getDocumentAttachments();

    LocalDate getDateStart();

    LocalDate getDateEnd();
}
