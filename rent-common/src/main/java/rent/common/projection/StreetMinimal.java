package rent.common.projection;

import org.springframework.data.rest.core.config.Projection;
import rent.common.entity.StreetEntity;

@Projection(types = {StreetEntity.class})
public interface StreetMinimal {
    String getName();

    StreetTypeMinimal getStreetType();
}
