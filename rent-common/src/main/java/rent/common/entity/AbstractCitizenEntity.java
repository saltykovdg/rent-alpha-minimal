package rent.common.entity;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

/**
 * Абстрактная сущьность. Гражданин
 */
@MappedSuperclass
public abstract class AbstractCitizenEntity extends AbstractEntity {
    public static final String TABLE_DOCUMENTS_CITIZEN = "documents_citizen";

    public interface Columns extends AbstractEntity.Columns {
        String CITIZEN = "citizen_id";
        String FIRST_NAME = "first_name";
        String LAST_NAME = "last_name";
        String FATHER_NAME = "father_name";
        String BIRTHDAY = "birthday";
        String DOCUMENT_TYPE_CITIZEN = "document_type_citizen_id";
        String DOCUMENT_CITIZEN_SERIES = "document_citizen_series";
        String DOCUMENT_CITIZEN_NUMBER = "document_citizen_number";
        String DOCUMENT_CITIZEN_ISSUING_AUTHORITY = "document_citizen_issuing_authority";
        String DOCUMENT_CITIZEN_DATE_ISSUE = "document_citizen_date_issue";
        String URL_LINK = "url_link";
    }

    /**
     * имя
     */
    @Column(name = Columns.FIRST_NAME)
    private String firstName;

    /**
     * фамилия
     */
    @Column(name = Columns.LAST_NAME)
    private String lastName;

    /**
     * отчество
     */
    @Column(name = Columns.FATHER_NAME)
    private String fatherName;

    /**
     * дата рождения
     */
    @Column(name = Columns.BIRTHDAY)
    private Date birthday;

    /**
     * вид документа
     */
    @JoinColumn(name = Columns.DOCUMENT_TYPE_CITIZEN)
    @ManyToOne(fetch = FetchType.LAZY)
    private DocumentTypeEntity documentTypeCitizen;

    /**
     * документ серия
     */
    @Column(name = Columns.DOCUMENT_CITIZEN_SERIES)
    private String documentCitizenSeries;

    /**
     * документ номер
     */
    @Column(name = Columns.DOCUMENT_CITIZEN_NUMBER)
    private String documentCitizenNumber;

    /**
     * документ кем выдан
     */
    @Column(name = Columns.DOCUMENT_CITIZEN_ISSUING_AUTHORITY)
    private String documentCitizenIssuingAuthority;

    /**
     * документ дата выдачи
     */
    @Column(name = Columns.DOCUMENT_CITIZEN_DATE_ISSUE)
    private Date documentCitizenDateIssue;

    /**
     * документ устанавливающий право - прикреплённые файлы
     */
    @ElementCollection
    @CollectionTable(name = TABLE_DOCUMENTS_CITIZEN, joinColumns = @JoinColumn(name = Columns.CITIZEN))
    @Column(name = Columns.URL_LINK)
    private Set<String> documentCitizenAttachedFiles;

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getFatherName() {
        return fatherName;
    }

    public void setFatherName(String fatherName) {
        this.fatherName = fatherName;
    }

    public Date getBirthday() {
        return birthday;
    }

    public void setBirthday(Date birthday) {
        this.birthday = birthday;
    }

    public DocumentTypeEntity getDocumentTypeCitizen() {
        return documentTypeCitizen;
    }

    public void setDocumentTypeCitizen(DocumentTypeEntity documentTypeCitizen) {
        this.documentTypeCitizen = documentTypeCitizen;
    }

    public String getDocumentCitizenSeries() {
        return documentCitizenSeries;
    }

    public void setDocumentCitizenSeries(String documentCitizenSeries) {
        this.documentCitizenSeries = documentCitizenSeries;
    }

    public String getDocumentCitizenNumber() {
        return documentCitizenNumber;
    }

    public void setDocumentCitizenNumber(String documentCitizenNumber) {
        this.documentCitizenNumber = documentCitizenNumber;
    }

    public String getDocumentCitizenIssuingAuthority() {
        return documentCitizenIssuingAuthority;
    }

    public void setDocumentCitizenIssuingAuthority(String documentCitizenIssuingAuthority) {
        this.documentCitizenIssuingAuthority = documentCitizenIssuingAuthority;
    }

    public Date getDocumentCitizenDateIssue() {
        return documentCitizenDateIssue;
    }

    public void setDocumentCitizenDateIssue(Date documentCitizenDateIssue) {
        this.documentCitizenDateIssue = documentCitizenDateIssue;
    }

    public Set<String> getDocumentCitizenAttachedFiles() {
        return documentCitizenAttachedFiles;
    }

    public void setDocumentCitizenAttachedFiles(Set<String> documentCitizenAttachedFiles) {
        this.documentCitizenAttachedFiles = documentCitizenAttachedFiles;
    }
}
