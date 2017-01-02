package rent.common.entity;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

/**
 * Собственник ЛС
 */
@Entity
@Table(name = OwnerEntity.TABLE_NAME, indexes = {
        @Index(columnList = OwnerEntity.Columns.ID)
})
public class OwnerEntity extends AbstractCitizenEntity {
    public static final String TABLE_NAME = "accounts_owners";
    public static final String TABLE_DOCUMENTS_ESTABLISHES_RIGHT = "documents_establishes_right";

    public interface Columns extends AbstractCitizenEntity.Columns {
        String ACCOUNT_OWNER = "account_owner_id";
        String DOCUMENT_ESTABLISHES_RIGHT_SERIES = "document_establishes_right_series";
        String DOCUMENT_ESTABLISHES_RIGHT_NUMBER = "document_establishes_right_number";
        String DOCUMENT_ESTABLISHES_RIGHT_ISSUING_AUTHORITY = "document_establishes_right_issuing_authority";
        String DOCUMENT_ESTABLISHES_RIGHT_DATE_ISSUE = "document_establishes_right_date_issue";
        String URL_LINK = "url_link";
        String DATE_START = "date_start";
        String DATE_END = "date_end";
    }

    /**
     * документ устанавливающий право - серия
     */
    @Column(name = Columns.DOCUMENT_ESTABLISHES_RIGHT_SERIES)
    private String documentEstablishesRightSeries;

    /**
     * документ устанавливающий право - номер
     */
    @Column(name = Columns.DOCUMENT_ESTABLISHES_RIGHT_NUMBER)
    private String documentEstablishesRightNumber;

    /**
     * документ устанавливающий право - кем выдан
     */
    @Column(name = Columns.DOCUMENT_ESTABLISHES_RIGHT_ISSUING_AUTHORITY)
    private String documentEstablishesRightIssuingAuthority;

    /**
     * документ устанавливающий право - дата выдачи
     */
    @Column(name = Columns.DOCUMENT_ESTABLISHES_RIGHT_DATE_ISSUE)
    private Date documentEstablishesRightDateIssue;

    /**
     * документ устанавливающий право - прикреплённые файлы
     */
    @ElementCollection
    @CollectionTable(name = TABLE_DOCUMENTS_ESTABLISHES_RIGHT, joinColumns = @JoinColumn(name = Columns.ACCOUNT_OWNER))
    @Column(name = Columns.URL_LINK)
    private Set<String> documentEstablishesRightAttachedFiles;

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

    public String getDocumentEstablishesRightSeries() {
        return documentEstablishesRightSeries;
    }

    public void setDocumentEstablishesRightSeries(String documentEstablishesRightSeries) {
        this.documentEstablishesRightSeries = documentEstablishesRightSeries;
    }

    public String getDocumentEstablishesRightNumber() {
        return documentEstablishesRightNumber;
    }

    public void setDocumentEstablishesRightNumber(String documentEstablishesRightNumber) {
        this.documentEstablishesRightNumber = documentEstablishesRightNumber;
    }

    public String getDocumentEstablishesRightIssuingAuthority() {
        return documentEstablishesRightIssuingAuthority;
    }

    public void setDocumentEstablishesRightIssuingAuthority(String documentEstablishesRightIssuingAuthority) {
        this.documentEstablishesRightIssuingAuthority = documentEstablishesRightIssuingAuthority;
    }

    public Date getDocumentEstablishesRightDateIssue() {
        return documentEstablishesRightDateIssue;
    }

    public void setDocumentEstablishesRightDateIssue(Date documentEstablishesRightDateIssue) {
        this.documentEstablishesRightDateIssue = documentEstablishesRightDateIssue;
    }

    public Set<String> getDocumentEstablishesRightAttachedFiles() {
        return documentEstablishesRightAttachedFiles;
    }

    public void setDocumentEstablishesRightAttachedFiles(Set<String> documentEstablishesRightAttachedFiles) {
        this.documentEstablishesRightAttachedFiles = documentEstablishesRightAttachedFiles;
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
