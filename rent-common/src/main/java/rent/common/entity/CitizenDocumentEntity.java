package rent.common.entity;

import rent.common.interfaces.IPeriod;

import javax.persistence.*;
import java.time.LocalDate;
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
        @Index(columnList = CitizenDocumentEntity.Columns.DOCUMENT_DATE_ISSUE),
        @Index(columnList = CitizenDocumentEntity.Columns.DATE_START),
        @Index(columnList = CitizenDocumentEntity.Columns.DATE_END),
})
public class CitizenDocumentEntity extends AbstractEntity implements IPeriod {
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
    private LocalDate documentDateIssue;

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
    private LocalDate dateStart;

    /**
     * дата окончания
     */
    @Column(name = Columns.DATE_END)
    private LocalDate dateEnd;

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

    public LocalDate getDocumentDateIssue() {
        return documentDateIssue;
    }

    public void setDocumentDateIssue(LocalDate documentDateIssue) {
        this.documentDateIssue = documentDateIssue;
    }

    public List<CitizenDocumentAttachmentEntity> getDocumentAttachments() {
        return documentAttachments;
    }

    public void setDocumentAttachments(List<CitizenDocumentAttachmentEntity> documentAttachments) {
        this.documentAttachments = documentAttachments;
    }

    public LocalDate getDateStart() {
        return dateStart;
    }

    public void setDateStart(LocalDate dateStart) {
        this.dateStart = dateStart;
    }

    public LocalDate getDateEnd() {
        return dateEnd;
    }

    public void setDateEnd(LocalDate dateEnd) {
        this.dateEnd = dateEnd;
    }
}
