package rent.common.dtos;

import rent.common.entity.ServiceEntity;

public class AccountCalculationDto {
    private ServiceEntity service;
    private Double openingBalances;
    private Double accruals;
    private Double recalculations;
    private Double payments;

    public AccountCalculationDto() {
    }

    public AccountCalculationDto(ServiceEntity service, Double openingBalances, Double accruals, Double recalculations, Double payments) {
        this.service = service;
        this.openingBalances = openingBalances;
        this.accruals = accruals;
        this.recalculations = recalculations;
        this.payments = payments;
    }

    public ServiceEntity getService() {
        return service;
    }

    public void setService(ServiceEntity service) {
        this.service = service;
    }

    public Double getOpeningBalances() {
        return openingBalances;
    }

    public void setOpeningBalances(Double openingBalances) {
        this.openingBalances = openingBalances;
    }

    public Double getAccruals() {
        return accruals;
    }

    public void setAccruals(Double accruals) {
        this.accruals = accruals;
    }

    public Double getRecalculations() {
        return recalculations;
    }

    public void setRecalculations(Double recalculations) {
        this.recalculations = recalculations;
    }

    public Double getPayments() {
        return payments;
    }

    public void setPayments(Double payments) {
        this.payments = payments;
    }
}
