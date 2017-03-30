package rent.common.entity;

import javax.persistence.*;
import java.util.List;

/**
 * Прибор учета
 */
@Entity
@Table(name = MeterEntity.TABLE_NAME, indexes = {
        @Index(columnList = MeterEntity.Columns.ID),
        @Index(columnList = MeterEntity.Columns.METER_TYPE),
        @Index(columnList = MeterEntity.Columns.SERVICE),
        @Index(columnList = MeterEntity.Columns.NAME),
        @Index(columnList = MeterEntity.Columns.SERIAL_NUMBER)
})
public class MeterEntity extends AbstractEntity {
    public static final String TABLE_NAME = "meters";

    public interface Columns extends AbstractEntity.Columns {
        String METER_TYPE = "meter_type_id";
        String SERVICE = "service_id";
        String METER = "meter_id";
        String NAME = "name";
        String SERIAL_NUMBER = "serial_number";
    }

    /**
     * вид прибора учета
     */
    @JoinColumn(name = Columns.METER_TYPE)
    @ManyToOne(fetch = FetchType.LAZY)
    private MeterTypeEntity meterType;

    /**
     * услуга
     */
    @JoinColumn(name = Columns.SERVICE)
    @ManyToOne(fetch = FetchType.LAZY)
    private ServiceEntity service;

    /**
     * название
     */
    @Column(name = Columns.NAME)
    private String name;

    /**
     * серийный номер
     */
    @Column(name = Columns.SERIAL_NUMBER)
    private String serialNumber;

    /**
     * показания счетчика
     */
    @JoinColumn(name = Columns.METER)
    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<MeterValueEntity> values;

    public MeterTypeEntity getMeterType() {
        return meterType;
    }

    public void setMeterType(MeterTypeEntity meterType) {
        this.meterType = meterType;
    }

    public ServiceEntity getService() {
        return service;
    }

    public void setService(ServiceEntity service) {
        this.service = service;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSerialNumber() {
        return serialNumber;
    }

    public void setSerialNumber(String serialNumber) {
        this.serialNumber = serialNumber;
    }

    public List<MeterValueEntity> getValues() {
        return values;
    }

    public void setValues(List<MeterValueEntity> values) {
        this.values = values;
    }
}
