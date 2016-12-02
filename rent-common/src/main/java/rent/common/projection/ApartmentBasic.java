package rent.common.projection;

import org.springframework.data.rest.core.config.Projection;
import rent.common.entity.ApartmentEntity;

@Projection(types = {ApartmentEntity.class})
public interface ApartmentBasic extends AbstractBasic {
    BuildingBasic getBuilding();

    Integer getEntrance();

    Integer getFloor();

    String getApartment();

    Integer getApartmentNumber();

    String getApartmentLetter();

    String getTotalArea();

    String getLivingArea();

    Integer getRoomsNumber();
}
