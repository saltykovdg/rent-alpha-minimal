package rent.common.dtos;

import rent.common.entity.*;

import java.time.LocalDate;
import java.util.List;

public class ServiceCalculationDto {
    private WorkingPeriodEntity workingPeriod;
    private LocalDate date;
    private String bundleId;
    private Double sum;
    private List<ServiceCalculationInfoDto> serviceCalculationInfoList;

    public ServiceCalculationDto() {
    }

    public ServiceCalculationDto(WorkingPeriodEntity workingPeriod, LocalDate date, String bundleId, Double sum) {
        this.workingPeriod = workingPeriod;
        this.date = date;
        this.bundleId = bundleId;
        this.sum = sum;
    }

    public WorkingPeriodEntity getWorkingPeriod() {
        return workingPeriod;
    }

    public void setWorkingPeriod(WorkingPeriodEntity workingPeriod) {
        this.workingPeriod = workingPeriod;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getBundleId() {
        return bundleId;
    }

    public void setBundleId(String bundleId) {
        this.bundleId = bundleId;
    }

    public Double getSum() {
        return sum;
    }

    public void setSum(Double sum) {
        this.sum = sum;
    }

    public List<ServiceCalculationInfoDto> getServiceCalculationInfoList() {
        return serviceCalculationInfoList;
    }

    public void setServiceCalculationInfoList(List<ServiceCalculationInfoDto> serviceCalculationInfoList) {
        this.serviceCalculationInfoList = serviceCalculationInfoList;
    }
}
