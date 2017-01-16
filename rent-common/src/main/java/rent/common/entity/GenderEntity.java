package rent.common.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Index;
import javax.persistence.Table;

/**
 * Пол
 */
@Entity
@Table(name = GenderEntity.TABLE_NAME, indexes = {
        @Index(columnList = GenderEntity.Columns.ID),
        @Index(columnList = GenderEntity.Columns.NAME)
})
public class GenderEntity extends AbstractEntity {
    public static final String TABLE_NAME = "const_genders";

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
