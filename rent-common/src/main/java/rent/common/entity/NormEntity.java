package rent.common.entity;

import javax.persistence.*;
import java.util.List;

/**
 * Норматив
 */
@Entity
@Table(name = NormEntity.TABLE_NAME, indexes = {
        @Index(columnList = NormEntity.Columns.ID),
        @Index(columnList = NormEntity.Columns.NAME),
        @Index(columnList = NormEntity.Columns.SERVICE)
})
public class NormEntity extends AbstractEntity {
    public static final String TABLE_NAME = "norms";

    public interface Columns extends AbstractEntity.Columns {
        String NAME = "name";
        String SERVICE = "service_id";
        String NORM = "norm_id";
    }

    /**
     * название норматива
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
     * значения норматива
     */
    @JoinColumn(name = Columns.NORM)
    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<NormValueEntity> values;

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

    public List<NormValueEntity> getValues() {
        return values;
    }

    public void setValues(List<NormValueEntity> values) {
        this.values = values;
    }
}
