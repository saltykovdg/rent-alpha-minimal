package rent.common.projection;

import org.springframework.data.rest.core.config.Projection;
import rent.common.entity.BuildingEntity;

import java.util.List;

@Projection(types = {BuildingEntity.class})
public interface BuildingBasic extends AbstractBasic {
    StreetBasic getStreet();

    String getHouse();

    Integer getHouseNumber();

    String getHousing();

    List<BuildingMeterBasic> getMeters();

    List<BuildingMeterBasic> getCurrentMeters();
}
