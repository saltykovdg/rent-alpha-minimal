package rent.api.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.PagedResources;
import org.springframework.hateoas.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import rent.api.service.PaymentService;
import rent.common.dtos.ServiceCalculationDto;

@RestController
@RepositoryRestController
@RequestMapping("/payment")
public class PaymentController {
    private final PaymentService paymentService;
    private final PagedResourcesAssembler pagedResourcesAssembler;

    @Autowired
    public PaymentController(PaymentService paymentService,
                             PagedResourcesAssembler pagedResourcesAssembler) {
        this.paymentService = paymentService;
        this.pagedResourcesAssembler = pagedResourcesAssembler;
    }

    @RequestMapping(value = "/add", produces = {MediaType.APPLICATION_JSON_VALUE}, method = RequestMethod.POST)
    public String addPayment(@RequestParam("accountId") String accountId,
                             @RequestParam("sum") Double sum) {
        paymentService.addPayment(accountId, sum);
        return HttpStatus.OK.toString();
    }

    @RequestMapping(value = "/delete", produces = {MediaType.APPLICATION_JSON_VALUE}, method = RequestMethod.DELETE)
    public String deletePayment(@RequestParam("paymentBundleId") String paymentBundleId) {
        paymentService.deletePayment(paymentBundleId);
        return HttpStatus.OK.toString();
    }

    @RequestMapping(value = "/get", produces = {MediaType.APPLICATION_JSON_VALUE})
    public PagedResources<Resource<ServiceCalculationDto>> getAccountPayments(@RequestParam("accountId") String accountId, Pageable p) {
        Page<ServiceCalculationDto> page = paymentService.getAccountPayments(accountId, p);
        return pagedResourcesAssembler.toResource(page);
    }
}
