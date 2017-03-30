package rent.common.projection;

import org.springframework.data.rest.core.config.Projection;
import rent.common.entity.AccountServiceEntity;

import java.time.LocalDate;

@Projection(types = {AccountServiceEntity.class})
public interface AccountServiceBasic extends AbstractBasic {
    ServiceBasic getService();

    LocalDate getDateStart();

    LocalDate getDateEnd();

    TariffBasic getTariff();
}
