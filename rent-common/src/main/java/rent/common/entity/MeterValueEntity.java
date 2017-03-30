package rent.common.entity;

import javax.persistence.*;
import java.time.LocalDate;

/**
 * Показание счетчика
 */
@Entity
@Table(name = MeterValueEntity.TABLE_NAME, indexes = {
        @Index(columnList = MeterValueEntity.Columns.ID),
        @Index(columnList = MeterValueEntity.Columns.DATE_VALUE),
})
public class MeterValueEntity extends AbstractEntity {
    public static final String TABLE_NAME = "meters_values";

    public interface Columns extends AbstractEntity.Columns {
        String VALUE = "value";
        String CONSUMPTION = "consumption";
        String DATE_VALUE = "date_value";
    }

    /**
     * показание
     */
    @Column(name = Columns.VALUE)
    private Double value;

    /**
     * расход
     */
    @Column(name = Columns.CONSUMPTION)
    private Double consumption;

    /**
     * дата снятия показания
     */
    @Column(name = Columns.DATE_VALUE)
    private LocalDate dateValue;

    public Double getValue() {
        return value;
    }

    public void setValue(Double value) {
        this.value = value;
    }

    public Double getConsumption() {
        return consumption;
    }

    public void setConsumption(Double consumption) {
        this.consumption = consumption;
    }

    public LocalDate getDateValue() {
        return dateValue;
    }

    public void setDateValue(LocalDate dateValue) {
        this.dateValue = dateValue;
    }
}
