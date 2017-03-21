package rent.common.projection;

import org.springframework.data.rest.core.config.Projection;
import rent.common.entity.AccountEntity;

import java.util.Date;
import java.util.List;

@Projection(types = {AccountEntity.class})
public interface AccountBasic extends AbstractBasic {
    String getAccountNumber();

    Date getDateOpen();

    Date getDateClose();

    ContractorBasic getContractor();

    ApartmentBasic getApartment();

    List<AccountParameterBasic> getParameters();

    List<AccountServiceBasic> getServices();

    List<AccountOwnerBasic> getOwners();

    List<AccountRegisteredBasic> getRegistered();

    List<AccountMeterBasic> getMeters();
}
