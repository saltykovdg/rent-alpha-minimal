package rent.api.service;

import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.data.JRMapCollectionDataSource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import rent.api.utils.Constants;
import rent.common.dtos.AccountCalculationDto;
import rent.common.dtos.ServiceCalculationDto;
import rent.common.entity.*;
import rent.common.enums.CalculationType;
import rent.common.repository.AccountAccrualRepository;
import rent.common.repository.AccountRecalculationRepository;
import rent.common.repository.AccountRepository;
import rent.common.repository.WorkingPeriodRepository;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.InputStream;
import java.text.DecimalFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class ReportService {
    private final Logger log = LoggerFactory.getLogger(getClass());

    private final AccountRepository accountRepository;
    private final AccountAccrualRepository accountAccrualRepository;
    private final AccountRecalculationRepository accountRecalculationRepository;
    private final WorkingPeriodRepository workingPeriodRepository;
    private final CalculationService calculationService;
    private final PaymentService paymentService;
    private final DateTimeFormatter dateFormatter;
    private final DateTimeFormatter dateTimeFormatter;
    private final DecimalFormat decimalFormat;
    private final DecimalFormat decimalFormatArea;

    public ReportService(AccountRepository accountRepository,
                         AccountAccrualRepository accountAccrualRepository,
                         AccountRecalculationRepository accountRecalculationRepository,
                         WorkingPeriodRepository workingPeriodRepository,
                         CalculationService calculationService,
                         PaymentService paymentService) {
        this.accountRepository = accountRepository;
        this.accountAccrualRepository = accountAccrualRepository;
        this.accountRecalculationRepository = accountRecalculationRepository;
        this.workingPeriodRepository = workingPeriodRepository;
        this.calculationService = calculationService;
        this.paymentService = paymentService;
        this.dateFormatter = DateTimeFormatter.ofPattern("dd.MM.yyyy");
        this.dateTimeFormatter = DateTimeFormatter.ofPattern("dd.MM.yyyy HH:mm:ss");
        this.decimalFormat = new DecimalFormat("0.00");
        this.decimalFormatArea = new DecimalFormat("#.##");
    }

    private JasperReport getJasperReport(String reportName) throws JRException {
        InputStream inputStream = getReportInputStream(reportName);
        return JasperCompileManager.compileReport(inputStream);
    }

    private InputStream getReportInputStream(String reportName) {
        ClassLoader classloader = Thread.currentThread().getContextClassLoader();
        return classloader.getResourceAsStream("reports/" + reportName);
    }

    private void exportReportToPdfStream(String reportNameDownload, JasperPrint jasperPrint, HttpServletResponse response) throws JRException {
        try {
            response.setContentType("application/x-pdf");
            response.setHeader("Content-disposition", "attachment; filename=" + reportNameDownload + ".pdf");
            JasperExportManager.exportReportToPdfStream(jasperPrint, response.getOutputStream());
        } catch (IOException e) {
            log.error(e.getMessage(), e);
        }
    }

    /**
     * test url:
     * http://192.168.0.101:8080/report/universal-payment-document?accountId=6b347984-49f6-46b2-9659-307353993af5&periodStartId=8ecdd221-5a41-4015-9e26-45ad831f6641&periodEndId=8ecdd221-5a41-4015-9e26-45ad831f6641
     * http://192.168.0.101:8080/report/universal-payment-document?accountId=6b347984-49f6-46b2-9659-307353993af5&periodStartId=f45ed4bc-c7e9-4344-8183-09737b3b1cd1&periodEndId=f45ed4bc-c7e9-4344-8183-09737b3b1cd1
     *
     * @param response
     * @param accountId
     * @param periodStartId
     * @param periodEndId
     */
    public void getReportUniversalPaymentDocument(HttpServletResponse response, String accountId, String periodStartId, String periodEndId) {
        log.debug("createReportUniversalPaymentDocument({}, {}, {})", accountId, periodStartId, periodEndId);

        AccountEntity account = accountRepository.findOne(accountId);
        ApartmentEntity apartment = account.getApartment();
        BuildingEntity building = apartment.getBuilding();
        StreetEntity street = building.getStreet();
        StreetTypeEntity streetType = street.getStreetType();

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
        String accountAddress = streetType.getNameShort() + " " + street.getName() + ", д. " + building.getHouse() + ", кв. " + apartment.getApartment();
        parameters.put("accountAddress", accountAddress);
        parameters.put("accountTotalArea", decimalFormatArea.format(calculationService.getAccountTotalAreaForPeriod(account, periodStart)));
        parameters.put("accountLivingArea", decimalFormatArea.format(apartment.getLivingArea()));
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
            accountAmountDue += calculationService.roundHalfUp(accrual + recalculation - payment);
            accountOpeningBalance += accountCalculation.getOpeningBalance();
            accountPayments += payment;
        }
        parameters.put("accountAmountDue", accountAmountDue > 0 ? decimalFormat.format(accountAmountDue) : "0");
        parameters.put("accountAmountDebt", accountOpeningBalance > 0 ? decimalFormat.format(accountOpeningBalance) : "0");
        parameters.put("accountAmountPrepaid", accountOpeningBalance < 0 ? decimalFormat.format(accountOpeningBalance) : "0");
        parameters.put("accountPayments", accountPayments > 0 ? decimalFormat.format(accountPayments) : "0");
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
        parameters.put("accountTotalPayment", accountTotalPayment > 0 ? decimalFormat.format(accountTotalPayment) : "0");

        // section 3
        List<Map<String, ?>> section3DataMap = new ArrayList<>();
        for (AccountCalculationDto accountCalculation : accountCalculationList) {
            Map<String, ? super Object> row = new HashMap<>();
            row.put("serviceName", accountCalculation.getService().getName());
            row.put("measurementUnitName", accountCalculation.getTariffMeasurementUnit().getName());
            row.put("consumptionIndividual", accountCalculation.getConsumption());
            row.put("consumptionCommon", 0D);
            row.put("tariffValue", accountCalculation.getTariffValue());
            row.put("accrualSumIndividual", accountCalculation.getAccrual());
            row.put("accrualSumCommon", 0D);
            row.put("accrualSum", accountCalculation.getAccrual());
            row.put("recalculationSum", accountCalculation.getRecalculation());
            Double totalSum = calculationService.roundHalfUp(accountCalculation.getAccrual() + accountCalculation.getRecalculation());
            row.put("totalSum", totalSum);
            row.put("totalSumIndividual", totalSum);
            row.put("totalSumCommon", 0D);
            section3DataMap.add(row);
        }
        if (section3DataMap.isEmpty()) {
            Map<String, ? super Object> row = new HashMap<>();
            row.put("serviceName", "");
            row.put("measurementUnitName", "");
            row.put("consumptionIndividual", null);
            row.put("consumptionCommon", null);
            row.put("tariffValue", null);
            row.put("accrualSumIndividual", null);
            row.put("accrualSumCommon", null);
            row.put("accrualSum", null);
            row.put("recalculationSum", null);
            row.put("totalSum", null);
            row.put("totalSumIndividual", null);
            row.put("totalSumCommon", null);
            section3DataMap.add(row);
        }
        JRMapCollectionDataSource section3DataSource = new JRMapCollectionDataSource(section3DataMap);

        // section 4
        List<Map<String, ?>> section4DataMap = new ArrayList<>();
        List<String> servicesProcessed = new ArrayList<>();
        for (AccountCalculationDto accountCalculation : accountCalculationList) {
            TariffEntity tariff = accountCalculation.getTariff();
            if (tariff == null) continue;
            List<TariffValueEntity> tariffValues = calculationService.getListForPeriod(periodStart, tariff.getValues());
            if (tariffValues == null || tariffValues.size() == 0) continue;
            TariffValueEntity tariffValue = tariffValues.get(0);
            CalculationTypeEntity calculationType = tariffValue.getCalculationType();
            if (calculationType.getCode().equals(CalculationType.METER_READING.getCode()) || calculationType.getCode().equals(CalculationType.METER_READING_WATER.getCode())) {
                ServiceEntity service = accountCalculation.getService();
                String serviceId = service.getId();
                if (servicesProcessed.contains(serviceId)) continue;
                MeasurementUnitEntity measurementUnit = accountCalculation.getTariffMeasurementUnit();
                Double normValue = 0D;
                if (calculationType.getCode().equals(CalculationType.METER_READING_WATER.getCode())) {
                    List<ServiceEntity> servicesWater = calculationService.getServicesWaterForPeriod(periodStart, account, tariffValue);
                    List<String> servicesWaterProcessed = new ArrayList<>();
                    for (ServiceEntity serviceWater : servicesWater) {
                        String serviceWaterId = serviceWater.getId();
                        if (!servicesWaterProcessed.contains(serviceWaterId)) {
                            normValue += calculationService.getNormValueForPeriod(periodStart, serviceWater);
                            servicesWaterProcessed.add(serviceWaterId);
                        }
                    }
                } else {
                    normValue = calculationService.getNormValueForPeriod(periodStart, service);
                }
                Double consumptionIndividual = 0D;
                List<AccountMeterEntity> accountMeters = calculationService.getListForPeriod(periodStart, account.getMeters());
                for (AccountMeterEntity accountMeter : accountMeters) {
                    MeterEntity meter = accountMeter.getMeter();
                    ServiceEntity meterService = meter.getService();
                    if (meterService.getId().equals(serviceId)) {
                        List<MeterValueEntity> meterValues = calculationService.getMeterValuesForPeriod(meter, periodStart);
                        for (MeterValueEntity meterValue : meterValues) {
                            consumptionIndividual += meterValue.getConsumption();
                        }
                    }
                }
                Double consumptionIndividualTotal = accountAccrualRepository.getSumConsumptionByServiceIdAndBuildingIdAndWorkingPeriodId(serviceId, building.getId(), periodStartId);
                Map<String, ? super Object> row = new HashMap<>();
                row.put("serviceName", service.getName());
                row.put("measurementUnitName", measurementUnit.getName());
                row.put("consumptionNormIndividual", normValue);
                row.put("consumptionNormCommon", 0D);
                row.put("consumptionIndividual", consumptionIndividual);
                row.put("consumptionCommon", 0D);
                row.put("consumptionIndividualTotal", calculationService.roundHalfUp(consumptionIndividualTotal));
                row.put("consumptionCommonTotal", 0D);
                section4DataMap.add(row);
                servicesProcessed.add(serviceId);
            }
        }
        if (section4DataMap.isEmpty()) {
            Map<String, ? super Object> row = new HashMap<>();
            row.put("serviceName", "");
            row.put("measurementUnitName", "");
            row.put("consumptionNormIndividual", null);
            row.put("consumptionNormCommon", null);
            row.put("consumptionIndividual", null);
            row.put("consumptionCommon", null);
            row.put("consumptionIndividualTotal", null);
            row.put("consumptionCommonTotal", null);
            section4DataMap.add(row);
        }
        JRMapCollectionDataSource section4DataSource = new JRMapCollectionDataSource(section4DataMap);

        // section 5
        List<Map<String, ?>> section5DataMap = new ArrayList<>();
        List<AccountRecalculationEntity> accountRecalculations = accountRecalculationRepository.getByAccountIdAndPeriod(accountId, periodStart.getDateStart(), periodEnd.getDateStart());
        for (AccountRecalculationEntity accountRecalculation : accountRecalculations) {
            Map<String, ? super Object> row = new HashMap<>();
            row.put("serviceName", accountRecalculation.getAccountService().getService().getName());
            row.put("workingPeriod", accountRecalculation.getWorkingPeriod().getName());
            row.put("forWorkingPeriod", accountRecalculation.getForWorkingPeriod().getName());
            row.put("sum", accountRecalculation.getValue());
            row.put("note", accountRecalculation.getNote());
            section5DataMap.add(row);
        }
        if (section5DataMap.isEmpty()) {
            Map<String, ? super Object> row = new HashMap<>();
            row.put("serviceName", "");
            row.put("workingPeriod", "");
            row.put("forWorkingPeriod", "");
            row.put("sum", null);
            row.put("note", "");
            section5DataMap.add(row);
        }
        JRMapCollectionDataSource section5DataSource = new JRMapCollectionDataSource(section5DataMap);

        try {
            JasperReport mainReport = getJasperReport(Constants.Report.UNIVERSAL_PAYMENT_DOCUMENT);
            JasperReport subReportSection3 = getJasperReport(Constants.Report.UNIVERSAL_PAYMENT_DOCUMENT_SECTION_3);
            JasperReport subReportSection4 = getJasperReport(Constants.Report.UNIVERSAL_PAYMENT_DOCUMENT_SECTION_4);
            JasperReport subReportSection5 = getJasperReport(Constants.Report.UNIVERSAL_PAYMENT_DOCUMENT_SECTION_5);

            parameters.put("subReportSection3", subReportSection3);
            parameters.put("subReportSection3DataSource", section3DataSource);
            parameters.put("subReportSection4", subReportSection4);
            parameters.put("subReportSection4DataSource", section4DataSource);
            parameters.put("subReportSection5", subReportSection5);
            parameters.put("subReportSection5DataSource", section5DataSource);

            JasperPrint jasperPrint = JasperFillManager.fillReport(mainReport, parameters, new JREmptyDataSource());
            String reportNameDownload = "UPD_" + account.getAccountNumber() + "_" + LocalDateTime.now().toString();
            exportReportToPdfStream(reportNameDownload, jasperPrint, response);
        } catch (JRException e) {
            log.error(e.getMessage(), e);
        }
    }
}
