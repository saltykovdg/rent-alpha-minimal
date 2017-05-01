package rent.common.projection;

import org.springframework.data.rest.core.config.Projection;
import rent.common.entity.SystemPropertyEntity;

@Projection(types = {SystemPropertyEntity.class})
public interface SystemPropertyBasic extends AbstractBasic {
    String getName();

    String getValue();
}
