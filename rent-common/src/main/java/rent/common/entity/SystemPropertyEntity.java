package rent.common.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Index;
import javax.persistence.Table;

/**
 * Системное свойство
 */
@Entity
@Table(name = SystemPropertyEntity.TABLE_NAME, indexes = {
        @Index(columnList = SystemPropertyEntity.Columns.ID),
        @Index(columnList = SystemPropertyEntity.Columns.NAME),
        @Index(columnList = SystemPropertyEntity.Columns.VALUE),
})
public class SystemPropertyEntity extends AbstractEntity {
    public static final String TABLE_NAME = "system_properties";

    public interface Columns extends AbstractEntity.Columns {
        String NAME = "name";
        String VALUE = "value";
    }

    @Column(name = Columns.NAME)
    private String name;

    @Column(name = Columns.VALUE)
    private String value;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }
}
