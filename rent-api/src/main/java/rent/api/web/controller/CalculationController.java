package rent.api.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import rent.api.service.CalculationService;
import rent.common.dtos.AccountCalculationDto;

import java.util.List;

@RestController
@RequestMapping("/calculation")
public class CalculationController {
    private final CalculationService calculationService;

    @Autowired
    public CalculationController(CalculationService calculationService) {
        this.calculationService = calculationService;
    }

    @RequestMapping(value = "/account", produces = {MediaType.APPLICATION_JSON_VALUE})
    public List<AccountCalculationDto> getAccountCalculations(@RequestParam("accountId") String accountId,
                                                              @RequestParam("workingPeriodId") String workingPeriodId) {
        return calculationService.getAccountCalculations(accountId, workingPeriodId);
    }

    @RequestMapping(value = "/calculate-account", produces = {MediaType.APPLICATION_JSON_VALUE})
    public String calculateAccount(@RequestParam("accountId") String accountId,
                                   @RequestParam("periodStartId") String periodStartId,
                                   @RequestParam("periodEndId") String periodEndId) {
        calculationService.calculateAccount(accountId, periodStartId, periodEndId);
        return HttpStatus.OK.toString();
    }

    @RequestMapping(value = "/calculate-accounts", produces = {MediaType.APPLICATION_JSON_VALUE})
    public String calculateAccounts(@RequestParam("periodStartId") String periodStartId,
                                    @RequestParam("periodEndId") String periodEndId) {
        calculationService.calculateAccounts(periodStartId, periodEndId);
        return HttpStatus.OK.toString();
    }

    @RequestMapping(value = "/close-working-period", produces = {MediaType.APPLICATION_JSON_VALUE})
    public String closeWorkingPeriod() {
        calculationService.closeWorkingPeriod();
        return HttpStatus.OK.toString();
    }

    @RequestMapping(value = "/rollback-current-working-period", produces = {MediaType.APPLICATION_JSON_VALUE})
    public String rollbackCurrentWorkingPeriod() {
        calculationService.rollbackCurrentWorkingPeriod();
        return HttpStatus.OK.toString();
    }
}
