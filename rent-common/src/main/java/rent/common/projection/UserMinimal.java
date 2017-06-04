package rent.common.projection;

import org.springframework.data.rest.core.config.Projection;
import rent.common.entity.UserEntity;

@Projection(types = {UserEntity.class})
public interface UserMinimal {
    String getId();

    String getLogin();

    String getFullName();

    String getEmail();

    Boolean getBlocked();

    Boolean getOnline();

    RoleMinimal getRole();
}
