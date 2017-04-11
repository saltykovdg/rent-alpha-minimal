package rent.common.entity;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

/**
 * Тариф
 */
@Entity
@Table(name = TariffEntity.TABLE_NAME, indexes = {
        @Index(columnList = TariffEntity.Columns.ID),
        @Index(columnList = TariffEntity.Columns.NAME),
        @Index(columnList = TariffEntity.Columns.SERVICE),
})
public class TariffEntity extends AbstractEntity {
    public static final String TABLE_NAME = "tariffs";

    public interface Columns extends AbstractEntity.Columns {
        String NAME = "name";
        String SERVICE = "service_id";
        String TARIFF = "tariff_id";
    }

    /**
     * название тарифа
     */
    @Column(name = Columns.NAME)
    private String name;

    /**
     * услуга
     */
    @JoinColumn(name = Columns.SERVICE)
    @ManyToOne(fetch = FetchType.LAZY)
    private ServiceEntity service;

    /**
     * значения тарифа
     */
    @JoinColumn(name = Columns.TARIFF)
    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TariffValueEntity> values;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public ServiceEntity getService() {
        return service;
    }

    public void setService(ServiceEntity service) {
        this.service = service;
    }

    public List<TariffValueEntity> getValues() {
        return values;
    }

    public void setValues(List<TariffValueEntity> values) {
        this.values = values;
    }
}
