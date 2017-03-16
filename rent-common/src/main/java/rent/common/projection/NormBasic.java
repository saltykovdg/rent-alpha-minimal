package rent.common.projection;

import org.springframework.data.rest.core.config.Projection;
import rent.common.entity.NormEntity;

import java.util.List;

@Projection(types = {NormEntity.class})
public interface NormBasic extends AbstractBasic {
    String getName();

    ServiceBasic getService();

    List<NormValueBasic> getValues();
}
