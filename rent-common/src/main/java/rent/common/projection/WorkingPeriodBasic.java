package rent.common.projection;

import org.springframework.data.rest.core.config.Projection;
import rent.common.entity.WorkingPeriodEntity;

import java.time.LocalDate;

@Projection(types = {WorkingPeriodEntity.class})
public interface WorkingPeriodBasic extends AbstractBasic {
    String getName();

    LocalDate getDateStart();

    LocalDate getDateEnd();
}
