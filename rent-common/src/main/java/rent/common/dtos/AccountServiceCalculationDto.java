package rent.common.dtos;

import rent.common.entity.AccountServiceEntity;
import rent.common.entity.CalculationTypeEntity;
import rent.common.entity.MeasurementUnitEntity;
import rent.common.entity.TariffEntity;

public class AccountServiceCalculationDto {
    private AccountServiceEntity accountService;
    private Double sum;
    private Double consumption;
    private TariffEntity tariff;
    private CalculationTypeEntity tariffCalculationType;
    private MeasurementUnitEntity tariffMeasurementUnit;
    private Double tariffValue;
    private Integer accountServiceDaysActive;

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

    public TariffEntity getTariff() {
        return tariff;
    }

    public void setTariff(TariffEntity tariff) {
        this.tariff = tariff;
    }

    public CalculationTypeEntity getTariffCalculationType() {
        return tariffCalculationType;
    }

    public void setTariffCalculationType(CalculationTypeEntity tariffCalculationType) {
        this.tariffCalculationType = tariffCalculationType;
    }

    public MeasurementUnitEntity getTariffMeasurementUnit() {
        return tariffMeasurementUnit;
    }

    public void setTariffMeasurementUnit(MeasurementUnitEntity tariffMeasurementUnit) {
        this.tariffMeasurementUnit = tariffMeasurementUnit;
    }

    public Double getTariffValue() {
        return tariffValue;
    }

    public void setTariffValue(Double tariffValue) {
        this.tariffValue = tariffValue;
    }

    public Integer getAccountServiceDaysActive() {
        return accountServiceDaysActive;
    }

    public void setAccountServiceDaysActive(Integer accountServiceDaysActive) {
        this.accountServiceDaysActive = accountServiceDaysActive;
    }
}
