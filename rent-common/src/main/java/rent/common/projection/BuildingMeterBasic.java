package rent.common.projection;

import org.springframework.data.rest.core.config.Projection;
import rent.common.entity.BuildingMeterEntity;

import java.util.Date;

@Projection(types = {BuildingMeterEntity.class})
public interface BuildingMeterBasic extends AbstractBasic {
    MeterBasic getMeter();

    Date getDateStart();

    Date getDateEnd();
}
