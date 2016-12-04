package rent.common.entity;

import javax.persistence.*;

/**
 * Улица
 */
@Entity
@Table(name = StreetEntity.TABLE_NAME, indexes = {
        @Index(columnList = StreetEntity.Columns.ID),
        @Index(columnList = StreetEntity.Columns.NAME),
        @Index(columnList = StreetEntity.Columns.STREET_TYPE)
})
public class StreetEntity extends AbstractEntity {
    public static final String TABLE_NAME = "address_streets";

    public interface Columns extends AbstractEntity.Columns {
        String NAME = "name";
        String STREET_TYPE = "street_type_id";
    }

    @Column(name = Columns.NAME)
    private String name;

    @JoinColumn(name = Columns.STREET_TYPE)
    @ManyToOne(fetch = FetchType.LAZY)
    private StreetTypeEntity streetType;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public StreetTypeEntity getStreetType() {
        return streetType;
    }

    public void setStreetType(StreetTypeEntity streetType) {
        this.streetType = streetType;
    }
}
