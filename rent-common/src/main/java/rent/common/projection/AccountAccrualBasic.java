package rent.common.projection;

import org.springframework.data.rest.core.config.Projection;
import rent.common.entity.AccountAccrualEntity;
import rent.common.entity.AccountServiceEntity;

import java.time.LocalDate;

@Projection(types = {AccountAccrualEntity.class})
public interface AccountAccrualBasic extends AbstractBasic {
    AccountServiceEntity getAccountService();

    LocalDate getPeriod();

    Double getValue();
}
