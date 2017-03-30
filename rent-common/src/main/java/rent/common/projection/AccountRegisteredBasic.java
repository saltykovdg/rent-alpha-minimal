package rent.common.projection;

import org.springframework.data.rest.core.config.Projection;
import rent.common.entity.AccountRegisteredEntity;

import java.time.LocalDate;
import java.util.List;

@Projection(types = {AccountRegisteredEntity.class})
public interface AccountRegisteredBasic extends AbstractBasic {
    CitizenBasic getCitizen();

    RegistrationTypeBasic getRegistrationType();

    List<AccountRegisteredDocumentAttachmentBasic> getDocumentAttachments();

    LocalDate getDateStart();

    LocalDate getDateEnd();
}
