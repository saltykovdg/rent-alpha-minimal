package rent.api.service;

import net.sf.jasperreports.engine.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import rent.api.utils.Constants;
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
    private final DateTimeFormatter dateFormatter;
    private final DateTimeFormatter dateTimeFormatter;

    public ReportService(AccountRepository accountRepository,
                         WorkingPeriodRepository workingPeriodRepository,
                         CalculationService calculationService) {
        this.accountRepository = accountRepository;
        this.workingPeriodRepository = workingPeriodRepository;
        this.calculationService = calculationService;
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

        Map<String, Object> parameters = new HashMap<>();

        // section 1 - account
        parameters.put("currentDate", LocalDate.now().format(dateFormatter));
        parameters.put("currentDateTime", LocalDateTime.now().format(dateTimeFormatter));
        parameters.put("periodName", periodStart.getName());
        List<AccountOwnerEntity> accountOwnersList = calculationService.getListForPeriod(periodStart, account.getOwners());
        StringBuilder accountOwners = new StringBuilder();
        for (AccountOwnerEntity accountOwner : accountOwnersList) {
            accountOwners.append(accountOwners.toString().isEmpty() ? "" : ", ");
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

        JREmptyDataSource jrEmptyDataSource = new JREmptyDataSource();

        //test url
        //http://192.168.0.101:8080/report/universal-payment-document?accountId=6b347984-49f6-46b2-9659-307353993af5&periodStartId=8ecdd221-5a41-4015-9e26-45ad831f6641&periodEndId=8ecdd221-5a41-4015-9e26-45ad831f6641
        String reportNameDownload = "UPD_" + account.getAccountNumber() + "_" + LocalDateTime.now().toString();
        createReport(Constants.Report.UNIVERSAL_PAYMENT_DOCUMENT, reportNameDownload, response, parameters, jrEmptyDataSource);
    }
}
