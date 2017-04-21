package rent.common.projection;

import org.springframework.data.rest.core.config.Projection;
import rent.common.entity.AccountPaymentEntity;
import rent.common.entity.AccountServiceEntity;
import rent.common.entity.WorkingPeriodEntity;

@Projection(types = {AccountPaymentEntity.class})
public interface AccountPaymentBasic extends AbstractBasic {
    AccountServiceEntity getAccountService();

    WorkingPeriodEntity getWorkingPeriod();

    Double getValue();
}
