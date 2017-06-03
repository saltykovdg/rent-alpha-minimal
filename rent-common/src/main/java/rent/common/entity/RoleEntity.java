package rent.common.entity;

import javax.persistence.*;

/**
 * Роль
 */
@Entity
@Table(name = RoleEntity.TABLE_NAME, indexes = {
        @Index(columnList = RoleEntity.Columns.ID),
        @Index(columnList = RoleEntity.Columns.NAME),
})
public class RoleEntity extends AbstractEntity {
    public static final String TABLE_NAME = "security_roles";

    public interface Columns extends AbstractEntity.Columns {
        String NAME = "name";
        String DESCRIPTION = "description";
    }

    @Column(name = Columns.NAME)
    private String name;

    @Column(name = Columns.DESCRIPTION)
    private String description;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
