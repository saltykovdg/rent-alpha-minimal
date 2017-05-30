package rent.api.utils;

public interface Constants {
    String PRODUCES_TEXT_HTML_UTF8 = "text/html;charset=UTF-8";

    String REQUEST_PARAM_FILE = "file";

    /**
     * точность расчетов, округление до 8-ми знаков после запятой
     */
    int CALCULATION_ROUND_SCALE = 8;

    interface Url {
        String CONTENT = "/content";
    }

    interface Report {
        String UNIVERSAL_PAYMENT_DOCUMENT = "UniversalPaymentDocument.jrxml";
        String UNIVERSAL_PAYMENT_DOCUMENT_SECTION_1 = "UniversalPaymentDocumentSection1.jrxml";
    }
}
