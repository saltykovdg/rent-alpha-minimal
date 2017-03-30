package rent.common.projection;

import org.springframework.data.rest.core.config.Projection;
import rent.common.entity.NormValueEntity;

import java.time.LocalDate;

@Projection(types = {NormValueEntity.class})
public interface NormValueBasic extends AbstractBasic {
    MeasurementUnitBasic getMeasurementUnit();

    Double getValue();

    LocalDate getDateStart();

    LocalDate getDateEnd();
}
