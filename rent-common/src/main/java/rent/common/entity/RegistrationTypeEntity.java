package rent.common.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Index;
import javax.persistence.Table;

/**
 * Вид прописки
 */
@Entity
@Table(name = RegistrationTypeEntity.TABLE_NAME, indexes = {
        @Index(columnList = RegistrationTypeEntity.Columns.ID),
        @Index(columnList = RegistrationTypeEntity.Columns.NAME)
})
public class RegistrationTypeEntity extends AbstractEntity {
    public static final String TABLE_NAME = "const_registration_types";

    public interface Columns extends AbstractEntity.Columns {
        String NAME = "name";
    }

    @Column(name = Columns.NAME)
    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
