package rent.common.projection;

import org.springframework.data.rest.core.config.Projection;
import rent.common.entity.ParameterTypeEntity;

@Projection(types = {ParameterTypeEntity.class})
public interface ParameterTypeBasic extends AbstractBasic {
    String getCode();

    String getName();

    String getNameOrigin();
}
