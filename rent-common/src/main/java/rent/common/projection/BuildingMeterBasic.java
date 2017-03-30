package rent.common.projection;

import org.springframework.data.rest.core.config.Projection;
import rent.common.entity.BuildingMeterEntity;

import java.time.LocalDate;

@Projection(types = {BuildingMeterEntity.class})
public interface BuildingMeterBasic extends AbstractBasic {
    MeterBasic getMeter();

    LocalDate getDateStart();

    LocalDate getDateEnd();
}
