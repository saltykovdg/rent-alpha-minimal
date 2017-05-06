package rent.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import rent.common.entity.SystemPropertyEntity;
import rent.common.enums.SystemPropertyType;
import rent.common.repository.SystemPropertyRepository;

@Service
public class SystemPropertyService {
    private final SystemPropertyRepository systemPropertyRepository;

    @Autowired
    public SystemPropertyService(SystemPropertyRepository systemPropertyRepository) {
        this.systemPropertyRepository = systemPropertyRepository;
    }

    boolean getCalculationIsActive() {
        SystemPropertyEntity systemProperty = systemPropertyRepository.findFirstByNameContaining(SystemPropertyType.CALCULATION_IS_ACTIVE.getName());
        return systemProperty != null && systemProperty.getValue().equals("1");
    }

    void setCalculationActive(Boolean active) {
        SystemPropertyEntity systemProperty = systemPropertyRepository.findFirstByNameContaining(SystemPropertyType.CALCULATION_IS_ACTIVE.getName());
        systemProperty.setValue(active ? "1" : "0");
        systemPropertyRepository.save(systemProperty);
    }

    public Integer getCalculationAccountsCount() {
        SystemPropertyEntity systemProperty = systemPropertyRepository.findFirstByNameContaining(SystemPropertyType.CALCULATION_ACCOUNTS_COUNT.getName());
        return systemProperty != null ? Integer.valueOf(systemProperty.getValue()) : 0;
    }

    void setCalculationAccountsCount(Integer accountsCount) {
        SystemPropertyEntity systemProperty = systemPropertyRepository.findFirstByNameContaining(SystemPropertyType.CALCULATION_ACCOUNTS_COUNT.getName());
        systemProperty.setValue(accountsCount.toString());
        systemPropertyRepository.save(systemProperty);
    }

    public Integer getCalculationAccountsCalculated() {
        SystemPropertyEntity systemProperty = systemPropertyRepository.findFirstByNameContaining(SystemPropertyType.CALCULATION_ACCOUNTS_CALCULATED.getName());
        return systemProperty != null ? Integer.valueOf(systemProperty.getValue()) : 0;
    }

    void setCalculationAccountsCalculated(Integer accountsCalculated) {
        SystemPropertyEntity systemProperty = systemPropertyRepository.findFirstByNameContaining(SystemPropertyType.CALCULATION_ACCOUNTS_CALCULATED.getName());
        systemProperty.setValue(accountsCalculated.toString());
        systemPropertyRepository.save(systemProperty);
    }

    long getCount() {
        return systemPropertyRepository.count();
    }

    void save(SystemPropertyEntity systemProperty) {
        systemPropertyRepository.save(systemProperty);
    }
}
