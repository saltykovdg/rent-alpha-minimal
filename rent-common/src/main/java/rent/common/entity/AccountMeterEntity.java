package rent.common.entity;

import javax.persistence.*;
import java.util.Date;

/**
 * Счетчик (прибор учета) ЛС
 */
@Entity
@Table(name = AccountMeterEntity.TABLE_NAME, indexes = {
        @Index(columnList = AccountMeterEntity.Columns.ID),
        @Index(columnList = AccountMeterEntity.Columns.METER),
})
public class AccountMeterEntity extends AbstractEntity {
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
    private Date dateStart;

    /**
     * дата окончания
     */
    @Column(name = Columns.DATE_END)
    private Date dateEnd;

    public MeterEntity getMeter() {
        return meter;
    }

    public void setMeter(MeterEntity meter) {
        this.meter = meter;
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
