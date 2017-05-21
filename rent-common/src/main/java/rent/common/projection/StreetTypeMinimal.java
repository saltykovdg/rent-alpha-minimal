package rent.common.projection;

import org.springframework.data.rest.core.config.Projection;
import rent.common.entity.StreetTypeEntity;

@Projection(types = {StreetTypeEntity.class})
public interface StreetTypeMinimal {
    String getId();

    String getName();

    String getNameShort();
}
