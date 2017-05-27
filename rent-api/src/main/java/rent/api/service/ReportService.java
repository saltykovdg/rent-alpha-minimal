package rent.api.service;

import net.sf.jasperreports.engine.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import rent.api.utils.Constants;
import rent.common.dtos.AccountCalculationDto;
import rent.common.dtos.ServiceCalculationDto;
import rent.common.entity.*;
import rent.common.repository.AccountRepository;
import rent.common.repository.WorkingPeriodRepository;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ReportService {
    private final Logger log = LoggerFactory.getLogger(getClass());

    private final AccountRepository accountRepository;
    private final WorkingPeriodRepository workingPeriodRepository;
    private final CalculationService calculationService;
    private final PaymentService paymentService;
    private final DateTimeFormatter dateFormatter;
    private final DateTimeFormatter dateTimeFormatter;

    public ReportService(AccountRepository accountRepository,
                         WorkingPeriodRepository workingPeriodRepository,
                         CalculationService calculationService,
                         PaymentService paymentService) {
        this.accountRepository = accountRepository;
        this.workingPeriodRepository = workingPeriodRepository;
        this.calculationService = calculationService;
        this.paymentService = paymentService;
        this.dateFormatter = DateTimeFormatter.ofPattern("dd.MM.yyyy");
        this.dateTimeFormatter = DateTimeFormatter.ofPattern("dd.MM.yyyy HH:mm:ss");
    }

    private void createReport(String reportName, String reportNameDownload, HttpServletResponse response, Map<String, Object> parameters, JRDataSource dataSource) {
        JasperReport jasperReport;
        JasperPrint jasperPrint;
        try {
            InputStream inputStream = getReportInputStream(reportName);
            jasperReport = JasperCompileManager.compileReport(inputStream);
            jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, dataSource);
            response.setContentType("application/x-pdf");
            response.setHeader("Content-disposition", "attachment; filename=" + reportNameDownload + ".pdf");
            JasperExportManager.exportReportToPdfStream(jasperPrint, response.getOutputStream());
        } catch (JRException | IOException e) {
            log.error(e.getMessage(), e);
        }
    }

    private InputStream getReportInputStream(String reportName) {
        ClassLoader classloader = Thread.currentThread().getContextClassLoader();
        return classloader.getResourceAsStream("reports/" + reportName);
    }

    public void getReportUniversalPaymentDocument(HttpServletResponse response, String accountId, String periodStartId, String periodEndId) {
        log.debug("createReportUniversalPaymentDocument({}, {}, {})", accountId, periodStartId, periodEndId);

        AccountEntity account = accountRepository.findOne(accountId);
        WorkingPeriodEntity periodStart = workingPeriodRepository.findOne(periodStartId);
        WorkingPeriodEntity periodEnd = workingPeriodRepository.findOne(periodEndId);
        WorkingPeriodEntity currentWorkingPeriod = calculationService.getCurrentWorkingPeriod();

        List<AccountCalculationDto> accountCalculationList = calculationService.getAccountCalculations(accountId, periodStartId);

        Map<String, Object> parameters = new HashMap<>();

        // section 1 - account
        parameters.put("currentDate", LocalDate.now().format(dateFormatter));
        parameters.put("currentDateTime", LocalDateTime.now().format(dateTimeFormatter));
        parameters.put("periodName", periodStart.getName());
        List<AccountOwnerEntity> accountOwnersList = calculationService.getListForPeriod(periodStart, account.getOwners());
        StringBuilder accountOwners = new StringBuilder();
        if (accountOwnersList.size() > 0) {
            AccountOwnerEntity accountOwner = accountOwnersList.get(0);
            CitizenEntity citizen = accountOwner.getCitizen();
            accountOwners.append(citizen.getLastName()).append(" ").append(citizen.getFirstName()).append(" ").append(citizen.getFatherName());
        }
        parameters.put("accountOwners", accountOwners.toString());
        ApartmentEntity apartment = account.getApartment();
        BuildingEntity building = apartment.getBuilding();
        StreetEntity street = building.getStreet();
        StreetTypeEntity streetType = street.getStreetType();
        String accountAddress = streetType.getNameShort() + " " + street.getName() + ", д. " + building.getHouse() + ", кв. " + apartment.getApartment();
        parameters.put("accountAddress", accountAddress);
        parameters.put("accountTotalArea", calculationService.getAccountTotalAreaForPeriod(account, periodStart).toString());
        parameters.put("accountLivingArea", apartment.getLivingArea().toString());
        List<AccountRegisteredEntity> accountRegisteredList = calculationService.getListForPeriod(periodStart, account.getRegistered());
        parameters.put("accountRegisteredCount", String.valueOf(accountRegisteredList.size()));
        parameters.put("accountRoomsCount", apartment.getRoomsNumber().toString());

        // section 1 - contractor
        ContractorEntity contractor = account.getContractor();
        parameters.put("contractorName", contractor.getName());
        parameters.put("contractorINN", contractor.getInn());
        parameters.put("contractorLegalAddress", contractor.getLegalAddress());
        parameters.put("contractorPhone", contractor.getPhone());
        parameters.put("contractorFax", contractor.getFax());
        parameters.put("contractorEmail", contractor.getEmail());
        parameters.put("contractorWebSite", contractor.getWebSite());

        // section 2
        parameters.put("accountNumber", account.getAccountNumber());
        parameters.put("contractorBankName", contractor.getBankName());
        parameters.put("contractorBankAddress", contractor.getBankAddress());
        parameters.put("contractorBankSettlementAccount", contractor.getSettlementAccount());
        parameters.put("contractorBankIdentificationCode", contractor.getBankIdentificationCode());
        parameters.put("contractorBankCorrespondentAccount", contractor.getCorrespondentAccount());
        List<AccountServiceEntity> accountServiceList = calculationService.getListForPeriod(periodStart, account.getServices());
        StringBuilder accountServices = new StringBuilder();
        for (AccountServiceEntity accountService : accountServiceList) {
            accountServices.append(accountServices.toString().isEmpty() ? "" : ", ");
            ServiceEntity service = accountService.getService();
            accountServices.append(service.getName());
        }
        parameters.put("accountServices", accountServices.toString());
        Double accountAmountDue = 0D;
        Double accountOpeningBalance = 0D;
        Double accountPayments = 0D;
        for (AccountCalculationDto accountCalculation : accountCalculationList) {
            Double accrual = accountCalculation.getAccrual();
            Double recalculation = accountCalculation.getRecalculation();
            Double payment = accountCalculation.getPayment();
            accountAmountDue = +calculationService.roundHalfUp(accrual + recalculation - payment);
            accountOpeningBalance = +accountCalculation.getOpeningBalance();
            accountPayments = +payment;
        }
        parameters.put("accountAmountDue", accountAmountDue > 0 ? accountAmountDue.toString() : "0");
        parameters.put("accountAmountDebt", accountOpeningBalance > 0 ? accountOpeningBalance.toString() : "0");
        parameters.put("accountAmountPrepaid", accountOpeningBalance < 0 ? accountOpeningBalance.toString() : "0");
        parameters.put("accountPayments", accountPayments > 0 ? accountPayments.toString() : "0");
        String accountLastPaymentDate = "";
        Page<ServiceCalculationDto> accountPaymentsList = paymentService.getAccountPayments(accountId, new PageRequest(0, 1));
        if (accountPaymentsList != null) {
            List<ServiceCalculationDto> list = accountPaymentsList.getContent();
            if (list.size() > 0) {
                ServiceCalculationDto serviceCalculationDto = list.get(0);
                accountLastPaymentDate = serviceCalculationDto.getDate().format(dateFormatter);
            }
        }
        parameters.put("accountLastPaymentDate", accountLastPaymentDate);
        Double accountTotalPayment = calculationService.roundHalfUp(accountAmountDue + accountOpeningBalance);
        parameters.put("accountTotalPayment", accountTotalPayment > 0 ? accountTotalPayment.toString() : "0");

        JREmptyDataSource jrEmptyDataSource = new JREmptyDataSource();

        //test url
        //http://192.168.0.101:8080/report/universal-payment-document?accountId=6b347984-49f6-46b2-9659-307353993af5&periodStartId=8ecdd221-5a41-4015-9e26-45ad831f6641&periodEndId=8ecdd221-5a41-4015-9e26-45ad831f6641
        String reportNameDownload = "UPD_" + account.getAccountNumber() + "_" + LocalDateTime.now().toString();
        createReport(Constants.Report.UNIVERSAL_PAYMENT_DOCUMENT, reportNameDownload, response, parameters, jrEmptyDataSource);
    }
}
