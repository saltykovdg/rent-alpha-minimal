package rent.common.dtos;

import org.springframework.hateoas.ResourceSupport;
import rent.common.entity.*;

import java.time.LocalDateTime;
import java.util.List;

public class ServiceCalculationDto extends ResourceSupport {
    private WorkingPeriodEntity workingPeriod;
    private LocalDateTime date;
    private String bundleId;
    private Double sum;
    private List<ServiceCalculationInfoDto> serviceCalculationInfoList;

    public ServiceCalculationDto() {
    }

    public ServiceCalculationDto(WorkingPeriodEntity workingPeriod, LocalDateTime date, String bundleId, Double sum) {
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

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
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
