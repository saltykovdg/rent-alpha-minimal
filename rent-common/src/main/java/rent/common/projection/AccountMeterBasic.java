package rent.common.projection;

import org.springframework.data.rest.core.config.Projection;
import rent.common.entity.AccountMeterEntity;

import java.time.LocalDate;

@Projection(types = {AccountMeterEntity.class})
public interface AccountMeterBasic extends AbstractBasic {
    MeterBasic getMeter();

    LocalDate getDateStart();

    LocalDate getDateEnd();
}
