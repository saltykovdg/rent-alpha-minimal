package rent.common.enums;

public enum MeterType {
    /**
     * Индивидуальный
     */
    INDIVIDUAL("01"),

    /**
     * Общедомовой
     */
    COMMON_HOUSE("02");

    private String code;

    MeterType(String code) {
        this.code = code;
    }

    public String getCode() {
        return code;
    }

    public static MeterType getByCode(String code) {
        for (MeterType meterType : values()) {
            if (meterType.code.equals(code)) {
                return meterType;
            }
        }
        throw new IllegalArgumentException("No Enum for code: " + code);
    }
}
