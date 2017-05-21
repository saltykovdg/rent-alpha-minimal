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
import rent.api.service.RecalculationService;
import rent.common.dtos.ServiceCalculationDto;

@RestController
@RepositoryRestController
@RequestMapping("/recalculation")
public class RecalculationController {
    private final RecalculationService recalculationService;
    private final PagedResourcesAssembler pagedResourcesAssembler;

    @Autowired
    public RecalculationController(RecalculationService recalculationService,
                                   PagedResourcesAssembler pagedResourcesAssembler) {
        this.recalculationService = recalculationService;
        this.pagedResourcesAssembler = pagedResourcesAssembler;
    }

    @RequestMapping(value = "/add", produces = {MediaType.APPLICATION_JSON_VALUE}, method = RequestMethod.POST)
    public String addRecalculation(@RequestParam("accountServiceId") String accountServiceId,
                                   @RequestParam("sum") Double sum,
                                   @RequestParam("note") String note) {
        recalculationService.addRecalculation(accountServiceId, sum, note);
        return HttpStatus.OK.toString();
    }

    @RequestMapping(value = "/delete", produces = {MediaType.APPLICATION_JSON_VALUE}, method = RequestMethod.DELETE)
    public String deleteRecalculation(@RequestParam("bundleId") String bundleId) {
        recalculationService.deleteRecalculation(bundleId);
        return HttpStatus.OK.toString();
    }

    @RequestMapping(value = "/get", produces = {MediaType.APPLICATION_JSON_VALUE})
    public PagedResources<Resource<ServiceCalculationDto>> getAccountRecalculations(@RequestParam("accountId") String accountId, Pageable p) {
        Page<ServiceCalculationDto> page = recalculationService.getAccountRecalculations(accountId, p);
        return pagedResourcesAssembler.toResource(page);
    }
}
