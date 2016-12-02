package rent.common.projection;

import org.springframework.data.rest.core.config.Projection;
import rent.common.entity.BuildingTypeLivabilityEntity;

@Projection(types = {BuildingTypeLivabilityEntity.class})
public interface BuildingTypeLivabilityBasic extends AbstractBasic {
    String getName();
}
