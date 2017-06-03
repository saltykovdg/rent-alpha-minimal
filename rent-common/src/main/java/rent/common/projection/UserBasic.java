package rent.common.projection;

import org.springframework.data.rest.core.config.Projection;
import rent.common.entity.UserEntity;

@Projection(types = {UserEntity.class})
public interface UserBasic extends AbstractBasic {
    String getLogin();

    String getPassword();

    String getFirstName();

    String getLastName();

    String getFatherName();

    String getEmail();

    Boolean getBlocked();

    Boolean getOnline();

    RoleBasic getRole();

    String getFullName();

    String getFullNameShort();
}
