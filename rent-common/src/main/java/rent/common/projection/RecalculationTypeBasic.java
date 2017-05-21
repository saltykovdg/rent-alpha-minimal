package rent.common.projection;

import org.springframework.data.rest.core.config.Projection;
import rent.common.entity.RecalculationTypeEntity;

@Projection(types = {RecalculationTypeEntity.class})
public interface RecalculationTypeBasic extends AbstractBasic {
    String getCode();

    String getName();

    String getNameOrigin();
}
