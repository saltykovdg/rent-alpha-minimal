package rent.common.projection;

import org.springframework.data.rest.core.config.Projection;
import rent.common.entity.AccountParameterEntity;

import java.time.LocalDate;

@Projection(types = {AccountParameterEntity.class})
public interface AccountParameterBasic extends AbstractBasic {
    ParameterTypeBasic getParameterType();

    String getValue();

    LocalDate getDateStart();

    LocalDate getDateEnd();
}
