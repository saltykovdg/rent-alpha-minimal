package rent.common.projection;

import java.util.Date;

public interface AbstractBasic {
    String getId();

    Date getCreationDate();

    Date getLastModifiedDate();

    Long getVersion();
}
