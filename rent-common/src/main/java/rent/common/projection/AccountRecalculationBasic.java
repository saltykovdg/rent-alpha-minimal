package rent.common.projection;

import org.springframework.data.rest.core.config.Projection;
import rent.common.entity.AccountRecalculationEntity;
import rent.common.entity.AccountServiceEntity;

import java.time.LocalDate;

@Projection(types = {AccountRecalculationEntity.class})
public interface AccountRecalculationBasic extends AbstractBasic {
    AccountServiceEntity getAccountService();

    LocalDate getPeriod();

    Double getValue();
}
