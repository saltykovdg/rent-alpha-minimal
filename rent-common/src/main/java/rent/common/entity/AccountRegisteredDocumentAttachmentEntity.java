package rent.common.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Index;
import javax.persistence.Table;

/**
 * Прикрепленный документ прописанного
 */
@Entity
@Table(name = AccountRegisteredDocumentAttachmentEntity.TABLE_NAME, indexes = {
        @Index(columnList = AccountRegisteredDocumentAttachmentEntity.Columns.ID),
        @Index(columnList = AccountRegisteredDocumentAttachmentEntity.Columns.NAME),
})
public class AccountRegisteredDocumentAttachmentEntity extends AbstractEntity {
    public static final String TABLE_NAME = "accounts_registered_documents_attachments";

    public interface Columns extends AbstractEntity.Columns {
        String NAME = "name";
        String URL_LINK = "url_link";
    }

    @Column(name = Columns.NAME)
    private String name;

    @Column(name = Columns.URL_LINK)
    private String urlLink;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUrlLink() {
        return urlLink;
    }

    public void setUrlLink(String urlLink) {
        this.urlLink = urlLink;
    }
}
