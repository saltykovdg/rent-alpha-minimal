package rent.common.projection;

import org.springframework.data.rest.core.config.Projection;
import rent.common.entity.ServiceEntity;

@Projection(types = {ServiceEntity.class})
public interface ServiceMinimalWithoutType {
    String getName();
}
