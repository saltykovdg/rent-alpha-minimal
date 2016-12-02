package rent.common.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Index;
import javax.persistence.Table;

/**
 * Материал строения
 */
@Entity
@Table(name = BuildingMaterialEntity.TABLE_NAME, indexes = {@Index(columnList = BuildingMaterialEntity.Columns.NAME)})
public class BuildingMaterialEntity extends AbstractEntity {
    public static final String TABLE_NAME = "address_buildings_materials";

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
