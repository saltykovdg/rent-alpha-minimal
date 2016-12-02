package rent.common.projection;

import org.springframework.data.rest.core.config.Projection;
import rent.common.entity.ServiceEntity;

@Projection(types = {ServiceEntity.class})
public interface ServiceBasic extends AbstractBasic {
    String getName();

    ServiceTypeBasic getServiceType();
}
