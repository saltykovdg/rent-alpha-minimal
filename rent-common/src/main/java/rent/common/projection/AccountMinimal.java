package rent.common.projection;

import org.springframework.data.rest.core.config.Projection;
import rent.common.entity.AccountEntity;

import java.time.LocalDate;
import java.util.List;

@Projection(types = {AccountEntity.class})
public interface AccountMinimal {
    String getId();

    String getAccountNumber();

    LocalDate getDateOpen();

    LocalDate getDateClose();

    ContractorMinimal getContractor();

    ApartmentMinimalForAccount getApartment();

    List<AccountParameterMinimal> getParameters();

    List<AccountOwnerMinimal> getOwners();

    List<AccountRegisteredMinimal> getRegistered();
}
