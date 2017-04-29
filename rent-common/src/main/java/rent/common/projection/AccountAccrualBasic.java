package rent.common.projection;

import org.springframework.data.rest.core.config.Projection;
import rent.common.entity.AccountAccrualEntity;
import rent.common.entity.AccountServiceEntity;
import rent.common.entity.WorkingPeriodEntity;

@Projection(types = {AccountAccrualEntity.class})
public interface AccountAccrualBasic extends AbstractBasic {
    AccountServiceEntity getAccountService();

    WorkingPeriodEntity getWorkingPeriod();

    Double getConsumption();

    Double getValue();

    TariffBasic getTariff();

    CalculationTypeBasic getTariffCalculationType();

    MeasurementUnitBasic getTariffMeasurementUnit();

    Double getTariffValue();
}
