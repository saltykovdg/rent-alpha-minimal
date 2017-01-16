package rent.common.projection;

import org.springframework.data.rest.core.config.Projection;
import rent.common.entity.GenderEntity;

@Projection(types = {GenderEntity.class})
public interface GenderBasic extends AbstractBasic {
    String getName();
}
