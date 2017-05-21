package rent.common.projection;

import org.springframework.data.rest.core.config.Projection;
import rent.common.entity.RegistrationTypeEntity;

@Projection(types = {RegistrationTypeEntity.class})
public interface RegistrationTypeMinimal {
    String getId();

    String getName();
}
