package rent.common.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Index;
import javax.persistence.Table;

/**
 * Тип улицы
 */
@Entity
@Table(name = StreetTypeEntity.TABLE_NAME, indexes = {
        @Index(columnList = StreetTypeEntity.Columns.ID),
        @Index(columnList = StreetTypeEntity.Columns.NAME)
})
public class StreetTypeEntity extends AbstractEntity  {
    public static final String TABLE_NAME = "address_streets_types";

    public interface Columns extends AbstractEntity.Columns {
        String NAME = "name";
        String NAME_SHORT = "name_short";
    }

    @Column(name = Columns.NAME)
    private String name;

    @Column(name = Columns.NAME_SHORT)
    private String nameShort;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getNameShort() {
        return nameShort;
    }

    public void setNameShort(String nameShort) {
        this.nameShort = nameShort;
    }
}
