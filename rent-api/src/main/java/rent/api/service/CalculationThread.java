package rent.api.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import rent.common.entity.AccountEntity;
import rent.common.entity.WorkingPeriodEntity;

import java.util.concurrent.Callable;

public class CalculationThread implements Callable<Integer> {
    private final Logger log = LoggerFactory.getLogger(getClass());

    private final CalculationService calculationService;
    private final AccountEntity account;
    private final String periodStartId;
    private final String periodEndId;
    private final WorkingPeriodEntity currentWorkingPeriod;
    private final WorkingPeriodEntity newWorkingPeriod;

    public CalculationThread(CalculationService calculationService, AccountEntity account, String periodStartId, String periodEndId) {
        this.calculationService = calculationService;
        this.account = account;
        this.periodStartId = periodStartId;
        this.periodEndId = periodEndId;
        this.currentWorkingPeriod = null;
        this.newWorkingPeriod = null;
    }

    public CalculationThread(CalculationService calculationService, AccountEntity account, WorkingPeriodEntity currentWorkingPeriod, WorkingPeriodEntity newWorkingPeriod) {
        this.calculationService = calculationService;
        this.account = account;
        this.periodStartId = null;
        this.periodEndId = null;
        this.currentWorkingPeriod = currentWorkingPeriod;
        this.newWorkingPeriod = newWorkingPeriod;
    }

    @Override
    public Integer call() throws Exception {
        try {
            if (periodStartId != null && periodEndId != null) {
                calculationService.calculateAccount(account.getId(), periodStartId, periodEndId);
            } else {
                calculationService.calculateCloseWorkingPeriod(account, currentWorkingPeriod, newWorkingPeriod);
            }
        } catch (Exception e) {
            log.error(e.getMessage(), e);
        }
        return 0;
    }
}
