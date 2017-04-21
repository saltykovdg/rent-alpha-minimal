package rent.common.entity;

import javax.persistence.*;

/**
 * Перерасчет ЛС
 */
@Entity
@Table(name = AccountRecalculationEntity.TABLE_NAME, indexes = {
        @Index(columnList = AccountRecalculationEntity.Columns.ID),
        @Index(columnList = AccountRecalculationEntity.Columns.ACCOUNT_SERVICE),
        @Index(columnList = AccountRecalculationEntity.Columns.WORKING_PERIOD),
        @Index(columnList = AccountRecalculationEntity.Columns.FOR_WORKING_PERIOD),
})
public class AccountRecalculationEntity extends AbstractEntity {
    public static final String TABLE_NAME = "accounts_recalculations";

    public interface Columns extends AbstractEntity.Columns {
        String ACCOUNT_SERVICE = "account_service_id";
        String WORKING_PERIOD = "working_period_id";
        String FOR_WORKING_PERIOD = "for_working_period_id";
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
     * рабочий период за который выполнялся перерасчет
     */
    @JoinColumn(name = Columns.FOR_WORKING_PERIOD)
    @ManyToOne(fetch = FetchType.LAZY)
    private WorkingPeriodEntity forWorkingPeriod;

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

    public WorkingPeriodEntity getForWorkingPeriod() {
        return forWorkingPeriod;
    }

    public void setForWorkingPeriod(WorkingPeriodEntity forWorkingPeriod) {
        this.forWorkingPeriod = forWorkingPeriod;
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
