package rent.common.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Index;
import javax.persistence.Table;

/**
 * Вид документа
 */
@Entity
@Table(name = DocumentTypeEntity.TABLE_NAME, indexes = {
        @Index(columnList = DocumentTypeEntity.Columns.ID),
        @Index(columnList = DocumentTypeEntity.Columns.NAME)
})
public class DocumentTypeEntity extends AbstractEntity {
    public static final String TABLE_NAME = "const_document_types";

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
