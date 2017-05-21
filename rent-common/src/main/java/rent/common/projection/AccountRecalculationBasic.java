package rent.common.projection;

import org.springframework.data.rest.core.config.Projection;
import rent.common.entity.AccountRecalculationEntity;

import java.time.LocalDateTime;

@Projection(types = {AccountRecalculationEntity.class})
public interface AccountRecalculationBasic extends AbstractBasic {
    RecalculationTypeBasic getRecalculationType();

    AccountServiceBasic getAccountService();

    RecalculationTypeBasic getWorkingPeriod();

    RecalculationTypeBasic getForWorkingPeriod();

    LocalDateTime getDate();

    String getBundleId();

    Double getConsumption();

    Double getValue();

    String getNote();

    TariffBasic getTariff();

    CalculationTypeBasic getTariffCalculationType();

    MeasurementUnitBasic getTariffMeasurementUnit();

    Double getTariffValue();
}
