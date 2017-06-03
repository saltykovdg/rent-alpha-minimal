package rent.common.projection;

import org.springframework.data.rest.core.config.Projection;
import rent.common.entity.RoleEntity;

@Projection(types = {RoleEntity.class})
public interface RoleMinimal {
    String getId();

    String getName();

    String getDescription();
}
