package rent.common.projection;

import org.springframework.data.rest.core.config.Projection;
import rent.common.entity.DocumentTypeEntity;

@Projection(types = {DocumentTypeEntity.class})
public interface DocumentTypeBasic extends AbstractBasic {
    String getName();
}
