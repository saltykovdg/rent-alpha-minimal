package rent.common.projection;

import org.springframework.data.rest.core.config.Projection;
import rent.common.entity.CitizenEntity;

import java.time.LocalDate;

@Projection(types = {CitizenEntity.class})
public interface CitizenMinimal {
    String getId();

    GenderTypeMinimal getGenderType();

    String getFirstName();

    String getLastName();

    String getFatherName();

    LocalDate getBirthday();
}
