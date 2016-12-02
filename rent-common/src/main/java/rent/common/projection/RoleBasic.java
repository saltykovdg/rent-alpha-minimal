package rent.common.projection;

import org.springframework.data.rest.core.config.Projection;
import rent.common.entity.RoleEntity;

@Projection(types = {RoleEntity.class})
public interface RoleBasic extends AbstractBasic {
    String getName();
}
