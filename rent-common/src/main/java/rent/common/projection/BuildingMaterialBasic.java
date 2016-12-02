package rent.common.projection;

import org.springframework.data.rest.core.config.Projection;
import rent.common.entity.BuildingMaterialEntity;

@Projection(types = {BuildingMaterialEntity.class})
public interface BuildingMaterialBasic extends AbstractBasic {
    String getName();
}
