package rent.common.enums;

public enum SystemPropertyType {
    /**
     * Признак выполнения расчета квартплаты
     */
    CALCULATION_IS_ACTIVE("calculation_is_active"),

    /**
     * Кол-во лицевых попавшие в расчет квартплаты
     */
    CALCULATION_ACCOUNTS_COUNT("calculation_accounts_count"),

    /**
     * Кол-во лицевых для которых расчет квартплаты выполнен
     */
    CALCULATION_ACCOUNTS_CALCULATED("calculation_accounts_calculated");

    private String name;

    SystemPropertyType(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public static SystemPropertyType getByName(String name) {
        for (SystemPropertyType systemPropertyType : values()) {
            if (systemPropertyType.name.equals(name)) {
                return systemPropertyType;
            }
        }
        throw new IllegalArgumentException("No Enum for name: " + name);
    }
}
