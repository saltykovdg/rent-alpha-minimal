package rent.common.projection;

import org.springframework.data.rest.core.config.Projection;
import rent.common.entity.AccountMeterEntity;

import java.util.Date;

@Projection(types = {AccountMeterEntity.class})
public interface AccountMeterBasic extends AbstractBasic {
    MeterBasic getMeter();

    Date getDateStart();

    Date getDateEnd();
}
