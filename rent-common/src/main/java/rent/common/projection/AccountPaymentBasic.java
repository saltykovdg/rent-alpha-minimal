package rent.common.projection;

import org.springframework.data.rest.core.config.Projection;
import rent.common.entity.AccountPaymentEntity;
import rent.common.entity.AccountServiceEntity;

import java.time.LocalDate;

@Projection(types = {AccountPaymentEntity.class})
public interface AccountPaymentBasic extends AbstractBasic {
    AccountServiceEntity getAccountService();

    LocalDate getPeriod();

    Double getValue();
}
