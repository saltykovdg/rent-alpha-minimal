package rent.common.projection;

import org.springframework.data.rest.core.config.Projection;
import rent.common.entity.CitizenEntity;

import java.util.Date;
import java.util.List;

@Projection(types = {CitizenEntity.class})
public interface CitizenBasic extends AbstractBasic {
    GenderBasic getGender();

    String getFirstName();

    String getLastName();

    String getFatherName();

    Date getBirthday();

    List<CitizenDocumentBasic> getDocuments();
}
