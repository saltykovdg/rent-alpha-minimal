package rent.common.projection;

import org.springframework.data.rest.core.config.Projection;
import rent.common.entity.MeterEntity;

import java.util.List;

@Projection(types = {MeterEntity.class})
public interface MeterBasic extends AbstractBasic {
    MeterTypeBasic getMeterType();

    ServiceBasic getService();

    String getName();

    String getSerialNumber();

    List<MeterValueBasic> getValues();
}
