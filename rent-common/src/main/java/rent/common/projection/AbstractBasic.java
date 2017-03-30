package rent.common.projection;

import java.time.LocalDateTime;

public interface AbstractBasic {
    String getId();

    LocalDateTime getCreationDate();

    LocalDateTime getLastModifiedDate();

    Long getVersion();
}
