package rent.common.entity;

import javax.persistence.*;
import java.util.Date;

/**
 * Значение тарифа
 */
@Entity
@Table(name = TariffValueEntity.TABLE_NAME, indexes = {
        @Index(columnList = TariffValueEntity.Columns.ID),
        @Index(columnList = TariffValueEntity.Columns.DATE_START),
        @Index(columnList = TariffValueEntity.Columns.DATE_END)
})
public class TariffValueEntity extends AbstractEntity {
    public static final String TABLE_NAME = "tariffs_values";

    public interface Columns extends AbstractEntity.Columns {
        String VALUE = "value";
        String DATE_START = "date_start";
        String DATE_END = "date_end";
    }

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
