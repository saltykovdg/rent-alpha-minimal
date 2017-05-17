package rent.api.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import rent.common.dtos.AccountCalculationDto;
import rent.common.dtos.ServiceCalculationDto;
import rent.common.dtos.ServiceCalculationInfoDto;
import rent.common.entity.AccountPaymentEntity;
import rent.common.entity.AccountServiceEntity;
import rent.common.entity.WorkingPeriodEntity;
import rent.common.repository.AccountPaymentRepository;
import rent.common.repository.AccountServiceRepository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

@Service
public class PaymentService {
    private final Logger log = LoggerFactory.getLogger(getClass());

    private final CalculationService calculationService;
    private final AccountPaymentRepository accountPaymentRepository;
    private final AccountServiceRepository accountServiceRepository;

    public PaymentService(CalculationService calculationService,
                          AccountPaymentRepository accountPaymentRepository,
                          AccountServiceRepository accountServiceRepository) {
        this.calculationService = calculationService;
        this.accountPaymentRepository = accountPaymentRepository;
        this.accountServiceRepository = accountServiceRepository;
    }

    private Double roundFloor(Double value) {
        BigDecimal bigDecimal = new BigDecimal(value);
        return bigDecimal.setScale(0, BigDecimal.ROUND_FLOOR).doubleValue();
    }

    public void addPayment(String accountId, Double sum) {
        log.info("addPayment({}, {})", accountId, sum);

        WorkingPeriodEntity currentWorkingPeriod = calculationService.getCurrentWorkingPeriod();
        String currentWorkingPeriodId = currentWorkingPeriod.getId();
        calculationService.calculateAccount(accountId, currentWorkingPeriodId, currentWorkingPeriodId);
        List<AccountCalculationDto> accountCalculationDtos = calculationService.getAccountCalculations(accountId, currentWorkingPeriod.getId());

        String paymentBundleId = UUID.randomUUID().toString();
        LocalDate paymentDate = LocalDate.now();

        for (AccountCalculationDto accountCalculationDto : accountCalculationDtos) {
            if (accountCalculationDto.getClosingBalance() > 0 && sum > 0) {
                AccountServiceEntity accountService = accountServiceRepository.findOne(accountCalculationDto.getAccountServiceId());

                Double paymentSum = sum;
                Double accrualSum = accountCalculationDto.getAccrual();
                if (accrualSum < sum) {
                    paymentSum = accrualSum;
                    sum = sum - accrualSum;
                } else {
                    sum = 0D;
                }

                savePayment(accountService, currentWorkingPeriod, paymentDate, paymentBundleId, paymentSum);

                if (sum == 0) {
                    break;
                }
            }
        }

        if (sum > 0) {
            for (AccountCalculationDto accountCalculationDto : accountCalculationDtos) {
                if (accountCalculationDto.getClosingBalance() > 0 && sum > 0) {
                    AccountServiceEntity accountService = accountServiceRepository.findOne(accountCalculationDto.getAccountServiceId());

                    Double paymentSum = sum;
                    Double closingBalanceSum = accountCalculationDto.getClosingBalance();
                    if (closingBalanceSum < sum) {
                        paymentSum = closingBalanceSum;
                        sum = sum - closingBalanceSum;
                    } else {
                        sum = 0D;
                    }

                    savePayment(accountService, currentWorkingPeriod, paymentDate, paymentBundleId, paymentSum);

                    if (sum == 0) {
                        break;
                    }
                }
            }
        }

        if (sum > 0) {
            int accountServicesCount = accountCalculationDtos.size();
            if (accountServicesCount > 0) {
                Double paymentSum = roundFloor(sum / (double) accountServicesCount);
                for (AccountCalculationDto accountCalculationDto : accountCalculationDtos) {
                    AccountServiceEntity accountService = accountServiceRepository.findOne(accountCalculationDto.getAccountServiceId());
                    sum = sum - paymentSum;
                    savePayment(accountService, currentWorkingPeriod, paymentDate, paymentBundleId, paymentSum);
                }
                if (sum > 0) {
                    AccountServiceEntity accountService = accountServiceRepository.findOne(accountCalculationDtos.get(0).getAccountServiceId());
                    savePayment(accountService, currentWorkingPeriod, paymentDate, paymentBundleId, sum);
                }
            }
        }
    }

    private void savePayment(AccountServiceEntity accountService, WorkingPeriodEntity workingPeriod, LocalDate paymentDate, String paymentBundleId, Double paymentSum) {
        AccountPaymentEntity accountPayment = new AccountPaymentEntity();
        accountPayment.setAccountService(accountService);
        accountPayment.setWorkingPeriod(workingPeriod);
        accountPayment.setDate(paymentDate);
        accountPayment.setBundleId(paymentBundleId);
        accountPayment.setValue(paymentSum);
        accountPaymentRepository.save(accountPayment);
    }

    public void removePayment(String paymentBundleId) {
        accountPaymentRepository.deleteByBundleId(paymentBundleId);
        log.info("removePayment({})", paymentBundleId);
    }

    public List<ServiceCalculationDto> getAccountPayments(String accountId, Pageable p) {
        List<ServiceCalculationDto> list = new ArrayList<>();
        Page<ServiceCalculationDto> page = accountPaymentRepository.getSumByAccountIdPageable(accountId, p);
        if (page != null && page.hasContent()) {
            list.addAll(page.getContent());
            for (ServiceCalculationDto serviceCalculationDto : list) {
                List<ServiceCalculationInfoDto> serviceCalculationInfoList = accountPaymentRepository.getSumInfoByBundleId(serviceCalculationDto.getBundleId());
                if (serviceCalculationInfoList == null) {
                    serviceCalculationInfoList = Collections.emptyList();
                }
                serviceCalculationDto.setServiceCalculationInfoList(serviceCalculationInfoList);
            }
        }
        log.info("getAccountPayments({}, {})", accountId, p);
        return list;
    }
}
