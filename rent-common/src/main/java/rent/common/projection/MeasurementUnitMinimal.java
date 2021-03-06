package rent.common.projection;

import org.springframework.data.rest.core.config.Projection;
import rent.common.entity.MeasurementUnitEntity;

@Projection(types = {MeasurementUnitEntity.class})
public interface MeasurementUnitMinimal {
    String getId();

    String getName();
}
