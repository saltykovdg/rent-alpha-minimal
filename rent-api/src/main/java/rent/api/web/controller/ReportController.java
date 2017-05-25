package rent.api.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import rent.api.service.ReportService;

import javax.servlet.http.HttpServletResponse;

@RestController
@RepositoryRestController
@RequestMapping("/report")
public class ReportController {
    private final ReportService reportService;

    @Autowired
    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    @RequestMapping(value = "/universal-payment-document", produces = {MediaType.APPLICATION_JSON_VALUE})
    public String getReportUniversalPaymentDocument(HttpServletResponse response,
                                                    @RequestParam("accountId") String accountId,
                                                    @RequestParam("periodStartId") String periodStartId,
                                                    @RequestParam("periodEndId") String periodEndId) {
        reportService.getReportUniversalPaymentDocument(response, accountId, periodStartId, periodEndId);
        return HttpStatus.OK.toString();
    }
}
