package rent.common.projection;

import org.springframework.data.rest.core.config.Projection;
import rent.common.entity.ContractorTypeEntity;

@Projection(types = {ContractorTypeEntity.class})
public interface ContractorTypeBasic extends AbstractBasic {
    String getName();

    String getNameShort();
}
