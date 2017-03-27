package rent.common.projection;

import org.springframework.data.rest.core.config.Projection;
import rent.common.entity.AccountPaymentEntity;
import rent.common.entity.AccountServiceEntity;

import java.util.Date;

@Projection(types = {AccountPaymentEntity.class})
public interface AccountPaymentBasic extends AbstractBasic {
    AccountServiceEntity getAccountService();

    Date getPeriod();

    Double getValue();
}
