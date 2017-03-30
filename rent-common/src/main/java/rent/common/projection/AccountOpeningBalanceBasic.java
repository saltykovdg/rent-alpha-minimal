package rent.common.projection;

import org.springframework.data.rest.core.config.Projection;
import rent.common.entity.AccountOpeningBalanceEntity;
import rent.common.entity.AccountServiceEntity;

import java.time.LocalDate;

@Projection(types = {AccountOpeningBalanceEntity.class})
public interface AccountOpeningBalanceBasic extends AbstractBasic {
    AccountServiceEntity getAccountService();

    LocalDate getPeriod();

    Double getValue();
}
