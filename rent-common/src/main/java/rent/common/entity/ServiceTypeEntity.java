package rent.common.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Index;
import javax.persistence.Table;

/**
 * Тип услуги
 */
@Entity
@Table(name = ServiceTypeEntity.TABLE_NAME, indexes = {
        @Index(columnList = ServiceTypeEntity.Columns.ID),
        @Index(columnList = ServiceTypeEntity.Columns.NAME),
})
public class ServiceTypeEntity extends AbstractEntity {
    public static final String TABLE_NAME = "services_types";

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
