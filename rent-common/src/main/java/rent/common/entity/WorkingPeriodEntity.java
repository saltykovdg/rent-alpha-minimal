package rent.common.entity;

import javax.persistence.*;
import java.time.LocalDate;

/**
 * Рабочий период
 */
@Entity
@Table(name = WorkingPeriodEntity.TABLE_NAME, indexes = {
        @Index(columnList = WorkingPeriodEntity.Columns.ID),
        @Index(columnList = WorkingPeriodEntity.Columns.NAME),
        @Index(columnList = WorkingPeriodEntity.Columns.DATE_START),
        @Index(columnList = WorkingPeriodEntity.Columns.DATE_END),
})
public class WorkingPeriodEntity extends AbstractEntity {
    public static final String TABLE_NAME = "const_working_periods";

    public interface Columns extends AbstractEntity.Columns {
        String NAME = "name";
        String DATE_START = "date_start";
        String DATE_END = "date_end";
    }

    /**
     * название
     */
    @Column(name = Columns.NAME)
    private String name;

    /**
     * дата начала
     */
    @Column(name = Columns.DATE_START)
    private LocalDate dateStart;

    /**
     * дата окончания
     */
    @Column(name = Columns.DATE_END)
    private LocalDate dateEnd;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDate getDateStart() {
        return dateStart;
    }

    public void setDateStart(LocalDate dateStart) {
        this.dateStart = dateStart;
    }

    public LocalDate getDateEnd() {
        return dateEnd;
    }

    public void setDateEnd(LocalDate dateEnd) {
        this.dateEnd = dateEnd;
    }
}
