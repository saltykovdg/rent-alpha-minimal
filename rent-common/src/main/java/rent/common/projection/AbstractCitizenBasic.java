package rent.common.projection;

import java.util.Date;
import java.util.Set;

public interface AbstractCitizenBasic extends AbstractBasic {
    String getFirstName();

    String getLastName();

    String getFatherName();

    Date getBirthday();

    DocumentTypeBasic getDocumentTypeCitizen();

    String getDocumentCitizenSeries();

    String getDocumentCitizenNumber();

    String getDocumentCitizenIssuingAuthority();

    Date getDocumentCitizenDateIssue();

    Set<String> getDocumentCitizenAttachedFiles();
}
