package rent.common.projection;

import org.springframework.data.rest.core.config.Projection;
import rent.common.entity.MeterValueEntity;

import java.time.LocalDate;

@Projection(types = {MeterValueEntity.class})
public interface MeterValueBasic extends AbstractBasic {
    Double getValue();

    Double getConsumption();

    LocalDate getDateValue();
}
