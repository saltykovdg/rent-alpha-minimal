package rent.common.projection;

import org.springframework.data.rest.core.config.Projection;
import rent.common.entity.CitizenEntity;

import java.time.LocalDate;
import java.util.List;

@Projection(types = {CitizenEntity.class})
public interface CitizenBasic extends AbstractBasic {
    GenderTypeBasic getGenderType();

    String getFirstName();

    String getLastName();

    String getFatherName();

    LocalDate getBirthday();

    List<CitizenDocumentBasic> getDocuments();
}
