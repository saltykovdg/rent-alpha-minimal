package rent.common.enums;

public enum RoleType {
    /**
     * Администратор
     */
    ADMIN("ROLE_ADMIN"),

    /**
     * Пользователь
     */
    USER("ROLE_USER");

    private String name;

    RoleType(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public static RoleType getByName(String name) {
        for (RoleType roleType : values()) {
            if (roleType.name.equals(name)) {
                return roleType;
            }
        }
        throw new IllegalArgumentException("No Enum for name: " + name);
    }
}
