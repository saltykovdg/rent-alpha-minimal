package rent.common.entity;

import rent.common.interfaces.IPeriod;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

/**
 * Собственник ЛС
 */
@Entity
@Table(name = AccountOwnerEntity.TABLE_NAME, indexes = {
        @Index(columnList = AccountOwnerEntity.Columns.ID),
        @Index(columnList = AccountOwnerEntity.Columns.DOCUMENT_TYPE),
        @Index(columnList = AccountOwnerEntity.Columns.DOCUMENT_SERIES),
        @Index(columnList = AccountOwnerEntity.Columns.DOCUMENT_NUMBER),
        @Index(columnList = AccountOwnerEntity.Columns.DOCUMENT_ISSUING_AUTHORITY),
        @Index(columnList = AccountOwnerEntity.Columns.DOCUMENT_DATE_ISSUE),
        @Index(columnList = AccountOwnerEntity.Columns.DATE_START),
        @Index(columnList = AccountOwnerEntity.Columns.DATE_END),
})
public class AccountOwnerEntity extends AbstractEntity implements IPeriod {
    public static final String TABLE_NAME = "accounts_owners";

    public interface Columns extends AbstractEntity.Columns {
        String CITIZEN = "citizen_id";
        String ACCOUNT_OWNER = "account_owner_id";
        String DOCUMENT_TYPE = "document_type_id";
        String DOCUMENT_SERIES = "document_series";
        String DOCUMENT_NUMBER = "document_number";
        String DOCUMENT_ISSUING_AUTHORITY = "document_issuing_authority";
        String DOCUMENT_DATE_ISSUE = "document_date_issue";
        String DATE_START = "date_start";
        String DATE_END = "date_end";
    }

    /**
     * гражданин
     */
    @JoinColumn(name = Columns.CITIZEN)
    @ManyToOne(fetch = FetchType.LAZY)
    private CitizenEntity citizen;

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
    @JoinColumn(name = Columns.ACCOUNT_OWNER)
    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<AccountOwnerDocumentAttachmentEntity> documentAttachments;

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

    public CitizenEntity getCitizen() {
        return citizen;
    }

    public void setCitizen(CitizenEntity citizen) {
        this.citizen = citizen;
    }

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

    public List<AccountOwnerDocumentAttachmentEntity> getDocumentAttachments() {
        return documentAttachments;
    }

    public void setDocumentAttachments(List<AccountOwnerDocumentAttachmentEntity> documentAttachments) {
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
