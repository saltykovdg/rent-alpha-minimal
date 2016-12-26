package rent.common.projection;

import org.springframework.data.rest.core.config.Projection;
import rent.common.entity.TariffValueEntity;

import java.util.Date;

@Projection(types = {TariffValueEntity.class})
public interface TariffValueBasic extends AbstractBasic {
    Double getValue();

    Date getDateStart();

    Date getDateEnd();
}
