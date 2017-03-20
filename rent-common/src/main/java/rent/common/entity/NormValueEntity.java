package rent.common.entity;

import javax.persistence.*;
import java.util.Date;

/**
 * Значение норматива
 */
@Entity
@Table(name = NormValueEntity.TABLE_NAME, indexes = {
        @Index(columnList = NormValueEntity.Columns.ID),
        @Index(columnList = TariffValueEntity.Columns.MEASUREMENT_UNIT),
        @Index(columnList = NormValueEntity.Columns.DATE_START),
        @Index(columnList = NormValueEntity.Columns.DATE_END)
})
public class NormValueEntity extends AbstractEntity {
    public static final String TABLE_NAME = "norms_values";

    public interface Columns extends AbstractEntity.Columns {
        String VALUE = "value";
        String MEASUREMENT_UNIT = "measurement_unit_id";
        String DATE_START = "date_start";
        String DATE_END = "date_end";
    }

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