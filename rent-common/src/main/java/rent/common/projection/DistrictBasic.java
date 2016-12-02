package rent.common.projection;

import org.springframework.data.rest.core.config.Projection;
import rent.common.entity.DistrictEntity;

@Projection(types = {DistrictEntity.class})
public interface DistrictBasic extends AbstractBasic {
    String getName();
}
