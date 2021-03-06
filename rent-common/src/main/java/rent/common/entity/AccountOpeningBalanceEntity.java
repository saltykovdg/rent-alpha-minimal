package rent.common.entity;

import javax.persistence.*;

/**
 * Сальдо на начало периода (входящее сальдо) ЛС
 */
@Entity
@Table(name = AccountOpeningBalanceEntity.TABLE_NAME, indexes = {
        @Index(columnList = AccountOpeningBalanceEntity.Columns.ID),
        @Index(columnList = AccountOpeningBalanceEntity.Columns.ACCOUNT_SERVICE),
        @Index(columnList = AccountOpeningBalanceEntity.Columns.WORKING_PERIOD),
})
public class AccountOpeningBalanceEntity extends AbstractEntity {
    public static final String TABLE_NAME = "accounts_opening_balances";

    public interface Columns extends AbstractEntity.Columns {
        String ACCOUNT_SERVICE = "account_service_id";
        String WORKING_PERIOD = "working_period_id";
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

    public Double getValue() {
        return value;
    }

    public void setValue(Double value) {
        this.value = value;
    }
}
