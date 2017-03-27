package rent.common.projection;

import org.springframework.data.rest.core.config.Projection;
import rent.common.entity.AccountOpeningBalanceEntity;
import rent.common.entity.AccountServiceEntity;

import java.util.Date;

@Projection(types = {AccountOpeningBalanceEntity.class})
public interface AccountOpeningBalanceBasic extends AbstractBasic {
    AccountServiceEntity getAccountService();

    Date getPeriod();

    Double getValue();
}
