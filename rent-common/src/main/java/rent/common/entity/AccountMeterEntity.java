package rent.common.entity;

import rent.common.interfaces.IPeriod;

import javax.persistence.*;
import java.time.LocalDate;

/**
 * Счетчик (прибор учета) ЛС
 */
@Entity
@Table(name = AccountMeterEntity.TABLE_NAME, indexes = {
        @Index(columnList = AccountMeterEntity.Columns.ID),
        @Index(columnList = AccountMeterEntity.Columns.METER),
        @Index(columnList = AccountMeterEntity.Columns.DATE_START),
        @Index(columnList = AccountMeterEntity.Columns.DATE_END),
})
public class AccountMeterEntity extends AbstractEntity implements IPeriod {
    public static final String TABLE_NAME = "accounts_meters";

    public interface Columns extends AbstractEntity.Columns {
        String METER = "meter_id";
        String DATE_START = "date_start";
        String DATE_END = "date_end";
    }

    /**
     * счетчик
     */
    @JoinColumn(name = Columns.METER)
    @ManyToOne(fetch = FetchType.LAZY)
    private MeterEntity meter;

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

    public MeterEntity getMeter() {
        return meter;
    }

    public void setMeter(MeterEntity meter) {
        this.meter = meter;
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
