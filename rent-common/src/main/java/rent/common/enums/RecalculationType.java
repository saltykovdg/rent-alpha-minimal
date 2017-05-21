package rent.common.enums;

public enum RecalculationType {
    /**
     * Автоматический перерасчет
     */
    AUTO("01"),

    /**
     * Коррекционная сумма
     * Данные суммы может вводить только пользователь,
     * и они не будут удаляться при автоматических перерасчетах
     */
    CORRECTION_AMOUNT("02");

    private String code;

    RecalculationType(String code) {
        this.code = code;
    }

    public String getCode() {
        return code;
    }

    public static RecalculationType getByCode(String code) {
        for (RecalculationType parameterType : values()) {
            if (parameterType.code.equals(code)) {
                return parameterType;
            }
        }
        throw new IllegalArgumentException("No Enum for code: " + code);
    }
}
