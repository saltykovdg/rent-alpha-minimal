package rent.common.projection;

import org.springframework.data.rest.core.config.Projection;
import rent.common.entity.ContractorEntity;

@Projection(types = {ContractorEntity.class})
public interface ContractorMinimal {
    String getName();
}
