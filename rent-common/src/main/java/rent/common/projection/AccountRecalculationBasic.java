package rent.common.projection;

import org.springframework.data.rest.core.config.Projection;
import rent.common.entity.AccountRecalculationEntity;

@Projection(types = {AccountRecalculationEntity.class})
public interface AccountRecalculationBasic extends AbstractBasic {
    RecalculationTypeBasic getRecalculationType();

    AccountServiceBasic getAccountService();

    RecalculationTypeBasic getWorkingPeriod();

    RecalculationTypeBasic getForWorkingPeriod();

    Double getConsumption();

    Double getValue();

    String getNote();

    TariffBasic getTariff();

    CalculationTypeBasic getTariffCalculationType();

    MeasurementUnitBasic getTariffMeasurementUnit();

    Double getTariffValue();
}
