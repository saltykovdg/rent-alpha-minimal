package rent.common.entity;

import javax.persistence.*;

/**
 * Прикрепленный документ гражданина
 */
@Entity
@Table(name = CitizenDocumentAttachmentEntity.TABLE_NAME, indexes = {
        @Index(columnList = CitizenDocumentAttachmentEntity.Columns.ID),
        @Index(columnList = CitizenDocumentAttachmentEntity.Columns.NAME),
})
public class CitizenDocumentAttachmentEntity extends AbstractEntity {
    public static final String TABLE_NAME = "citizens_documents_attachments";

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
