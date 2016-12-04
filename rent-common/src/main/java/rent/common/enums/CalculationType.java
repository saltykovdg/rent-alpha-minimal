package rent.common.enums;

public enum CalculationType {
    /**
     * По общей площади
     */
    TOTAL_AREA("01"),

    /**
     * По прописанным
     */
    PEOPLES("02"),

    /**
     * По показаниям счетчика
     */
    METER_READING("03");

    private String code;

    CalculationType(String code) {
        this.code = code;
    }

    public String getCode() {
        return code;
    }

    public static CalculationType getByCode(String code) {
        for (CalculationType calculationType : values()) {
            if (calculationType.code.equals(code)) {
                return calculationType;
            }
        }
        throw new IllegalArgumentException("No Enum for code " + code);
    }
}
