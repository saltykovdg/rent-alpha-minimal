package rent.common.projection;

import org.springframework.data.rest.core.config.Projection;
import rent.common.entity.MeterValueEntity;

import java.util.Date;

@Projection(types = {MeterValueEntity.class})
public interface MeterValueBasic extends AbstractBasic {
    Double getValue();

    Double getConsumption();

    Date getDateValue();
}
