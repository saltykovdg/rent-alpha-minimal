package rent.common.projection;

import org.springframework.data.rest.core.config.Projection;
import rent.common.entity.GenderTypeEntity;

@Projection(types = {GenderTypeEntity.class})
public interface GenderTypeBasic extends AbstractBasic {
    String getName();

    String getNameOrigin();
}
