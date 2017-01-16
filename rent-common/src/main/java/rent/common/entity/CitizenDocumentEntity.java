package rent.common.entity;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

/**
 * Документ гражданина
 */
@Entity
@Table(name = CitizenDocumentEntity.TABLE_NAME, indexes = {
        @Index(columnList = CitizenDocumentEntity.Columns.ID),
        @Index(columnList = CitizenDocumentEntity.Columns.DOCUMENT_TYPE),
        @Index(columnList = CitizenDocumentEntity.Columns.DOCUMENT_SERIES),
        @Index(columnList = CitizenDocumentEntity.Columns.DOCUMENT_NUMBER),
        @Index(columnList = CitizenDocumentEntity.Columns.DOCUMENT_ISSUING_AUTHORITY),
        @Index(columnList = CitizenDocumentEntity.Columns.DOCUMENT_DATE_ISSUE)
})
public class CitizenDocumentEntity extends AbstractEntity {
    public static final String TABLE_NAME = "citizens_documents";

    public interface Columns extends AbstractEntity.Columns {
        String CITIZEN_DOCUMENT = "citizen_document_id";
        String DOCUMENT_TYPE = "document_type_id";
        String DOCUMENT_SERIES = "document_series";
        String DOCUMENT_NUMBER = "document_number";
        String DOCUMENT_ISSUING_AUTHORITY = "document_issuing_authority";
        String DOCUMENT_DATE_ISSUE = "document_date_issue";
        String DATE_START = "date_start";
        String DATE_END = "date_end";
    }

    /**
     * вид документа
     */
    @JoinColumn(name = Columns.DOCUMENT_TYPE)
    @ManyToOne(fetch = FetchType.LAZY)
    private DocumentTypeEntity documentType;

    /**
     * документ серия
     */
    @Column(name = Columns.DOCUMENT_SERIES)
    private String documentSeries;

    /**
     * документ номер
     */
    @Column(name = Columns.DOCUMENT_NUMBER)
    private String documentNumber;

    /**
     * документ кем выдан
     */
    @Column(name = Columns.DOCUMENT_ISSUING_AUTHORITY)
    private String documentIssuingAuthority;

    /**
     * документ дата выдачи
     */
    @Column(name = Columns.DOCUMENT_DATE_ISSUE)
    private Date documentDateIssue;

    /**
     * прикреплённые документы
     */
    @JoinColumn(name = Columns.CITIZEN_DOCUMENT)
    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CitizenDocumentAttachmentEntity> documentAttachments;

    /**
     * дата начала
     */
    @Column(name = Columns.DATE_START)
    private Date dateStart;

    /**
     * дата окончания
     */
    @Column(name = Columns.DATE_END)
    private Date dateEnd;

    public DocumentTypeEntity getDocumentType() {
        return documentType;
    }

    public void setDocumentType(DocumentTypeEntity documentType) {
        this.documentType = documentType;
    }

    public String getDocumentSeries() {
        return documentSeries;
    }

    public void setDocumentSeries(String documentSeries) {
        this.documentSeries = documentSeries;
    }

    public String getDocumentNumber() {
        return documentNumber;
    }

    public void setDocumentNumber(String documentNumber) {
        this.documentNumber = documentNumber;
    }

    public String getDocumentIssuingAuthority() {
        return documentIssuingAuthority;
    }

    public void setDocumentIssuingAuthority(String documentIssuingAuthority) {
        this.documentIssuingAuthority = documentIssuingAuthority;
    }

    public Date getDocumentDateIssue() {
        return documentDateIssue;
    }

    public void setDocumentDateIssue(Date documentDateIssue) {
        this.documentDateIssue = documentDateIssue;
    }

    public List<CitizenDocumentAttachmentEntity> getDocumentAttachments() {
        return documentAttachments;
    }

    public void setDocumentAttachments(List<CitizenDocumentAttachmentEntity> documentAttachments) {
        this.documentAttachments = documentAttachments;
    }

    public Date getDateStart() {
        return dateStart;
    }

    public void setDateStart(Date dateStart) {
        this.dateStart = dateStart;
    }

    public Date getDateEnd() {
        return dateEnd;
    }

    public void setDateEnd(Date dateEnd) {
        this.dateEnd = dateEnd;
    }
}
