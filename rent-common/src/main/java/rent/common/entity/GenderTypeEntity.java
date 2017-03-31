package rent.common.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Index;
import javax.persistence.Table;

/**
 * Пол
 */
@Entity
@Table(name = GenderTypeEntity.TABLE_NAME, indexes = {
        @Index(columnList = GenderTypeEntity.Columns.ID),
        @Index(columnList = GenderTypeEntity.Columns.NAME),
})
public class GenderTypeEntity extends AbstractEntity {
    public static final String TABLE_NAME = "const_gender_types";

    public interface Columns extends AbstractEntity.Columns {
        String NAME = "name";
        String NAME_ORIGIN = "name_origin";
    }

    @Column(name = Columns.NAME)
    private String name;

    /**
     * Предустановленное исходное название
     */
    @Column(name = Columns.NAME_ORIGIN)
    private String nameOrigin;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getNameOrigin() {
        return nameOrigin;
    }

    public void setNameOrigin(String nameOrigin) {
        this.nameOrigin = nameOrigin;
    }
}
