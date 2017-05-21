package rent.common.dtos;

import org.springframework.hateoas.ResourceSupport;
import rent.common.entity.*;

import java.time.LocalDateTime;
import java.util.List;

public class ServiceCalculationDto extends ResourceSupport {
    private RecalculationTypeEntity recalculationType;
    private WorkingPeriodEntity workingPeriod;
    private WorkingPeriodEntity forWorkingPeriod;
    private LocalDateTime date;
    private String bundleId;
    private Double sum;
    private String note;
    private List<ServiceCalculationInfoDto> serviceCalculationInfoList;

    public ServiceCalculationDto() {
    }

    public ServiceCalculationDto(WorkingPeriodEntity workingPeriod, LocalDateTime date, String bundleId, Double sum) {
        this.workingPeriod = workingPeriod;
        this.date = date;
        this.bundleId = bundleId;
        this.sum = sum;
    }

    public ServiceCalculationDto(RecalculationTypeEntity recalculationType, String note, WorkingPeriodEntity forWorkingPeriod, WorkingPeriodEntity workingPeriod, LocalDateTime date, String bundleId, Double sum) {
        this.recalculationType = recalculationType;
        this.workingPeriod = workingPeriod;
        this.forWorkingPeriod = forWorkingPeriod;
        this.date = date;
        this.bundleId = bundleId;
        this.sum = sum;
        this.note = note;
    }

    public RecalculationTypeEntity getRecalculationType() {
        return recalculationType;
    }

    public void setRecalculationType(RecalculationTypeEntity recalculationType) {
        this.recalculationType = recalculationType;
    }

    public WorkingPeriodEntity getWorkingPeriod() {
        return workingPeriod;
    }

    public void setWorkingPeriod(WorkingPeriodEntity workingPeriod) {
        this.workingPeriod = workingPeriod;
    }

    public WorkingPeriodEntity getForWorkingPeriod() {
        return forWorkingPeriod;
    }

    public void setForWorkingPeriod(WorkingPeriodEntity forWorkingPeriod) {
        this.forWorkingPeriod = forWorkingPeriod;
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

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public List<ServiceCalculationInfoDto> getServiceCalculationInfoList() {
        return serviceCalculationInfoList;
    }

    public void setServiceCalculationInfoList(List<ServiceCalculationInfoDto> serviceCalculationInfoList) {
        this.serviceCalculationInfoList = serviceCalculationInfoList;
    }
}
