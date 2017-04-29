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
        String TARIFF = "tariff_id";
        String TARIFF_VALUE = "tariff_value";
        String TARIFF_CALCULATION_TYPE = "tariff_calculation_type_id";
        String TARIFF_MEASUREMENT_UNIT = "tariff_measurement_unit_id";
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
}
