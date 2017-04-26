package rent.common.projection;

import org.springframework.data.rest.core.config.Projection;
import rent.common.entity.NormEntity;

@Projection(types = {NormEntity.class})
public interface NormMinimal {
    String getId();

    String getName();

    ServiceMinimalWithoutType getService();
}
