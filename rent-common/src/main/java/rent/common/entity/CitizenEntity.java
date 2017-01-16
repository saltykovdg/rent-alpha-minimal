package rent.common.entity;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

/**
 * Гражданин
 */
@Entity
@Table(name = CitizenEntity.TABLE_NAME, indexes = {
        @Index(columnList = CitizenEntity.Columns.ID),
        @Index(columnList = CitizenEntity.Columns.GENDER_TYPE),
        @Index(columnList = CitizenEntity.Columns.FIRST_NAME),
        @Index(columnList = CitizenEntity.Columns.LAST_NAME),
        @Index(columnList = CitizenEntity.Columns.FATHER_NAME)
})
public class CitizenEntity extends AbstractEntity {
    public static final String TABLE_NAME = "citizens";

    public interface Columns extends AbstractEntity.Columns {
        String CITIZEN = "citizen_id";
        String GENDER_TYPE = "gender_type_id";
        String FIRST_NAME = "first_name";
        String LAST_NAME = "last_name";
        String FATHER_NAME = "father_name";
        String BIRTHDAY = "birthday";
    }

    /**
     * пол
     */
    @JoinColumn(name = Columns.GENDER_TYPE)
    @ManyToOne(fetch = FetchType.LAZY)
    private GenderTypeEntity genderType;

    /**
     * имя
     */
    @Column(name = Columns.FIRST_NAME)
    private String firstName;

    /**
     * фамилия
     */
    @Column(name = Columns.LAST_NAME)
    private String lastName;

    /**
     * отчество
     */
    @Column(name = Columns.FATHER_NAME)
    private String fatherName;

    /**
     * дата рождения
     */
    @Column(name = Columns.BIRTHDAY)
    private Date birthday;

    /**
     * документы
     */
    @JoinColumn(name = Columns.CITIZEN)
    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CitizenDocumentEntity> documents;

    public GenderTypeEntity getGenderType() {
        return genderType;
    }

    public void setGenderType(GenderTypeEntity genderType) {
        this.genderType = genderType;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getFatherName() {
        return fatherName;
    }

    public void setFatherName(String fatherName) {
        this.fatherName = fatherName;
    }

    public Date getBirthday() {
        return birthday;
    }

    public void setBirthday(Date birthday) {
        this.birthday = birthday;
    }

    public List<CitizenDocumentEntity> getDocuments() {
        return documents;
    }

    public void setDocuments(List<CitizenDocumentEntity> documents) {
        this.documents = documents;
    }
}
