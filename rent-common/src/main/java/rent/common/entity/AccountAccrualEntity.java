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
        String TARIFF = "tariff_id";
        String TARIFF_VALUE = "tariff_value";
        String TARIFF_CALCULATION_TYPE = "tariff_calculation_type_id";
        String TARIFF_MEASUREMENT_UNIT = "tariff_measurement_unit_id";
        String ACCOUNT_SERVICE_DAYS_ACTIVE = "account_service_days_active";
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

    /**
     * тариф
     */
    @JoinColumn(name = Columns.TARIFF)
    @ManyToOne(fetch = FetchType.LAZY)
    private TariffEntity tariff;

    /**
     * тариф - вид расчета
     */
    @JoinColumn(name = Columns.TARIFF_CALCULATION_TYPE)
    @ManyToOne(fetch = FetchType.LAZY)
    private CalculationTypeEntity tariffCalculationType;

    /**
     * тариф - единица измерения
     */
    @JoinColumn(name = Columns.TARIFF_MEASUREMENT_UNIT)
    @ManyToOne(fetch = FetchType.LAZY)
    private MeasurementUnitEntity tariffMeasurementUnit;

    /**
     * тариф - значение
     */
    @Column(name = Columns.TARIFF_VALUE)
    private Double tariffValue;

    /**
     * количество дней действия услуги в рабочем периоде
     */
    @Column(name = Columns.ACCOUNT_SERVICE_DAYS_ACTIVE)
    private Integer accountServiceDaysActive;

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

    public TariffEntity getTariff() {
        return tariff;
    }

    public void setTariff(TariffEntity tariff) {
        this.tariff = tariff;
    }

    public CalculationTypeEntity getTariffCalculationType() {
        return tariffCalculationType;
    }

    public void setTariffCalculationType(CalculationTypeEntity tariffCalculationType) {
        this.tariffCalculationType = tariffCalculationType;
    }

    public MeasurementUnitEntity getTariffMeasurementUnit() {
        return tariffMeasurementUnit;
    }

    public void setTariffMeasurementUnit(MeasurementUnitEntity tariffMeasurementUnit) {
        this.tariffMeasurementUnit = tariffMeasurementUnit;
    }

    public Double getTariffValue() {
        return tariffValue;
    }

    public void setTariffValue(Double tariffValue) {
        this.tariffValue = tariffValue;
    }

    public Integer getAccountServiceDaysActive() {
        return accountServiceDaysActive;
    }

    public void setAccountServiceDaysActive(Integer accountServiceDaysActive) {
        this.accountServiceDaysActive = accountServiceDaysActive;
    }
}
