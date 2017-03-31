package rent.common.entity;

import javax.persistence.*;

/**
 * Тип контрагента
 */
@Entity
@Table(name = ContractorTypeEntity.TABLE_NAME, indexes = {
        @Index(columnList = ContractorTypeEntity.Columns.ID),
        @Index(columnList = ContractorTypeEntity.Columns.NAME),
})
public class ContractorTypeEntity extends AbstractEntity {
    public static final String TABLE_NAME = "organization_contractors_types";

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
