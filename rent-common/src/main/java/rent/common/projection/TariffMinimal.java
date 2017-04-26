package rent.common.projection;

import org.springframework.data.rest.core.config.Projection;
import rent.common.entity.TariffEntity;

@Projection(types = {TariffEntity.class})
public interface TariffMinimal {
    String getId();

    String getName();

    ServiceMinimalWithoutType getService();
}
