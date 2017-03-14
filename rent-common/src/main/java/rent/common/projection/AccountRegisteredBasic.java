package rent.common.projection;

import org.springframework.data.rest.core.config.Projection;
import rent.common.entity.AccountRegisteredEntity;

import java.util.Date;
import java.util.List;

@Projection(types = {AccountRegisteredEntity.class})
public interface AccountRegisteredBasic extends AbstractBasic {
    CitizenBasic getCitizen();

    RegistrationTypeBasic getRegistrationType();

    List<AccountRegisteredDocumentAttachmentBasic> getDocumentAttachments();

    Date getDateStart();

    Date getDateEnd();
}
