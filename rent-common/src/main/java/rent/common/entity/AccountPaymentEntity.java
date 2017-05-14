package rent.common.entity;

import javax.persistence.*;
import java.time.LocalDate;

/**
 * Оплата ЛС
 */
@Entity
@Table(name = AccountPaymentEntity.TABLE_NAME, indexes = {
        @Index(columnList = AccountPaymentEntity.Columns.ID),
        @Index(columnList = AccountPaymentEntity.Columns.ACCOUNT_SERVICE),
        @Index(columnList = AccountPaymentEntity.Columns.WORKING_PERIOD),
})
public class AccountPaymentEntity extends AbstractEntity {
    public static final String TABLE_NAME = "accounts_payments";

    public interface Columns extends AbstractEntity.Columns {
        String ACCOUNT_SERVICE = "account_service_id";
        String WORKING_PERIOD = "working_period_id";
        String DATE = "date";
        String VALUE = "value";
        String BUNDLE_ID = "bundle_id";
    }

    /**
     * услуга лс
     */
    @JoinColumn(name = Columns.ACCOUNT_SERVICE)
    @ManyToOne(fetch = FetchType.LAZY)
    private AccountServiceEntity accountService;

    /**
     * рабочий период
     */
    @JoinColumn(name = Columns.WORKING_PERIOD)
    @ManyToOne(fetch = FetchType.LAZY)
    private WorkingPeriodEntity workingPeriod;

    /**
     * дата оплаты
     */
    @Column(name = Columns.DATE)
    private LocalDate date;

    /**
     * Идентификатор пачки
     */
    @Column(name = Columns.BUNDLE_ID)
    private String bundleId;

    /**
     * сумма
     */
    @Column(name = Columns.VALUE)
    private Double value;

    public AccountServiceEntity getAccountService() {
        return accountService;
    }

    public void setAccountService(AccountServiceEntity accountService) {
        this.accountService = accountService;
    }

    public WorkingPeriodEntity getWorkingPeriod() {
        return workingPeriod;
    }

    public void setWorkingPeriod(WorkingPeriodEntity workingPeriod) {
        this.workingPeriod = workingPeriod;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getBundleId() {
        return bundleId;
    }

    public void setBundleId(String bundleId) {
        this.bundleId = bundleId;
    }

    public Double getValue() {
        return value;
    }

    public void setValue(Double value) {
        this.value = value;
    }
}
