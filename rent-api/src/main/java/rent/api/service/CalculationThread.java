package rent.api.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import rent.common.entity.WorkingPeriodEntity;

import java.util.concurrent.Callable;

public class CalculationThread implements Callable<Integer> {
    private final Logger log = LoggerFactory.getLogger(getClass());

    private final CalculationService calculationService;
    private final String accountId;
    private final String periodStartId;
    private final String periodEndId;
    private final WorkingPeriodEntity currentWorkingPeriod;
    private final WorkingPeriodEntity newWorkingPeriod;

    CalculationThread(CalculationService calculationService, String accountId, String periodStartId, String periodEndId) {
        this.calculationService = calculationService;
        this.accountId = accountId;
        this.periodStartId = periodStartId;
        this.periodEndId = periodEndId;
        this.currentWorkingPeriod = null;
        this.newWorkingPeriod = null;
    }

    CalculationThread(CalculationService calculationService, String accountId, WorkingPeriodEntity currentWorkingPeriod, WorkingPeriodEntity newWorkingPeriod) {
        this.calculationService = calculationService;
        this.accountId = accountId;
        this.periodStartId = null;
        this.periodEndId = null;
        this.currentWorkingPeriod = currentWorkingPeriod;
        this.newWorkingPeriod = newWorkingPeriod;
    }

    @Override
    public Integer call() throws Exception {
        try {
            if (periodStartId != null && periodEndId != null) {
                calculationService.calculateAccount(accountId, periodStartId, periodEndId);
            } else {
                calculationService.calculateCloseWorkingPeriod(accountId, currentWorkingPeriod, newWorkingPeriod);
            }
        } catch (Exception e) {
            log.error(e.getMessage(), e);
        }
        return 0;
    }
}
