package rent.common.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Index;
import javax.persistence.Table;

/**
 * Виды параметров
 */
@Entity
@Table(name = ParameterTypeEntity.TABLE_NAME, indexes = {
        @Index(columnList = ParameterTypeEntity.Columns.ID),
        @Index(columnList = ParameterTypeEntity.Columns.CODE),
        @Index(columnList = ParameterTypeEntity.Columns.NAME)
})
public class ParameterTypeEntity extends AbstractEntity {
    public static final String TABLE_NAME = "const_parameter_types";

    public interface Columns extends AbstractEntity.Columns {
        String CODE = "code";
        String NAME = "name";
        String NAME_ORIGIN = "name_origin";
    }

    /**
     * код параметра
     */
    @Column(name = Columns.CODE)
    private String code;

    /**
     * имя параметра
     */
    @Column(name = Columns.NAME)
    private String name;

    /**
     * Предустановленное исходное название
     */
    @Column(name = Columns.NAME_ORIGIN)
    private String nameOrigin;

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

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
