package rent.api.service;

public class CalculationThread implements Runnable {
    private final CalculationService calculationService;
    private final String periodStartId;
    private final String periodEndId;

    public CalculationThread(CalculationService calculationService, String periodStartId, String periodEndId) {
        this.calculationService = calculationService;
        this.periodStartId = periodStartId;
        this.periodEndId = periodEndId;
        new Thread(this).start();
    }

    public CalculationThread(CalculationService calculationService) {
        this.calculationService = calculationService;
        this.periodStartId = null;
        this.periodEndId = null;
        new Thread(this).start();
    }

    @Override
    public void run() {
        for (int i = 0; i < 30; i++) {
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            synchronized (calculationService) {
                calculationService.setSystemPropertyCalculationAccountsCalculated(i + 1);
            }
        }
        synchronized (calculationService) {
            calculationService.setSystemPropertyCalculationActive(false);
        }
    }
}
