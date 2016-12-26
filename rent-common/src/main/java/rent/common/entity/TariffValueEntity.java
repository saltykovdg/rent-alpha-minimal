package rent.common.entity;

import javax.persistence.*;
import java.util.Date;

/**
 * Значение тарифа
 */
@Entity
@Table(name = TariffValueEntity.TABLE_NAME, indexes = {
        @Index(columnList = TariffValueEntity.Columns.ID),
        @Index(columnList = TariffValueEntity.Columns.CALCULATION_TYPE),
        @Index(columnList = TariffValueEntity.Columns.MEASUREMENT_UNIT),
        @Index(columnList = TariffValueEntity.Columns.DATE_START),
        @Index(columnList = TariffValueEntity.Columns.DATE_END)
})
public class TariffValueEntity extends AbstractEntity {
    public static final String TABLE_NAME = "tariffs_values";

    public interface Columns extends AbstractEntity.Columns {
        String CALCULATION_TYPE = "calculation_type_id";
        String MEASUREMENT_UNIT = "measurement_unit_id";
        String VALUE = "value";
        String DATE_START = "date_start";
        String DATE_END = "date_end";
    }

    /**
     * вид расчета
     */
    @JoinColumn(name = Columns.CALCULATION_TYPE)
    @ManyToOne(fetch = FetchType.LAZY)
    private CalculationTypeEntity calculationType;

    /**
     * единица измерения
     */
    @JoinColumn(name = Columns.MEASUREMENT_UNIT)
    @ManyToOne(fetch = FetchType.LAZY)
    private MeasurementUnitEntity measurementUnit;

    @Column(name = Columns.VALUE)
    private Double value;

    /**
     * дата начала
     */
    @Column(name = Columns.DATE_START)
    private Date dateStart;

    /**
     * дата окончания
     */
    @Column(name = Columns.DATE_END)
    private Date dateEnd;

    public CalculationTypeEntity getCalculationType() {
        return calculationType;
    }

    public void setCalculationType(CalculationTypeEntity calculationType) {
        this.calculationType = calculationType;
    }

    public MeasurementUnitEntity getMeasurementUnit() {
        return measurementUnit;
    }

    public void setMeasurementUnit(MeasurementUnitEntity measurementUnit) {
        this.measurementUnit = measurementUnit;
    }

    public Double getValue() {
        return value;
    }

    public void setValue(Double value) {
        this.value = value;
    }

    public Date getDateStart() {
        return dateStart;
    }

    public void setDateStart(Date dateStart) {
        this.dateStart = dateStart;
    }

    public Date getDateEnd() {
        return dateEnd;
    }

    public void setDateEnd(Date dateEnd) {
        this.dateEnd = dateEnd;
    }
}
