package rent.common.projection;

import org.springframework.data.rest.core.config.Projection;
import rent.common.entity.AccountOwnerEntity;

import java.time.LocalDate;

@Projection(types = {AccountOwnerEntity.class})
public interface AccountOwnerMinimal {
    CitizenMinimal getCitizen();

    LocalDate getDateStart();

    LocalDate getDateEnd();
}
