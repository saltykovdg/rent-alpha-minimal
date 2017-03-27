package rent.common.projection;

import org.springframework.data.rest.core.config.Projection;
import rent.common.entity.AccountRecalculationEntity;
import rent.common.entity.AccountServiceEntity;

import java.util.Date;

@Projection(types = {AccountRecalculationEntity.class})
public interface AccountRecalculationBasic extends AbstractBasic {
    AccountServiceEntity getAccountService();

    Date getPeriod();

    Double getValue();
}
