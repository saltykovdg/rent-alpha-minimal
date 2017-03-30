package rent.common.entity;

import rent.common.enums.ParameterType;

import javax.persistence.*;
import java.time.LocalDate;
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
    private LocalDate dateOpen;

    /**
     * дата закрытия лс
     */
    @Column(name = Columns.DATE_CLOSE)
    private LocalDate dateClose;

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

    /**
     * приборы учета лс
     */
    @JoinColumn(name = Columns.ACCOUNT)
    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<AccountMeterEntity> meters;

    public String getAccountNumber() {
        return accountNumber;
    }

    public void setAccountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
    }

    public LocalDate getDateOpen() {
        return dateOpen;
    }

    public void setDateOpen(LocalDate dateOpen) {
        this.dateOpen = dateOpen;
    }

    public LocalDate getDateClose() {
        return dateClose;
    }

    public void setDateClose(LocalDate dateClose) {
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

    public List<AccountMeterEntity> getMeters() {
        return meters;
    }

    public void setMeters(List<AccountMeterEntity> meters) {
        this.meters = meters;
    }

    public List<AccountParameterEntity> getCurrentParameters() {
        return getParametersForPeriod(LocalDate.now());
    }

    public List<AccountParameterEntity> getParametersForPeriod(LocalDate period) {
        return (List<AccountParameterEntity>) getListForPeriod(period, this.parameters);
    }

    public List<AccountServiceEntity> getCurrentServices() {
        return getServicesForPeriod(LocalDate.now());
    }

    public List<AccountServiceEntity> getServicesForPeriod(LocalDate period) {
        return (List<AccountServiceEntity>) getListForPeriod(period, this.services);
    }

    public List<AccountOwnerEntity> getCurrentOwners() {
        return getOwnersForPeriod(LocalDate.now());
    }

    public List<AccountOwnerEntity> getOwnersForPeriod(LocalDate period) {
        return (List<AccountOwnerEntity>) getListForPeriod(period, this.owners);
    }

    public List<AccountRegisteredEntity> getCurrentRegistered() {
        return getRegisteredForPeriod(LocalDate.now());
    }

    public List<AccountRegisteredEntity> getRegisteredForPeriod(LocalDate period) {
        return (List<AccountRegisteredEntity>) getListForPeriod(period, this.registered);
    }

    public List<AccountMeterEntity> getCurrentMeters() {
        return getMetersForPeriod(LocalDate.now());
    }

    public List<AccountMeterEntity> getMetersForPeriod(LocalDate period) {
        return (List<AccountMeterEntity>) getListForPeriod(period, this.meters);
    }

    public Double getCurrentTotalArea() {
        Double totalArea = this.apartment.getTotalArea();
        List<AccountParameterEntity> parameters = getCurrentParameters();
        for (AccountParameterEntity parameter : parameters) {
            if (parameter.getParameterType().getCode().equals(ParameterType.TOTAL_AREA.getCode())) {
                try {
                    totalArea = Double.valueOf(parameter.getValue());
                    break;
                } catch (NumberFormatException e) {
                   // do nothing
                }
            }
        }
        return totalArea;
    }

    public String getCurrentPhoneNumbers() {
        StringBuilder phoneNumbers = new StringBuilder();
        List<AccountParameterEntity> parameters = getCurrentParameters();
        for (AccountParameterEntity parameter : parameters) {
            if (parameter.getParameterType().getCode().equals(ParameterType.PHONE_NUMBER.getCode())) {
                phoneNumbers.append(phoneNumbers.toString().equals("") ? "" : ";").append(parameter.getValue());
            }
        }
        return phoneNumbers.toString();
    }
}
