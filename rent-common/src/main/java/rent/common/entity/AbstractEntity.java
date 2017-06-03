package rent.common.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.time.LocalDateTime;

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
    private LocalDateTime creationDate;

    @Column(name = Columns.LAST_MODIFIED_DATE)
    private LocalDateTime lastModifiedDate;

    @Column(name = Columns.VERSION)
    private Long version;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public LocalDateTime getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(LocalDateTime creationDate) {
        this.creationDate = creationDate;
    }

    public LocalDateTime getLastModifiedDate() {
        return lastModifiedDate;
    }

    public void setLastModifiedDate(LocalDateTime lastModifiedDate) {
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
        this.setCreationDate(LocalDateTime.now());
        this.setVersion(0L);
    }

    @PreUpdate
    void onPersist() {
        this.setLastModifiedDate(LocalDateTime.now());
        Long version = this.getVersion();
        if (version == null) version = 0L;
        this.setVersion(version + 1);
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
}
