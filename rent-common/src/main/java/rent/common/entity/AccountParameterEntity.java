package rent.common.entity;

import rent.common.interfaces.UseDateStartDateEnd;

import javax.persistence.*;
import java.time.LocalDate;

/**
 * Параметр лицевого счета
 */
@Entity
@Table(name = AccountParameterEntity.TABLE_NAME, indexes = {
        @Index(columnList = AccountParameterEntity.Columns.ID),
        @Index(columnList = AccountParameterEntity.Columns.PARAMETER_TYPE),
        @Index(columnList = AccountParameterEntity.Columns.DATE_START),
        @Index(columnList = AccountParameterEntity.Columns.DATE_END)
})
public class AccountParameterEntity extends AbstractEntity implements UseDateStartDateEnd {
    public static final String TABLE_NAME = "accounts_parameters";

    public interface Columns extends AbstractEntity.Columns {
        String PARAMETER_TYPE = "parameter_type_id";
        String VALUE = "value";
        String DATE_START = "date_start";
        String DATE_END = "date_end";
    }

    /**
     * Вид параметра
     */
    @JoinColumn(name = Columns.PARAMETER_TYPE)
    @ManyToOne(fetch = FetchType.LAZY)
    private ParameterTypeEntity parameterType;

    @Column(name = Columns.VALUE)
    private String value;

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

    public ParameterTypeEntity getParameterType() {
        return parameterType;
    }

    public void setParameterType(ParameterTypeEntity parameterType) {
        this.parameterType = parameterType;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
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
