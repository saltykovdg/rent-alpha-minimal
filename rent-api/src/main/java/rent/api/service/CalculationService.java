package rent.api.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import rent.common.dtos.AccountCalculationDto;
import rent.common.repository.CommonRepository;

import java.util.List;

@Service
public class CalculationService {
    private final Logger log = LoggerFactory.getLogger(getClass());

    private final CommonRepository commonRepository;

    @Autowired
    public CalculationService(CommonRepository commonRepository) {
        this.commonRepository = commonRepository;
    }

    public List<AccountCalculationDto> getAccountCalculations(String accountId, String workingPeriodId) {
        return commonRepository.getAccountCalculations(accountId, workingPeriodId);
    }

    public void calculateAccount(String accountId, String periodStartId, String periodEndId) {
        log.info("calculateAccount({}, {}, {})", accountId, periodStartId, periodEndId);

        // testing
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
