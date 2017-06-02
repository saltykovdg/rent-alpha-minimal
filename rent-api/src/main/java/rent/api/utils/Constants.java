package rent.api.utils;

public interface Constants {
    String PRODUCES_TEXT_HTML_UTF8 = "text/html;charset=UTF-8";

    String REQUEST_PARAM_FILE = "file";
    String HEADER_CONTENT_FILE_NAME = "content-file-name";
    String HEADER_CONTENT_DISPOSITION = "content-disposition";
    String HEADER_AUTHORIZATION = "Authorization";

    /**
     * точность расчетов, округление до 8-ми знаков после запятой
     */
    int CALCULATION_ROUND_SCALE = 8;

    interface Url {
        String CONTENT = "/content";
    }

    interface Report {
        String UNIVERSAL_PAYMENT_DOCUMENT = "UniversalPaymentDocument.jrxml";
        String UNIVERSAL_PAYMENT_DOCUMENT_SECTION_3 = "UniversalPaymentDocumentSection3.jrxml";
        String UNIVERSAL_PAYMENT_DOCUMENT_SECTION_4 = "UniversalPaymentDocumentSection4.jrxml";
        String UNIVERSAL_PAYMENT_DOCUMENT_SECTION_5 = "UniversalPaymentDocumentSection5.jrxml";
    }
}
