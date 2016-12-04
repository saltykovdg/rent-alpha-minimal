package rent.common.enums;

public enum ParameterType {
    /**
     * Общая площадь
     */
    TOTAL_AREA("01");

    private String code;

    ParameterType(String code) {
        this.code = code;
    }

    public String getCode() {
        return code;
    }

    public static ParameterType getByCode(String code) {
        for (ParameterType parameterType : values()) {
            if (parameterType.code.equals(code)) {
                return parameterType;
            }
        }
        throw new IllegalArgumentException("No Enum for code " + code);
    }
}
