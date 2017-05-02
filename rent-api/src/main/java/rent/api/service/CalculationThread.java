package rent.api.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import rent.common.entity.AccountEntity;
import rent.common.entity.WorkingPeriodEntity;

import java.util.List;

public class CalculationThread implements Runnable {
    private final Logger log = LoggerFactory.getLogger(getClass());

    private final SystemPropertyService systemPropertyService;
    private final CalculationService calculationService;
    private final List<AccountEntity> accounts;
    private final String periodStartId;
    private final String periodEndId;
    private final int accountsCount;
    private final WorkingPeriodEntity currentWorkingPeriod;
    private final WorkingPeriodEntity newWorkingPeriod;

    public CalculationThread(SystemPropertyService systemPropertyService, CalculationService calculationService, List<AccountEntity> accounts, String periodStartId, String periodEndId) {
        this.systemPropertyService = systemPropertyService;
        this.calculationService = calculationService;
        this.accounts = accounts;
        this.accountsCount = accounts.size();
        this.periodStartId = periodStartId;
        this.periodEndId = periodEndId;
        this.currentWorkingPeriod = null;
        this.newWorkingPeriod = null;
        new Thread(this).start();
    }

    public CalculationThread(SystemPropertyService systemPropertyService, CalculationService calculationService, List<AccountEntity> accounts, WorkingPeriodEntity currentWorkingPeriod, WorkingPeriodEntity newWorkingPeriod) {
        this.systemPropertyService = systemPropertyService;
        this.calculationService = calculationService;
        this.accounts = accounts;
        this.accountsCount = accounts.size();
        this.periodStartId = null;
        this.periodEndId = null;
        this.currentWorkingPeriod = currentWorkingPeriod;
        this.newWorkingPeriod = newWorkingPeriod;
        new Thread(this).start();
    }

    @Override
    public void run() {
        try {
            while (true) {
                AccountEntity account;
                synchronized (accounts) {
                    if (accounts.size() == 0) {
                        break;
                    }
                    account = accounts.remove(0);
                }
                if (periodStartId != null && periodEndId != null) {
                    calculationService.calculateAccount(account.getId(), periodStartId, periodEndId);
                } else {
                    calculationService.calculateCloseWorkingPeriod(account, currentWorkingPeriod, newWorkingPeriod);
                }
                synchronized (systemPropertyService) {
                    int currentCount = accountsCount - accounts.size();
                    if (systemPropertyService.getCalculationAccountsCalculated() < currentCount) {
                        systemPropertyService.setCalculationAccountsCalculated(currentCount);
                    }
                }
            }
            synchronized (systemPropertyService) {
                if (systemPropertyService.getCalculationAccountsCalculated() == accountsCount) {
                    systemPropertyService.setCalculationActive(false);
                }
            }
        } catch (Exception e) {
            log.error(e.getMessage(), e);
        }
    }
}
