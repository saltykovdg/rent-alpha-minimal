package rent.common.entity;

import javax.persistence.*;

/**
 * Тип благоустроенности строения
 */
@Entity
@Table(name = BuildingTypeLivabilityEntity.TABLE_NAME, indexes = {@Index(columnList = BuildingTypeLivabilityEntity.Columns.NAME)})
public class BuildingTypeLivabilityEntity extends AbstractEntity {
    public static final String TABLE_NAME = "address_buildings_types_livability";

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