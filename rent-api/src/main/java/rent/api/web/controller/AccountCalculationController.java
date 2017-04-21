package rent.api.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import rent.common.dtos.AccountCalculationDto;
import rent.common.repository.CommonRepository;

import java.util.List;

@RestController
@RequestMapping("/account-calculation")
public class AccountCalculationController {
    private final CommonRepository commonRepository;

    @Autowired
    public AccountCalculationController(CommonRepository commonRepository) {
        this.commonRepository = commonRepository;
    }

    @RequestMapping(value = "/getAccountCalculations", produces = {MediaType.APPLICATION_JSON_VALUE})
    public List<AccountCalculationDto> getAccountCalculations(@RequestParam("accountId") String accountId,
                                                              @RequestParam("workingPeriodId") String workingPeriodId) {
        return commonRepository.getAccountCalculations(accountId, workingPeriodId);
    }
}
