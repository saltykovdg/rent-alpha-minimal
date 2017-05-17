package rent.api.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import rent.api.service.PaymentService;
import rent.common.dtos.ServiceCalculationDto;

import java.util.List;

@RestController
@RequestMapping("/payment")
public class PaymentController {
    private final PaymentService paymentService;

    @Autowired
    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @RequestMapping(value = "/add", produces = {MediaType.APPLICATION_JSON_VALUE})
    public String addPayment(@RequestParam("accountId") String accountId,
                             @RequestParam("sum") Double sum) {
        paymentService.addPayment(accountId, sum);
        return HttpStatus.OK.toString();
    }

    @RequestMapping(value = "/remove", produces = {MediaType.APPLICATION_JSON_VALUE})
    public String removePayment(@RequestParam("paymentBundleId") String paymentBundleId) {
        paymentService.removePayment(paymentBundleId);
        return HttpStatus.OK.toString();
    }

    @RequestMapping(value = "/get", produces = {MediaType.APPLICATION_JSON_VALUE})
    public List<ServiceCalculationDto> getAccountPayments(@RequestParam("accountId") String accountId, Pageable p) {
        return paymentService.getAccountPayments(accountId, p);
    }
}
