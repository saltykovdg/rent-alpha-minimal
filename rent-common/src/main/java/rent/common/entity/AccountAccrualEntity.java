package rent.common.entity;

import javax.persistence.*;
import java.util.Date;

/**
 * Начисление ЛС
 */
@Entity
@Table(name = AccountAccrualEntity.TABLE_NAME, indexes = {
        @Index(columnList = AccountAccrualEntity.Columns.ID),
        @Index(columnList = AccountAccrualEntity.Columns.ACCOUNT_SERVICE),
        @Index(columnList = AccountAccrualEntity.Columns.PERIOD),
})
public class AccountAccrualEntity extends AbstractEntity {
    public static final String TABLE_NAME = "accounts_accruals";

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
    private Date period;

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

    public Date getPeriod() {
        return period;
    }

    public void setPeriod(Date period) {
        this.period = period;
    }

    public Double getValue() {
        return value;
    }

    public void setValue(Double value) {
        this.value = value;
    }
}
