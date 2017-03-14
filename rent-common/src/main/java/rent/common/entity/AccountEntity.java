package rent.common.entity;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

/**
 * Лицевой счет
 */
@Entity
@Table(name = AccountEntity.TABLE_NAME, indexes = {
        @Index(columnList = AccountEntity.Columns.ID),
        @Index(columnList = AccountEntity.Columns.ACCOUNT_NUMBER),
        @Index(columnList = AccountEntity.Columns.DATE_OPEN),
        @Index(columnList = AccountEntity.Columns.DATE_CLOSE),
        @Index(columnList = AccountEntity.Columns.CONTRACTOR),
        @Index(columnList = AccountEntity.Columns.APARTMENT)
})
public class AccountEntity extends AbstractEntity {
    public static final String TABLE_NAME = "accounts";

    public interface Columns extends AbstractEntity.Columns {
        String ACCOUNT_NUMBER = "account_number";
        String DATE_OPEN = "date_open";
        String DATE_CLOSE = "date_close";
        String CONTRACTOR = "contractor_id";
        String APARTMENT = "apartment_id";
        String ACCOUNT = "account_id";
    }

    /**
     * номер лс
     */
    @Column(name = Columns.ACCOUNT_NUMBER)
    private String accountNumber;

    /**
     * дата открытия лс
     */
    @Column(name = Columns.DATE_OPEN)
    private Date dateOpen;

    /**
     * дата закрытия лс
     */
    @Column(name = Columns.DATE_CLOSE)
    private Date dateClose;

    /**
     * управляющая компания
     */
    @JoinColumn(name = Columns.CONTRACTOR)
    @ManyToOne(fetch = FetchType.LAZY)
    private ContractorEntity contractor;

    /**
     * квартира
     */
    @JoinColumn(name = Columns.APARTMENT)
    @ManyToOne(fetch = FetchType.LAZY)
    private ApartmentEntity apartment;

    /**
     * параметры лс
     */
    @JoinColumn(name = Columns.ACCOUNT)
    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<AccountParameterEntity> parameters;

    /**
     * услуги лс
     */
    @JoinColumn(name = Columns.ACCOUNT)
    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<AccountServiceEntity> services;

    /**
     * собственники лс
     */
    @JoinColumn(name = Columns.ACCOUNT)
    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<AccountOwnerEntity> owners;

    /**
     * прописанные лс
     */
    @JoinColumn(name = Columns.ACCOUNT)
    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<AccountRegisteredEntity> registered;

    public String getAccountNumber() {
        return accountNumber;
    }

    public void setAccountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
    }

    public Date getDateOpen() {
        return dateOpen;
    }

    public void setDateOpen(Date dateOpen) {
        this.dateOpen = dateOpen;
    }

    public Date getDateClose() {
        return dateClose;
    }

    public void setDateClose(Date dateClose) {
        this.dateClose = dateClose;
    }

    public ContractorEntity getContractor() {
        return contractor;
    }

    public void setContractor(ContractorEntity contractor) {
        this.contractor = contractor;
    }

    public ApartmentEntity getApartment() {
        return apartment;
    }

    public void setApartment(ApartmentEntity apartment) {
        this.apartment = apartment;
    }

    public List<AccountParameterEntity> getParameters() {
        return parameters;
    }

    public void setParameters(List<AccountParameterEntity> parameters) {
        this.parameters = parameters;
    }

    public List<AccountServiceEntity> getServices() {
        return services;
    }

    public void setServices(List<AccountServiceEntity> services) {
        this.services = services;
    }

    public List<AccountOwnerEntity> getOwners() {
        return owners;
    }

    public void setOwners(List<AccountOwnerEntity> owners) {
        this.owners = owners;
    }

    public List<AccountRegisteredEntity> getRegistered() {
        return registered;
    }

    public void setRegistered(List<AccountRegisteredEntity> registered) {
        this.registered = registered;
    }
}
