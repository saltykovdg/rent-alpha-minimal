package rent.common.projection;

import org.springframework.data.rest.core.config.Projection;
import rent.common.entity.AccountRegisteredEntity;

import java.time.LocalDate;

@Projection(types = {AccountRegisteredEntity.class})
public interface AccountRegisteredMinimal {
    CitizenMinimalForAccount getCitizen();

    LocalDate getDateStart();

    LocalDate getDateEnd();
}
