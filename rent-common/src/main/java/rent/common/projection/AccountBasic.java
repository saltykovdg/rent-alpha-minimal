package rent.common.projection;

import org.springframework.data.rest.core.config.Projection;
import rent.common.entity.AccountEntity;

import java.time.LocalDate;
import java.util.List;

@Projection(types = {AccountEntity.class})
public interface AccountBasic extends AbstractBasic {
    String getAccountNumber();

    LocalDate getDateOpen();

    LocalDate getDateClose();

    ContractorBasic getContractor();

    ApartmentBasic getApartment();

    List<AccountParameterBasic> getParameters();

    List<AccountServiceBasic> getServices();

    List<AccountOwnerBasic> getOwners();

    List<AccountRegisteredBasic> getRegistered();

    List<AccountMeterBasic> getMeters();
}
