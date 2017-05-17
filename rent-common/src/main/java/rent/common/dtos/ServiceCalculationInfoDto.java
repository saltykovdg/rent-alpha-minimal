package rent.common.dtos;

import rent.common.entity.ServiceEntity;

public class ServiceCalculationInfoDto {
    private ServiceEntity service;
    private Double sum;

    public ServiceCalculationInfoDto() {
    }

    public ServiceCalculationInfoDto(ServiceEntity service, Double sum) {
        this.service = service;
        this.sum = sum;
    }

    public ServiceEntity getService() {
        return service;
    }

    public void setService(ServiceEntity service) {
        this.service = service;
    }

    public Double getSum() {
        return sum;
    }

    public void setSum(Double sum) {
        this.sum = sum;
    }
}
