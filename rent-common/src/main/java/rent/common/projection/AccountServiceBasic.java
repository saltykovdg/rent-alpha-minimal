package rent.common.projection;

import org.springframework.data.rest.core.config.Projection;
import rent.common.entity.AccountServiceEntity;

import java.util.Date;

@Projection(types = {AccountServiceEntity.class})
public interface AccountServiceBasic extends AbstractBasic {
    ServiceBasic getService();

    Date getDateStart();

    Date getDateEnd();
}
