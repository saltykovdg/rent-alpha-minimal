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
import java.time.LocalDateTime;
import java.util.*;

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
        if (sum != 0D) {
            WorkingPeriodEntity currentWorkingPeriod = calculationService.getCurrentWorkingPeriod();
            String currentWorkingPeriodId = currentWorkingPeriod.getId();
            calculationService.calculateAccount(accountId, currentWorkingPeriodId, currentWorkingPeriodId);
            List<AccountCalculationDto> accountCalculationList = calculationService.getAccountCalculations(accountId, currentWorkingPeriod.getId());

            Map<String, Map.Entry<AccountServiceEntity, Double>> servicesPayments = new HashMap<>();
            String paymentBundleId = UUID.randomUUID().toString();
            LocalDateTime paymentDate = LocalDateTime.now();

            sum = addPaymentsToServices(servicesPayments, accountCalculationList, sum, false);

            if (sum > 0) {
                sum = addPaymentsToServices(servicesPayments, accountCalculationList, sum, true);
            }

            if (sum > 0) {
                int accountServicesCount = accountCalculationList.size();
                if (accountServicesCount > 0) {
                    Double paymentSum = roundFloor(sum / (double) accountServicesCount);
                    if (paymentSum > 0) {
                        for (AccountCalculationDto accountCalculationDto : accountCalculationList) {
                            AccountServiceEntity accountService = accountServiceRepository.findOne(accountCalculationDto.getAccountServiceId());
                            sum = sum - paymentSum;
                            updateServicesPayments(servicesPayments, accountService, paymentSum);
                        }
                    }
                    if (sum > 0) {
                        AccountServiceEntity accountService = accountServiceRepository.findOne(accountCalculationList.get(0).getAccountServiceId());
                        updateServicesPayments(servicesPayments, accountService, sum);
                    }
                }
            }

            for (Map.Entry<String, Map.Entry<AccountServiceEntity, Double>> entry : servicesPayments.entrySet()) {
                Map.Entry<AccountServiceEntity, Double> entryValue = entry.getValue();
                AccountServiceEntity accountService = entryValue.getKey();
                Double paymentSum = entryValue.getValue();
                savePayment(accountService, currentWorkingPeriod, paymentDate, paymentBundleId, paymentSum);
            }
        }
    }

    private Double addPaymentsToServices(Map<String, Map.Entry<AccountServiceEntity, Double>> servicesPayments, List<AccountCalculationDto> accountCalculationList, Double sum, boolean isClosingBalance) {
        for (AccountCalculationDto accountCalculationDto : accountCalculationList) {
            Double accrual = accountCalculationDto.getAccrual();
            Double recalculation = accountCalculationDto.getRecalculation();

            Double payment = accountCalculationDto.getPayment();
            Double currentPayments = 0D;
            Map.Entry<AccountServiceEntity, Double> entry = servicesPayments.get(accountCalculationDto.getAccountServiceId());
            if (entry != null && isClosingBalance) {
                currentPayments = entry.getValue();
            }
            Double closingBalance = accountCalculationDto.getClosingBalance();
            Double debt = !isClosingBalance ? calculationService.roundHalfUp(accrual + recalculation - payment) : calculationService.roundHalfUp(closingBalance - currentPayments);
            if (debt > 0 && sum > 0) {
                AccountServiceEntity accountService = accountServiceRepository.findOne(accountCalculationDto.getAccountServiceId());
                if (debt < sum) {
                    sum = calculationService.roundHalfUp(sum - debt);
                } else {
                    debt = sum;
                    sum = 0D;
                }
                updateServicesPayments(servicesPayments, accountService, debt);
                if (sum == 0) {
                    break;
                }
            }
        }
        return sum;
    }

    private void updateServicesPayments(Map<String, Map.Entry<AccountServiceEntity, Double>> servicesPayments, AccountServiceEntity accountService, Double sum) {
        Map.Entry<AccountServiceEntity, Double> servicePayment = servicesPayments.get(accountService.getId());
        if (servicePayment == null) {
            servicePayment = new AbstractMap.SimpleEntry<>(accountService, sum);
            servicesPayments.put(accountService.getId(), servicePayment);
        } else {
            servicePayment.setValue(servicePayment.getValue() + sum);
        }
    }

    private void savePayment(AccountServiceEntity accountService, WorkingPeriodEntity workingPeriod, LocalDateTime paymentDate, String paymentBundleId, Double paymentSum) {
        AccountPaymentEntity accountPayment = new AccountPaymentEntity();
        accountPayment.setAccountService(accountService);
        accountPayment.setWorkingPeriod(workingPeriod);
        accountPayment.setDate(paymentDate);
        accountPayment.setBundleId(paymentBundleId);
        accountPayment.setValue(paymentSum);
        accountPaymentRepository.save(accountPayment);
    }

    /**
     * Удалять оплаты можно только за текущий рабочий период
     * @param paymentBundleId бандл оплаты
     */
    public void deletePayment(String paymentBundleId) {
        log.info("deletePayment({})", paymentBundleId);
        String workingPeriodId = calculationService.getCurrentWorkingPeriod().getId();
        accountPaymentRepository.deleteByBundleId(paymentBundleId, workingPeriodId);
    }

    public Page<ServiceCalculationDto> getAccountPayments(String accountId, Pageable p) {
        log.info("getAccountPayments({}, {})", accountId, p);
        Page<ServiceCalculationDto> page = accountPaymentRepository.getSumByAccountIdPageable(accountId, p);
        if (page != null && page.hasContent()) {
            for (ServiceCalculationDto serviceCalculationDto : page.getContent()) {
                List<ServiceCalculationInfoDto> serviceCalculationInfoList = accountPaymentRepository.getSumInfoByBundleId(serviceCalculationDto.getBundleId());
                if (serviceCalculationInfoList == null) {
                    serviceCalculationInfoList = Collections.emptyList();
                }
                serviceCalculationDto.setServiceCalculationInfoList(serviceCalculationInfoList);
            }
        }
        return page;
    }
}
