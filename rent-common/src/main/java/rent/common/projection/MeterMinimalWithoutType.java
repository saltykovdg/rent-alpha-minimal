package rent.common.projection;

import org.springframework.data.rest.core.config.Projection;
import rent.common.entity.MeterEntity;

@Projection(types = {MeterEntity.class})
public interface MeterMinimalWithoutType {
    String getId();

    ServiceMinimalWithoutType getService();

    String getName();

    String getSerialNumber();
}
