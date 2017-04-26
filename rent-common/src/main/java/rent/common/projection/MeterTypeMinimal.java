package rent.common.projection;

import org.springframework.data.rest.core.config.Projection;
import rent.common.entity.MeterTypeEntity;

@Projection(types = {MeterTypeEntity.class})
public interface MeterTypeMinimal {
    String getName();
}
