package rent.common.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Index;
import javax.persistence.Table;

/**
 * Единица измерения
 */
@Entity
@Table(name = MeasurementUnitEntity.TABLE_NAME, indexes = {@Index(columnList = MeasurementUnitEntity.Columns.NAME)})
public class MeasurementUnitEntity extends AbstractEntity {
    public static final String TABLE_NAME = "const_measurement_units";

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
