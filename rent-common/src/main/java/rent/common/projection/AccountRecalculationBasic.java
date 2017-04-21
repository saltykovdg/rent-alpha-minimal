package rent.common.projection;

import org.springframework.data.rest.core.config.Projection;
import rent.common.entity.AccountRecalculationEntity;
import rent.common.entity.AccountServiceEntity;
import rent.common.entity.WorkingPeriodEntity;

@Projection(types = {AccountRecalculationEntity.class})
public interface AccountRecalculationBasic extends AbstractBasic {
    AccountServiceEntity getAccountService();

    WorkingPeriodEntity getWorkingPeriod();

    WorkingPeriodEntity getForWorkingPeriod();

    Double getConsumption();

    Double getValue();
}
