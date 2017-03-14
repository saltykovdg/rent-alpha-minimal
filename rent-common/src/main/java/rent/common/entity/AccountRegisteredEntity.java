package rent.common.entity;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

/**
 * Прописанный ЛС
 */
@Entity
@Table(name = AccountRegisteredEntity.TABLE_NAME, indexes = {
        @Index(columnList = AccountRegisteredEntity.Columns.ID),
        @Index(columnList = AccountRegisteredEntity.Columns.REGISTRATION_TYPE),
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
    private Date dateStart;

    /**
     * дата окончания
     */
    @Column(name = Columns.DATE_END)
    private Date dateEnd;

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
