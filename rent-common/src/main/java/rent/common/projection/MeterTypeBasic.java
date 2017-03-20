package rent.common.projection;

import org.springframework.data.rest.core.config.Projection;
import rent.common.entity.MeterTypeEntity;

@Projection(types = {MeterTypeEntity.class})
public interface MeterTypeBasic extends AbstractBasic {
    String getCode();

    String getName();

    String getNameOrigin();
}
