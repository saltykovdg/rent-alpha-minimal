package rent.common.dtos;

import rent.common.entity.AccountServiceEntity;

public class AccountServiceCalculationDto {
    private AccountServiceEntity accountService;
    private Double sum;
    private Double consumption;

    public AccountServiceCalculationDto() {
    }

    public AccountServiceCalculationDto(AccountServiceEntity accountService, Double sum) {
        this.accountService = accountService;
        this.sum = sum;
        this.consumption = 0D;
    }

    public AccountServiceCalculationDto(AccountServiceEntity accountService, Double sum, Double consumption) {
        this.accountService = accountService;
        this.sum = sum;
        this.consumption = consumption;
    }

    public AccountServiceEntity getAccountService() {
        return accountService;
    }

    public void setAccountService(AccountServiceEntity accountService) {
        this.accountService = accountService;
    }

    public Double getSum() {
        return sum;
    }

    public void setSum(Double sum) {
        this.sum = sum;
    }

    public Double getConsumption() {
        return consumption;
    }

    public void setConsumption(Double consumption) {
        this.consumption = consumption;
    }
}
