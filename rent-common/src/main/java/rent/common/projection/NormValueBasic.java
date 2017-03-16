package rent.common.projection;

import org.springframework.data.rest.core.config.Projection;
import rent.common.entity.NormValueEntity;

import java.util.Date;

@Projection(types = {NormValueEntity.class})
public interface NormValueBasic extends AbstractBasic {
    MeasurementUnitBasic getMeasurementUnit();

    Double getValue();

    Date getDateStart();

    Date getDateEnd();
}
