package rent.common.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.GenericGenerator;
import rent.common.interfaces.UseDateStartDateEnd;
import rent.common.utils.DateUtils;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Абстрактная сущьность от которой наследуются все остальные сущьности
 */
@MappedSuperclass
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public abstract class AbstractEntity {
    public interface Columns {
        String ID = "id";
        String CREATION_DATE = "creation_date";
        String LAST_MODIFIED_DATE = "last_modified_date";
        String VERSION = "version";
    }

    /**
     * Generator UUID IETF RFC 4122
     */
    @Id
    @GeneratedValue(generator = "generator-uuid")
    @GenericGenerator(name = "generator-uuid", strategy = "uuid2")
    @Column(name = Columns.ID)
    private String id;

    @Column(name = Columns.CREATION_DATE)
    private Date creationDate;

    @Column(name = Columns.LAST_MODIFIED_DATE)
    private Date lastModifiedDate;

    @Column(name = Columns.VERSION)
    private Long version;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Date getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
    }

    public Date getLastModifiedDate() {
        return lastModifiedDate;
    }

    public void setLastModifiedDate(Date lastModifiedDate) {
        this.lastModifiedDate = lastModifiedDate;
    }

    public Long getVersion() {
        return version;
    }

    public void setVersion(Long version) {
        this.version = version;
    }

    @PrePersist
    void onCreate() {
        this.setCreationDate(new Date(System.currentTimeMillis()));
        this.setVersion(0L);
    }

    @PreUpdate
    void onPersist() {
        this.setLastModifiedDate(new Date(System.currentTimeMillis()));
        this.setVersion(this.getVersion() + 1);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        AbstractEntity that = (AbstractEntity) o;
        return id.equals(that.id);
    }

    @Override
    public int hashCode() {
        return id.hashCode();
    }

    protected List<? extends UseDateStartDateEnd> getListForPeriod(Date period, List<? extends UseDateStartDateEnd> list) {
        List<UseDateStartDateEnd> newList = new ArrayList<>();
        for (UseDateStartDateEnd obj : list) {
            Date dateStart = DateUtils.setMinTime(obj.getDateStart());
            Date dateEnd = DateUtils.setMaxTime(obj.getDateEnd());
            if (dateStart.getTime() <= period.getTime() && (dateEnd == null || dateEnd.getTime() >= period.getTime())) {
                newList.add(obj);
            }
        }
        return newList;
    }
}
