package rent.common.projection;

import org.springframework.data.rest.core.config.Projection;
import rent.common.entity.TariffValueEntity;

import java.time.LocalDate;

@Projection(types = {TariffValueEntity.class})
public interface TariffValueBasic extends AbstractBasic {
    CalculationTypeBasic getCalculationType();

    MeasurementUnitBasic getMeasurementUnit();

    Double getValue();

    LocalDate getDateStart();

    LocalDate getDateEnd();
}
