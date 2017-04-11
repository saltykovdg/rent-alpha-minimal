package rent.common.entity;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

/**
 * Прописанный ЛС
 */
@Entity
@Table(name = AccountRegisteredEntity.TABLE_NAME, indexes = {
        @Index(columnList = AccountRegisteredEntity.Columns.ID),
        @Index(columnList = AccountRegisteredEntity.Columns.CITIZEN),
        @Index(columnList = AccountRegisteredEntity.Columns.REGISTRATION_TYPE),
        @Index(columnList = AccountRegisteredEntity.Columns.DATE_START),
        @Index(columnList = AccountRegisteredEntity.Columns.DATE_END),
})
public class AccountRegisteredEntity extends AbstractEntity {
    public static final String TABLE_NAME = "accounts_registered";

    public interface Columns extends AbstractEntity.Columns {
        String CITIZEN = "citizen_id";
        String ACCOUNT_REGISTERED = "account_registered_id";
        String REGISTRATION_TYPE = "registration_type_id";
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
     * вид прописки
     */
    @JoinColumn(name = Columns.REGISTRATION_TYPE)
    @ManyToOne(fetch = FetchType.LAZY)
    private RegistrationTypeEntity registrationType;

    /**
     * прикреплённые документы
     */
    @JoinColumn(name = Columns.ACCOUNT_REGISTERED)
    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<AccountRegisteredDocumentAttachmentEntity> documentAttachments;

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

    public RegistrationTypeEntity getRegistrationType() {
        return registrationType;
    }

    public void setRegistrationType(RegistrationTypeEntity registrationType) {
        this.registrationType = registrationType;
    }

    public List<AccountRegisteredDocumentAttachmentEntity> getDocumentAttachments() {
        return documentAttachments;
    }

    public void setDocumentAttachments(List<AccountRegisteredDocumentAttachmentEntity> documentAttachments) {
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
