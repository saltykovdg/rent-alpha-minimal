package rent.common.dtos;

import rent.common.entity.ServiceEntity;
import rent.common.entity.TariffEntity;

public class AccountCalculationDto {
    private ServiceEntity service;
    private TariffEntity tariff;
    private Double openingBalance;
    private Double consumption;
    private Double accrual;
    private Double recalculation;
    private Double payment;
    private Double closingBalance;

    public AccountCalculationDto() {
    }

    public AccountCalculationDto(ServiceEntity service, TariffEntity tariff, Double openingBalance, Double consumption, Double accrual, Double recalculation, Double payment) {
        this.service = service;
        this.tariff = tariff;
        this.openingBalance = openingBalance;
        this.consumption = consumption;
        this.accrual = accrual;
        this.recalculation = recalculation;
        this.payment = payment;
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

    public Double getOpeningBalance() {
        return openingBalance;
    }

    public void setOpeningBalance(Double openingBalance) {
        this.openingBalance = openingBalance;
    }

    public Double getConsumption() {
        return consumption;
    }

    public void setConsumption(Double consumption) {
        this.consumption = consumption;
    }

    public Double getAccrual() {
        return accrual;
    }

    public void setAccrual(Double accrual) {
        this.accrual = accrual;
    }

    public Double getRecalculation() {
        return recalculation;
    }

    public void setRecalculation(Double recalculation) {
        this.recalculation = recalculation;
    }

    public Double getPayment() {
        return payment;
    }

    public void setPayment(Double payment) {
        this.payment = payment;
    }

    public Double getClosingBalance() {
        return closingBalance;
    }

    public void setClosingBalance(Double closingBalance) {
        this.closingBalance = closingBalance;
    }
}
