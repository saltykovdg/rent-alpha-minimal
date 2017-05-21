package rent.common.projection;

import org.springframework.data.rest.core.config.Projection;
import rent.common.entity.CalculationTypeEntity;

@Projection(types = {CalculationTypeEntity.class})
public interface CalculationTypeMinimal {
    String getId();

    String getCode();

    String getName();
}
