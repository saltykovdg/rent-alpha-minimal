package rent.common.dtos;

import rent.common.entity.ServiceEntity;
import rent.common.entity.TariffEntity;

public class AccountCalculationDto {
    private ServiceEntity service;
    private TariffEntity tariff;
    private Double openingBalances;
    private Double consumption;
    private Double accruals;
    private Double recalculations;
    private Double payments;

    public AccountCalculationDto() {
    }

    public AccountCalculationDto(ServiceEntity service, TariffEntity tariff, Double openingBalances, Double consumption, Double accruals, Double recalculations, Double payments) {
        this.service = service;
        this.tariff = tariff;
        this.openingBalances = openingBalances;
        this.consumption = consumption;
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

    public TariffEntity getTariff() {
        return tariff;
    }

    public void setTariff(TariffEntity tariff) {
        this.tariff = tariff;
    }

    public Double getOpeningBalances() {
        return openingBalances;
    }

    public void setOpeningBalances(Double openingBalances) {
        this.openingBalances = openingBalances;
    }

    public Double getConsumption() {
        return consumption;
    }

    public void setConsumption(Double consumption) {
        this.consumption = consumption;
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
