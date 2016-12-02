package rent.common.entity;

import javax.persistence.*;

/**
 * Район
 */
@Entity
@Table(name = DistrictEntity.TABLE_NAME, indexes = {@Index(columnList = DistrictEntity.Columns.NAME)})
public class DistrictEntity extends AbstractEntity {
    public static final String TABLE_NAME = "address_districts";

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