package rent.common.entity;

import javax.persistence.*;

/**
 * Услуга
 */
@Entity
@Table(name = ServiceEntity.TABLE_NAME, indexes = {
        @Index(columnList = ServiceEntity.Columns.NAME),
        @Index(columnList = ServiceEntity.Columns.SERVICE_TYPE)
})
public class ServiceEntity extends AbstractEntity {
    public static final String TABLE_NAME = "services";

    public interface Columns extends AbstractEntity.Columns {
        String NAME = "name";
        String SERVICE_TYPE = "service_type_id";
    }

    /**
     * Тип услуги
     */
    @JoinColumn(name = Columns.SERVICE_TYPE)
    @ManyToOne(fetch = FetchType.LAZY)
    private ServiceTypeEntity serviceType;

    /**
     * Услуга
     */
    @Column(name = StreetEntity.Columns.NAME)
    private String name;

    public ServiceTypeEntity getServiceType() {
        return serviceType;
    }

    public void setServiceType(ServiceTypeEntity serviceType) {
        this.serviceType = serviceType;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
