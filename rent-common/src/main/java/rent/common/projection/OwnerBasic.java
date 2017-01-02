package rent.common.projection;

import java.util.Date;
import java.util.Set;

public interface OwnerBasic extends AbstractCitizenBasic {
    String getDocumentEstablishesRightSeries();

    String getDocumentEstablishesRightNumber();

    String getDocumentEstablishesRightIssuingAuthority();

    Date getDocumentEstablishesRightDateIssue();

    Set<String> getDocumentEstablishesRightAttachedFiles();

    Date getDateStart();

    Date getDateEnd();
}
