package rent.common.entity;

import javax.persistence.*;

/**
 * Начисление ЛС
 */
@Entity
@Table(name = AccountAccrualEntity.TABLE_NAME, indexes = {
        @Index(columnList = AccountAccrualEntity.Columns.ID),
        @Index(columnList = AccountAccrualEntity.Columns.ACCOUNT_SERVICE),
        @Index(columnList = AccountAccrualEntity.Columns.WORKING_PERIOD),
})
public class AccountAccrualEntity extends AbstractEntity {
    public static final String TABLE_NAME = "accounts_accruals";

    public interface Columns extends AbstractEntity.Columns {
        String ACCOUNT_SERVICE = "account_service_id";
        String WORKING_PERIOD = "working_period_id";
        String CONSUMPTION = "consumption";
        String VALUE = "value";
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
     * расход
     */
    @Column(name = Columns.CONSUMPTION)
    private Double consumption;

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

    public Double getConsumption() {
        return consumption;
    }

    public void setConsumption(Double consumption) {
        this.consumption = consumption;
    }

    public Double getValue() {
        return value;
    }

    public void setValue(Double value) {
        this.value = value;
    }
}
