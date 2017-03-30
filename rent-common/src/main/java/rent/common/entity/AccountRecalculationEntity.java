package rent.common.entity;

import javax.persistence.*;
import java.time.LocalDate;

/**
 * Перерасчет ЛС
 */
@Entity
@Table(name = AccountRecalculationEntity.TABLE_NAME, indexes = {
        @Index(columnList = AccountRecalculationEntity.Columns.ID),
        @Index(columnList = AccountRecalculationEntity.Columns.ACCOUNT_SERVICE),
        @Index(columnList = AccountRecalculationEntity.Columns.PERIOD),
})
public class AccountRecalculationEntity extends AbstractEntity {
    public static final String TABLE_NAME = "accounts_recalculations";

    public interface Columns extends AbstractEntity.Columns {
        String ACCOUNT_SERVICE = "account_service_id";
        String PERIOD = "period";
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
     * период
     */
    @Column(name = Columns.PERIOD)
    private LocalDate period;

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

    public LocalDate getPeriod() {
        return period;
    }

    public void setPeriod(LocalDate period) {
        this.period = period;
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
