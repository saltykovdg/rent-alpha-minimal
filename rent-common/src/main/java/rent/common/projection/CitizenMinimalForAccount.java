package rent.common.projection;

import org.springframework.data.rest.core.config.Projection;
import rent.common.entity.CitizenEntity;

@Projection(types = {CitizenEntity.class})
public interface CitizenMinimalForAccount {
    String getFirstName();

    String getLastName();

    String getFatherName();
}
