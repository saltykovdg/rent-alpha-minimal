package rent.common.projection;

import org.springframework.data.rest.core.config.Projection;
import rent.common.entity.ServiceTypeEntity;

@Projection(types = {ServiceTypeEntity.class})
public interface ServiceTypeBasic extends AbstractBasic {
    String getName();
}
