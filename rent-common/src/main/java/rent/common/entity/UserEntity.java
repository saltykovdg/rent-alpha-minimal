package rent.common.entity;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.util.StringUtils;

/**
 * Пользователь
 */
@Entity
@Table(name = UserEntity.TABLE_NAME, indexes = {
        @Index(columnList = UserEntity.Columns.ID),
        @Index(columnList = UserEntity.Columns.LOGIN),
        @Index(columnList = UserEntity.Columns.ROLE)
})
public class UserEntity extends AbstractEntity {
    public static final String TABLE_NAME = "security_users";

    public interface Columns extends AbstractEntity.Columns {
        String LOGIN = "login";
        String PASSWORD = "password";
        String FIRST_NAME = "first_name";
        String LAST_NAME = "last_name";
        String FATHER_NAME = "father_name";
        String EMAIL = "email";
        String BLOCKED = "blocked";
        String ONLINE = "online";
        String ROLE = "role_id";
    }

    //логин
    @Column(name = Columns.LOGIN)
    private String login;

    //пароль
    @JsonIgnore
    @Column(name = Columns.PASSWORD)
    private String password;

    //имя
    @Column(name = Columns.FIRST_NAME)
    private String firstName;

    //фамилия
    @Column(name = Columns.LAST_NAME)
    private String lastName;

    //отчество
    @Column(name = Columns.FATHER_NAME)
    private String fatherName;

    //электронная почта
    @Column(name = Columns.EMAIL)
    private String email;

    //заблокирован
    @Column(name = Columns.BLOCKED)
    private Boolean blocked;

    //статус онлайн
    @Column(name = Columns.ONLINE)
    private Boolean online;

    //роль пользователя
    @JoinColumn(name = Columns.ROLE)
    @ManyToOne(fetch = FetchType.LAZY)
    private RoleEntity role;

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Boolean getBlocked() {
        return blocked;
    }

    public void setBlocked(Boolean blocked) {
        this.blocked = blocked;
    }

    public Boolean getOnline() {
        return online;
    }

    public void setOnline(Boolean online) {
        this.online = online;
    }

    public RoleEntity getRole() {
        return role;
    }

    public void setRole(RoleEntity role) {
        this.role = role;
    }

    public String getFullName() {
        String fullName = (!StringUtils.isEmpty(lastName) ? lastName : "") + (!StringUtils.isEmpty(firstName) ? (" " + firstName) : "") + (!StringUtils.isEmpty(fatherName) ? (" " + fatherName) : "");
        return fullName.trim();
    }
}
