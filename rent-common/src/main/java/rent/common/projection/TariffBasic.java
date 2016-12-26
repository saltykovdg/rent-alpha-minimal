package rent.common.projection;

import org.springframework.data.rest.core.config.Projection;
import rent.common.entity.TariffEntity;

import java.util.List;

@Projection(types = {TariffEntity.class})
public interface TariffBasic extends AbstractBasic {
    String getName();

    ServiceBasic getService();

    List<TariffValueBasic> getValues();
}
