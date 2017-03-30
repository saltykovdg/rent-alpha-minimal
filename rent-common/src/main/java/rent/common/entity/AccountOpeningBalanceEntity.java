package rent.common.entity;

import javax.persistence.*;
import java.time.LocalDate;

/**
 * Сальдо на начало периода (входящее сальдо) ЛС
 */
@Entity
@Table(name = AccountOpeningBalanceEntity.TABLE_NAME, indexes = {
        @Index(columnList = AccountOpeningBalanceEntity.Columns.ID),
        @Index(columnList = AccountOpeningBalanceEntity.Columns.ACCOUNT_SERVICE),
        @Index(columnList = AccountOpeningBalanceEntity.Columns.PERIOD),
})
public class AccountOpeningBalanceEntity extends AbstractEntity {
    public static final String TABLE_NAME = "accounts_opening_balances";

    public interface Columns extends AbstractEntity.Columns {
        String ACCOUNT_SERVICE = "account_service_id";
        String PERIOD = "period";
        String VALUE = "value";
    }

    /**
     * услуга лс
     */
    @JoinColumn(name = Columns.ACCOUNT_SERVICE)
    @ManyToOne(fetch = FetchType.LAZY)
    private AccountServiceEntity accountService;

    /**
     * период
     */
    @Column(name = Columns.PERIOD)
    private LocalDate period;

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

    public LocalDate getPeriod() {
        return period;
    }

    public void setPeriod(LocalDate period) {
        this.period = period;
    }

    public Double getValue() {
        return value;
    }

    public void setValue(Double value) {
        this.value = value;
    }
}
