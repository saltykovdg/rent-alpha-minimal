package rent.common.projection;

import org.springframework.data.rest.core.config.Projection;
import rent.common.entity.ApartmentEntity;

@Projection(types = {ApartmentEntity.class})
public interface ApartmentMinimalForAccount {
    BuildingMinimalForAccount getBuilding();

    String getApartment();

    String getTotalArea();
}
