package rent.api.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import rent.common.entity.*;
import rent.common.enums.*;
import rent.common.repository.*;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.annotation.PostConstruct;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.concurrent.TimeUnit;

@Service
public class DatabasePopulationService {
    private final Logger log = LoggerFactory.getLogger(getClass());

    private final String appLocale;
    private final Boolean appCreateTestData;
    private final LocalDate appDefaultFirstPeriod;
    private final Integer appCreateTestPeriodsCount;
    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final StreetTypeRepository streetTypeRepository;
    private final CalculationTypeRepository calculationTypeRepository;
    private final MeasurementUnitRepository measurementUnitRepository;
    private final ParameterTypeRepository parameterTypeRepository;
    private final GenderTypeRepository genderTypeRepository;
    private final DocumentTypeRepository documentTypeRepository;
    private final RegistrationTypeRepository registrationTypeRepository;
    private final MeterTypeRepository meterTypeRepository;
    private final ServiceTypeRepository serviceTypeRepository;
    private final ContractorTypeRepository contractorTypeRepository;
    private final StreetRepository streetRepository;
    private final BuildingRepository buildingRepository;
    private final ApartmentRepository apartmentRepository;
    private final ServiceRepository serviceRepository;
    private final TariffRepository tariffRepository;
    private final WorkingPeriodRepository workingPeriodRepository;
    private final ContractorRepository contractorRepository;
    private final AccountRepository accountRepository;
    private final CitizenRepository citizenRepository;
    private final MeterRepository meterRepository;
    private final NormRepository normRepository;
    private final CalculationService calculationService;
    private final SystemPropertyService systemPropertyService;

    @Autowired
    public DatabasePopulationService(@Value("${app.locale}") String appLocale,
                                     @Value("${app.createTestData}") Boolean appCreateTestData,
                                     @Value("${app.default.firstPeriod}") String appDefaultFirstPeriod,
                                     @Value("${app.createTestPeriodsCount}") Integer appCreateTestPeriodsCount,
                                     RoleRepository roleRepository,
                                     UserRepository userRepository,
                                     PasswordEncoder passwordEncoder,
                                     StreetTypeRepository streetTypeRepository,
                                     CalculationTypeRepository calculationTypeRepository,
                                     MeasurementUnitRepository measurementUnitRepository,
                                     ParameterTypeRepository parameterTypeRepository,
                                     GenderTypeRepository genderTypeRepository,
                                     DocumentTypeRepository documentTypeRepository,
                                     RegistrationTypeRepository registrationTypeRepository,
                                     MeterTypeRepository meterTypeRepository,
                                     ServiceTypeRepository serviceTypeRepository,
                                     ContractorTypeRepository contractorTypeRepository,
                                     StreetRepository streetRepository,
                                     BuildingRepository buildingRepository,
                                     ApartmentRepository apartmentRepository,
                                     ServiceRepository serviceRepository,
                                     TariffRepository tariffRepository,
                                     WorkingPeriodRepository workingPeriodRepository,
                                     ContractorRepository contractorRepository,
                                     AccountRepository accountRepository,
                                     CitizenRepository citizenRepository,
                                     MeterRepository meterRepository,
                                     NormRepository normRepository,
                                     CalculationService calculationService,
                                     SystemPropertyService systemPropertyService) {
        this.appLocale = appLocale;
        this.appCreateTestData = appCreateTestData;
        this.appDefaultFirstPeriod = LocalDate.parse(appDefaultFirstPeriod);
        this.appCreateTestPeriodsCount = appCreateTestPeriodsCount;
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.streetTypeRepository = streetTypeRepository;
        this.calculationTypeRepository = calculationTypeRepository;
        this.measurementUnitRepository = measurementUnitRepository;
        this.parameterTypeRepository = parameterTypeRepository;
        this.genderTypeRepository = genderTypeRepository;
        this.documentTypeRepository = documentTypeRepository;
        this.registrationTypeRepository = registrationTypeRepository;
        this.meterTypeRepository = meterTypeRepository;
        this.serviceTypeRepository = serviceTypeRepository;
        this.contractorTypeRepository = contractorTypeRepository;
        this.streetRepository = streetRepository;
        this.buildingRepository = buildingRepository;
        this.apartmentRepository = apartmentRepository;
        this.serviceRepository = serviceRepository;
        this.tariffRepository = tariffRepository;
        this.workingPeriodRepository = workingPeriodRepository;
        this.contractorRepository = contractorRepository;
        this.accountRepository = accountRepository;
        this.citizenRepository = citizenRepository;
        this.meterRepository = meterRepository;
        this.normRepository = normRepository;
        this.calculationService = calculationService;
        this.systemPropertyService = systemPropertyService;
    }

    @PostConstruct
    private void init() {
        log.info("Start population database");

        createRoles();
        createUsers();
        createParameterTypes();
        createCalculationTypes();
        createMeasurementUnits();
        createGenderTypes();
        createDocumentTypes();
        createRegistrationTypes();
        createMeterTypes();
        createStreetTypes();
        createServiceTypes();
        createContractorTypes();
        createWorkingPeriods();
        createSystemProperties();

        // for testing
        createTestData();

        log.info("Finished population database");
    }

    private void createRoles() {
        createRole(RoleType.ADMIN.getName());
        createRole(RoleType.USER.getName());
    }

    private void createRole(String name) {
        RoleEntity role = roleRepository.findByName(name);
        if (role == null) {
            log.info("createRole({})", name);
            role = new RoleEntity();
            role.setName(name);
            roleRepository.save(role);
        }
    }

    private void createUsers() {
        RoleEntity roleAdmin = roleRepository.findByName(RoleType.ADMIN.getName());
        createUser("admin", "admin", roleAdmin);
        RoleEntity roleUser = roleRepository.findByName(RoleType.USER.getName());
        createUser("user", "user", roleUser);
    }

    private void createUser(String login, String password, RoleEntity role) {
        UserEntity user = userRepository.findByLogin(login);
        if (user == null) {
            log.info("createUsers({})", login);
            user = new UserEntity();
            user.setBlocked(false);
            user.setLogin(login);
            user.setPassword(passwordEncoder.encode(password));
            user.setRole(role);
            userRepository.save(user);
        }
    }

    private void createParameterTypes() {
        createParameterType(ParameterType.TOTAL_AREA.getCode(), "Общая площадь");
        createParameterType(ParameterType.PHONE_NUMBER.getCode(), "Номер телефона");
    }

    private void createParameterType(String code, String name) {
        ParameterTypeEntity parameterType = parameterTypeRepository.findByCode(code);
        if (parameterType == null) {
            log.info("createParameterType({}, {})", code, name);
            parameterType = new ParameterTypeEntity();
            parameterType.setCode(code);
            parameterType.setName(name);
            parameterType.setNameOrigin(name);
            parameterTypeRepository.save(parameterType);
        }
    }

    private void createCalculationTypes() {
        createCalculationType(CalculationType.TOTAL_AREA.getCode(), "По общей площади");
        createCalculationType(CalculationType.PEOPLES.getCode(), "По прописанным");
        createCalculationType(CalculationType.METER_READING.getCode(), "По показаниям счетчика");
        createCalculationType(CalculationType.METER_READING_WATER.getCode(), "По показаниям счетчика (водоотведение)");
    }

    private void createCalculationType(String code, String name) {
        CalculationTypeEntity calculationType = calculationTypeRepository.findByCode(code);
        if (calculationType == null) {
            log.info("createCalculationType({}, {})", code, name);
            calculationType = new CalculationTypeEntity();
            calculationType.setCode(code);
            calculationType.setName(name);
            calculationType.setNameOrigin(name);
            calculationTypeRepository.save(calculationType);
        }
    }

    private void createMeasurementUnits() {
        if (measurementUnitRepository.count() == 0) {
            log.info("createMeasurementUnits()");
            createMeasurementUnit("кв. м");
            createMeasurementUnit("куб. м");
            createMeasurementUnit("кВт*ч");
            createMeasurementUnit("гкал");
            createMeasurementUnit("руб");
        }
    }

    private void createMeasurementUnit(String name) {
        MeasurementUnitEntity measurementUnit = new MeasurementUnitEntity();
        measurementUnit.setName(name);
        measurementUnitRepository.save(measurementUnit);
    }

    private void createGenderTypes() {
        if (genderTypeRepository.count() == 0) {
            log.info("createGenderTypes()");
            createGenderType("Мужской");
            createGenderType("Женский");
        }
    }

    private void createGenderType(String name) {
        GenderTypeEntity genderType = new GenderTypeEntity();
        genderType.setName(name);
        genderType.setNameOrigin(name);
        genderTypeRepository.save(genderType);
    }

    private void createDocumentTypes() {
        if (documentTypeRepository.count() == 0) {
            log.info("createDocumentTypes()");
            createDocumentType("Паспорт");
            createDocumentType("Свидетельство о рождении");
            createDocumentType("Свидетельство права собственности");
            createDocumentType("Договор купли продажи");
            createDocumentType("Договор дарения");
        }
    }

    private void createDocumentType(String name) {
        DocumentTypeEntity documentType = new DocumentTypeEntity();
        documentType.setName(name);
        documentTypeRepository.save(documentType);
    }

    private void createRegistrationTypes() {
        if (registrationTypeRepository.count() == 0) {
            log.info("createRegistrationTypes()");
            createRegistrationType("Временная");
            createRegistrationType("Постоянная");
        }
    }

    private void createRegistrationType(String name) {
        RegistrationTypeEntity registrationType = new RegistrationTypeEntity();
        registrationType.setName(name);
        registrationTypeRepository.save(registrationType);
    }

    private void createMeterTypes() {
        createMeterType(MeterType.INDIVIDUAL.getCode(), "Индивидуальный");
        createMeterType(MeterType.COMMON_HOUSE.getCode(), "Общедомовой");
    }

    private void createMeterType(String code, String name) {
        MeterTypeEntity meterType = meterTypeRepository.findByCode(code);
        if (meterType == null) {
            log.info("createMeterType({}, {})", code, name);
            meterType = new MeterTypeEntity();
            meterType.setCode(code);
            meterType.setName(name);
            meterType.setNameOrigin(name);
            meterTypeRepository.save(meterType);
        }
    }

    private void createStreetTypes() {
        if (streetTypeRepository.count() == 0) {
            log.info("createStreetTypes()");
            createStreetType("Улица", "ул.");
            createStreetType("Бульвар", "б-р");
            createStreetType("Переулок", "пер.");
            createStreetType("Площадь", "пл.");
            createStreetType("Проспект", "пр-кт");
            createStreetType("Микрорайон", "мкр.");
        }
    }

    private void createStreetType(String name, String nameShort) {
        StreetTypeEntity streetType = new StreetTypeEntity();
        streetType.setName(name);
        streetType.setNameShort(nameShort);
        streetTypeRepository.save(streetType);
    }

    private void createServiceTypes() {
        if (serviceTypeRepository.count() == 0) {
            log.info("createServiceTypes()");
            createServiceType("Жилищьная");
            createServiceType("Коммунальня");
        }
    }

    private void createServiceType(String name) {
        ServiceTypeEntity serviceType = new ServiceTypeEntity();
        serviceType.setName(name);
        serviceTypeRepository.save(serviceType);
    }

    private void createContractorTypes() {
        if (contractorTypeRepository.count() == 0) {
            log.info("createContractorTypes()");
            createContractorType("Управляющая компания", "УК");
        }
    }

    private void createContractorType(String name, String nameShort) {
        ContractorTypeEntity contractorType = new ContractorTypeEntity();
        contractorType.setName(name);
        contractorType.setNameShort(nameShort);
        contractorTypeRepository.save(contractorType);
    }

    private void createWorkingPeriods() {
        if (workingPeriodRepository.count() == 0) {
            log.info("createWorkingPeriods()");
            LocalDate dateStart = appDefaultFirstPeriod.withDayOfMonth(1);
            LocalDate dateEnd = appDefaultFirstPeriod.withDayOfMonth(appDefaultFirstPeriod.lengthOfMonth());
            createWorkingPeriod(dateStart, dateEnd);
        }
    }

    private void createWorkingPeriod(LocalDate dateStart, LocalDate dateEnd) {
        WorkingPeriodEntity workingPeriod = new WorkingPeriodEntity();
        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("LLLL yyyy", Locale.forLanguageTag(appLocale));
        workingPeriod.setName(dateStart.format(dateTimeFormatter));
        workingPeriod.setDateStart(dateStart);
        workingPeriod.setDateEnd(dateEnd);
        workingPeriodRepository.save(workingPeriod);
    }

    private void createSystemProperties() {
        if (systemPropertyService.getCount() == 0) {
            log.info("createSystemProperties()");
            createSystemProperty(SystemPropertyType.CALCULATION_IS_ACTIVE.getName(), "0");
            createSystemProperty(SystemPropertyType.CALCULATION_ACCOUNTS_COUNT.getName(), "0");
            createSystemProperty(SystemPropertyType.CALCULATION_ACCOUNTS_CALCULATED.getName(), "0");
        }
    }

    private void createSystemProperty(String name, String value) {
        SystemPropertyEntity systemProperty = new SystemPropertyEntity();
        systemProperty.setName(name);
        systemProperty.setValue(value);
        systemPropertyService.save(systemProperty);
    }

    /**
     * Testing data
     */
    private void createTestData() {
        if (appCreateTestData) {
            log.info("createTestData()");
            createStreets();
            createBuildings();
            createApartments();
            createServices();
            createTariffs();
            createNorms();
            createContractors();
            createAccounts();
            createTestAccount1();
            createTestAccount2();
            createTestAccount3();
            createTestWorkingPeriods();
        }
    }

    private void createStreets() {
        if (streetRepository.count() == 0) {
            log.info("createStreets()");
            StreetTypeEntity streetTypeStreet = streetTypeRepository.findByNameContainingOrderByName("Улица").get(0);
            StreetTypeEntity streetTypeMicroDistrict = streetTypeRepository.findByNameContainingOrderByName("Микрорайон").get(0);
            createStreet(streetTypeMicroDistrict, "Космонавтов");
            createStreet(streetTypeMicroDistrict, "Звездный");
            createStreet(streetTypeStreet, "Первых строителей");
            createStreet(streetTypeStreet, "Солнечная");
        }
    }

    private void createStreet(StreetTypeEntity streetType, String name) {
        StreetEntity street = new StreetEntity();
        street.setStreetType(streetType);
        street.setName(name);
        streetRepository.save(street);
    }

    private void createBuildings() {
        if (buildingRepository.count() == 0) {
            log.info("createBuildings()");
            StreetEntity street1 = streetRepository.findByNameContainingOrderByName("Космонавтов").get(0);
            StreetEntity street2 = streetRepository.findByNameContainingOrderByName("Звездный").get(0);
            createBuilding(street1, "1", 1);
            createBuilding(street1, "2", 2);
            createBuilding(street1, "3", 3);
            createBuilding(street1, "5", 5);
            createBuilding(street2, "6", 6);
            createBuilding(street2, "7", 7);
            createBuilding(street2, "8", 8);
            createBuilding(street2, "9", 9);
            createBuilding(street2, "10", 10);
            createBuilding(street2, "11", 11);
        }
    }

    private void createBuilding(StreetEntity street, String house, Integer houseNumber) {
        BuildingEntity building = new BuildingEntity();
        building.setHouse(house);
        building.setHouseNumber(houseNumber);
        building.setHousing("");
        building.setStreet(street);
        buildingRepository.save(building);
    }

    private void createApartments() {
        if (apartmentRepository.count() == 0) {
            log.info("createApartments()");
            List<BuildingEntity> buildings = buildingRepository.findAll();
            int apartmentsCount = 0;
            for (BuildingEntity building : buildings) {
                switch (building.getHouseNumber()) {
                    case 1:
                    case 6:
                        apartmentsCount = 90;
                        break;
                    case 2:
                        apartmentsCount = 70;
                        break;
                    case 3:
                    case 10:
                        apartmentsCount = 60;
                        break;
                    case 7:
                    case 8:
                    case 9:
                    case 11:
                    case 5:
                        apartmentsCount = 40;
                        break;
                }
                int apartmentIndex = 0;
                int apartmentIndexFloor = 0;
                int apartmentAreaIndex = 1;
                int apartmentEntrance = 1;
                int apartmentFloor = 1;
                int apartmentRoomsNumber = 0;
                Double apartmentArea = 0D;
                for (int i = 0; i < apartmentsCount; i++) {
                    if (apartmentIndex == 20) {
                        apartmentIndex = 0;
                        apartmentIndexFloor = 0;
                        apartmentEntrance++;
                        apartmentFloor = 1;
                        apartmentAreaIndex = 1;
                    }
                    apartmentIndex++;
                    if (apartmentIndexFloor == 4) {
                        apartmentIndexFloor = 0;
                        apartmentFloor++;
                    }
                    apartmentIndexFloor++;

                    switch (apartmentAreaIndex) {
                        case 1:
                            apartmentAreaIndex = 2;
                            apartmentArea = 63.5D;
                            apartmentRoomsNumber = 3;
                            break;
                        case 2:
                            apartmentAreaIndex = 3;
                            apartmentArea = 43.5D;
                            apartmentRoomsNumber = 2;
                            break;
                        case 3:
                            apartmentAreaIndex = 4;
                            apartmentArea = 32.5D;
                            apartmentRoomsNumber = 1;
                            break;
                        case 4:
                            apartmentAreaIndex = 1;
                            apartmentArea = 65.5D;
                            apartmentRoomsNumber = 3;
                            break;
                    }
                    createApartment(building, String.valueOf(i + 1), i + 1, apartmentEntrance, apartmentFloor, apartmentArea, apartmentRoomsNumber);
                }
            }
        }
    }

    private void createApartment(BuildingEntity building, String apartment, Integer apartmentNumber, Integer entrance, Integer floor, Double area, Integer roomsNumber) {
        ApartmentEntity apartmentEntity = new ApartmentEntity();
        apartmentEntity.setBuilding(building);
        apartmentEntity.setEntrance(entrance);
        apartmentEntity.setFloor(floor);
        apartmentEntity.setApartment(apartment);
        apartmentEntity.setApartmentNumber(apartmentNumber);
        apartmentEntity.setApartmentLetter("");
        apartmentEntity.setTotalArea(area);
        apartmentEntity.setLivingArea(area);
        apartmentEntity.setRoomsNumber(roomsNumber);
        apartmentRepository.save(apartmentEntity);
    }

    private void createServices() {
        if (serviceRepository.count() == 0) {
            log.info("createServices()");
            ServiceTypeEntity serviceType = serviceTypeRepository.findByNameContainingOrderByName("Жилищьная").get(0);
            createService(serviceType, "Текущий ремонт");
            createService(serviceType, "Содержание жилья");
            createService(serviceType, "Отопление");
            createService(serviceType, "Холодная вода");
            createService(serviceType, "Горячая вода");
            createService(serviceType, "Водоотведение");
        }
    }

    private void createService(ServiceTypeEntity serviceType, String name) {
        ServiceEntity service = new ServiceEntity();
        service.setServiceType(serviceType);
        service.setName(name);
        serviceRepository.save(service);
    }

    private WorkingPeriodEntity getFirstWorkingPeriod() {
        return workingPeriodRepository.getFirstByIdIsNotNullOrderByDateStartDesc();
    }

    private void createTariffs() {
        if (tariffRepository.count() == 0) {
            log.info("createTariffs()");
            List<ServiceEntity> services = serviceRepository.findByNameContainingOrderByName("");

            CalculationTypeEntity calculationTypeTotalArea = calculationTypeRepository.findByCode(CalculationType.TOTAL_AREA.getCode());
            CalculationTypeEntity calculationTypeMeterReading = calculationTypeRepository.findByCode(CalculationType.METER_READING.getCode());
            CalculationTypeEntity calculationTypeMeterReadingWater = calculationTypeRepository.findByCode(CalculationType.METER_READING_WATER.getCode());

            MeasurementUnitEntity measurementUnitArea = measurementUnitRepository.findByNameContainingOrderByName("кв. м").get(0);
            MeasurementUnitEntity measurementUnitWater = measurementUnitRepository.findByNameContainingOrderByName("куб. м").get(0);

            LocalDate dateStart = getFirstWorkingPeriod().getDateStart();

            for (ServiceEntity service : services) {
                if (service.getName().contains("Содержание жилья")) {
                    createTariff(dateStart, calculationTypeTotalArea, measurementUnitArea, 22.5D, service);
                } else if (service.getName().contains("Текущий ремонт")) {
                    createTariff(dateStart, calculationTypeTotalArea, measurementUnitArea, 2.5D, service);
                } else if (service.getName().contains("Отопление")) {
                    createTariff(dateStart, calculationTypeTotalArea, measurementUnitArea, 30.5D, service);
                } else if (service.getName().contains("Холодная вода")) {
                    createTariff(dateStart, calculationTypeMeterReading, measurementUnitWater, 8.5D, service);
                } else if (service.getName().contains("Горячая вода")) {
                    createTariff(dateStart, calculationTypeMeterReading, measurementUnitWater, 40.5D, service);
                } else if (service.getName().contains("Водоотведение")) {
                    createTariff(dateStart, calculationTypeMeterReadingWater, measurementUnitWater, 7.25D, service);
                }
            }
        }
    }

    private void createTariff(LocalDate dateStart, CalculationTypeEntity calculationType, MeasurementUnitEntity measurementUnit,
                              Double value, ServiceEntity service) {
        TariffValueEntity tariffValue = new TariffValueEntity();
        tariffValue.setCalculationType(calculationType);
        tariffValue.setDateStart(dateStart);
        tariffValue.setMeasurementUnit(measurementUnit);
        tariffValue.setValue(value);

        TariffEntity tariff = new TariffEntity();
        tariff.setService(service);
        tariff.setName(String.format("Тариф ну услугу <%s>", service.getName()));
        tariff.setValues(Collections.singletonList(tariffValue));
        tariffRepository.save(tariff);
    }

    private void createNorms() {
        if (normRepository.count() == 0) {
            log.info("createNorms()");
            List<ServiceEntity> services = serviceRepository.findByNameContainingOrderByName("");
            MeasurementUnitEntity measurementUnitWater = measurementUnitRepository.findByNameContainingOrderByName("куб. м").get(0);
            LocalDate dateStart = getFirstWorkingPeriod().getDateStart();
            for (ServiceEntity service : services) {
                if (service.getName().contains("Холодная вода")) {
                    createNorm(dateStart, measurementUnitWater, 7.5D, service);
                } else if (service.getName().contains("Горячая вода")) {
                    createNorm(dateStart, measurementUnitWater, 4.5D, service);
                }
            }
        }
    }

    private void createNorm(LocalDate dateStart, MeasurementUnitEntity measurementUnit, Double value, ServiceEntity service) {
        NormEntity norm = new NormEntity();
        norm.setName(String.format("Норматив на услугу <%s>", service.getName()));
        norm.setService(service);

        NormValueEntity normValue = new NormValueEntity();
        normValue.setMeasurementUnit(measurementUnit);
        normValue.setDateStart(dateStart);
        normValue.setValue(value);

        norm.setValues(Collections.singletonList(normValue));
        normRepository.save(norm);
    }

    private void createContractors() {
        if (contractorRepository.count() == 0) {
            log.info("createContractors()");
            ContractorTypeEntity contractorType = contractorTypeRepository.findByNameContainingOrderByName("Управляющая компания").get(0);
            ContractorEntity contractor = new ContractorEntity();
            contractor.setContractorType(contractorType);
            contractor.setFullName("Общество с ограниченной ответственностью «Перспектива»");
            contractor.setName("ООО «Перспектива»");
            contractor.setInn("3834013517");
            contractor.setKpp("383401001");
            contractor.setOgrn("1083847000445");
            contractor.setMailingAddress("665699, Российская Федерация, Иркутская область, Нижнеилимский район, поселок Янгель микрорайон Звездный, дом 2 кв. 21");
            contractor.setLegalAddress("665699, Российская Федерация, Иркутская область, Нижнеилимский район, поселок Янгель микрорайон Звездный, дом 2 кв. 21");
            contractor.setEmail("-");
            contractor.setPhone("+7 (395) 6667141");
            contractor.setFax("+7 (395) 6667141");
            contractor.setWebSite("перспектива-янгель.рф");
            contractor.setBankName("-");
            contractor.setBankAddress("-");
            contractor.setSettlementAccount("-");
            contractor.setCorrespondentAccount("-");
            contractor.setBankIdentificationCode("-");
            contractorRepository.save(contractor);
        }
    }

    private void createAccounts() {
        if (accountRepository.count() == 0) {
            log.info("createAccounts()");
            List<ApartmentEntity> apartments = apartmentRepository.findAll();
            ContractorEntity contractor = contractorRepository.findByNameContainingOrderByName("ООО «Перспектива»").get(0);
            ParameterTypeEntity parameterTypeTotalArea = parameterTypeRepository.findByCode(ParameterType.TOTAL_AREA.getCode());
            ParameterTypeEntity parameterTypePhoneNumber = parameterTypeRepository.findByCode(ParameterType.PHONE_NUMBER.getCode());
            int index = 0;
            WorkingPeriodEntity workingPeriod = getFirstWorkingPeriod();
            LocalDate dateStart = workingPeriod.getDateStart();
            LocalDate dateEnd = workingPeriod.getDateEnd();
            List<ServiceEntity> services = serviceRepository.findByNameContainingOrderByName("");
            List<TariffEntity> tariffs = tariffRepository.findByNameContainingOrderByName("");
            List<GenderTypeEntity> genderTypes = genderTypeRepository.findByNameContainingOrderByName("");
            List<DocumentTypeEntity> documentTypes = documentTypeRepository.findByNameContainingOrderByName("");
            RegistrationTypeEntity registrationType = registrationTypeRepository.findByNameContainingOrderByName("Постоянная").get(0);
            MeterTypeEntity meterType = meterTypeRepository.findByCode(MeterType.INDIVIDUAL.getCode());
            Random random = new Random();
            for (ApartmentEntity apartment : apartments) {
                index++;
                createAccount(index, random, dateStart, dateEnd, contractor,
                        apartment, parameterTypeTotalArea, parameterTypePhoneNumber,
                        services, tariffs, genderTypes, documentTypes, registrationType, meterType);
            }
        }
    }

    private AccountEntity createAccount(int index, Random random, LocalDate dateStart, LocalDate dateEnd, ContractorEntity contractor, ApartmentEntity apartment,
                                        ParameterTypeEntity parameterTypeTotalArea, ParameterTypeEntity parameterTypePhoneNumber,
                                        List<ServiceEntity> services, List<TariffEntity> tariffs, List<GenderTypeEntity> genderTypes,
                                        List<DocumentTypeEntity> documentTypes, RegistrationTypeEntity registrationType,
                                        MeterTypeEntity meterType) {
        AccountEntity account = new AccountEntity();
        String accountNumber = "";
        if (index < 10) {
            accountNumber += "00000";
        } else if (index < 100) {
            accountNumber += "0000";
        } else if (index < 1000) {
            accountNumber += "000";
        } else if (index < 10000) {
            accountNumber += "00";
        } else if (index < 100000) {
            accountNumber += "0";
        }
        accountNumber += String.valueOf(index);
        account.setAccountNumber(accountNumber);
        account.setDateOpen(dateStart);
        account.setContractor(contractor);
        account.setApartment(apartment);

        List<AccountParameterEntity> accountParameters = new ArrayList<>();
        accountParameters.add(createAccountParameter(parameterTypeTotalArea, dateStart, String.valueOf(apartment.getTotalArea())));
        StringBuilder phoneNumber = new StringBuilder("8924");
        while (phoneNumber.length() < 11) {
            phoneNumber.append(String.valueOf(random.nextInt(10)));
        }
        accountParameters.add(createAccountParameter(parameterTypePhoneNumber, dateStart, phoneNumber.toString()));
        account.setParameters(accountParameters);

        List<AccountServiceEntity> accountServices = createAccountServices(services, tariffs, dateStart, null);
        account.setServices(accountServices);

        List<AccountRegisteredEntity> accountRegistered = new ArrayList<>();
        accountRegistered.add(createAccountRegistered(random, 25, dateStart, genderTypes, documentTypes, registrationType));
        if (apartment.getRoomsNumber() == 3) {
            accountRegistered.add(createAccountRegistered(random, 25, dateStart, genderTypes, documentTypes, registrationType));
            accountRegistered.add(createAccountRegistered(random, 5, dateStart, genderTypes, documentTypes, registrationType));
            accountRegistered.add(createAccountRegistered(random, 3, dateStart, genderTypes, documentTypes, registrationType));
        } else if (apartment.getRoomsNumber() == 2) {
            accountRegistered.add(createAccountRegistered(random, 25, dateStart, genderTypes, documentTypes, registrationType));
            accountRegistered.add(createAccountRegistered(random, 3, dateStart, genderTypes, documentTypes, registrationType));
        } else if (apartment.getRoomsNumber() == 1) {
            accountRegistered.add(createAccountRegistered(random, 25, dateStart, genderTypes, documentTypes, registrationType));
        }
        account.setRegistered(accountRegistered);

        List<AccountOwnerEntity> accountOwners = new ArrayList<>();
        accountOwners.add(createAccountOwner(dateStart, documentTypes, accountRegistered.get(0).getCitizen()));
        if (apartment.getRoomsNumber() == 3) {
            accountOwners.add(createAccountOwner(dateStart, documentTypes, accountRegistered.get(1).getCitizen()));
        }
        account.setOwners(accountOwners);

        List<AccountMeterEntity> accountMeters = new ArrayList<>();
        accountMeters.add(createAccountMeter(random, dateStart, dateEnd, meterType, getServiceByName(services, "Холодная вода")));
        accountMeters.add(createAccountMeter(random, dateStart, dateEnd, meterType, getServiceByName(services, "Горячая вода")));
        account.setMeters(accountMeters);

        accountRepository.save(account);
        return account;
    }

    private List<AccountServiceEntity> createAccountServices(List<ServiceEntity> services, List<TariffEntity> tariffs, LocalDate dateStart, LocalDate dateEnd) {
        List<AccountServiceEntity> accountServices = new ArrayList<>();
        for (ServiceEntity service : services) {
            AccountServiceEntity accountService = new AccountServiceEntity();
            accountService.setService(service);
            accountService.setDateStart(dateStart);
            accountService.setDateEnd(dateEnd);
            for (TariffEntity tariff : tariffs) {
                if (tariff.getService().getId().equals(service.getId())) {
                    accountService.setTariff(tariff);
                    break;
                }
            }
            accountServices.add(accountService);
        }
        return accountServices;
    }

    private DocumentTypeEntity getDocumentTypeByName(List<DocumentTypeEntity> documentTypes, String name) {
        DocumentTypeEntity documentType = null;
        for (DocumentTypeEntity docType : documentTypes) {
            if (docType.getName().contains(name)) {
                documentType = docType;
                break;
            }
        }
        return documentType;
    }

    private AccountParameterEntity createAccountParameter(ParameterTypeEntity parameterType, LocalDate dateStart, String value) {
        AccountParameterEntity accountParameter = new AccountParameterEntity();
        accountParameter.setParameterType(parameterType);
        accountParameter.setValue(value);
        accountParameter.setDateStart(dateStart);
        return accountParameter;
    }

    private AccountOwnerEntity createAccountOwner(LocalDate dateStart, List<DocumentTypeEntity> documentTypes, CitizenEntity citizen) {
        AccountOwnerEntity accountOwner = new AccountOwnerEntity();
        accountOwner.setCitizen(citizen);
        accountOwner.setDocumentType(getDocumentTypeByName(documentTypes, "Свидетельство права собственности"));
        accountOwner.setDocumentSeries("-");
        accountOwner.setDocumentNumber("-");
        accountOwner.setDocumentIssuingAuthority("-");
        accountOwner.setDocumentDateIssue(dateStart);
        accountOwner.setDateStart(dateStart);
        accountOwner.setDocumentAttachments(Collections.emptyList());
        return accountOwner;
    }

    private AccountRegisteredEntity createAccountRegistered(Random random, int years, LocalDate dateStart, List<GenderTypeEntity> genderTypes,
                                                            List<DocumentTypeEntity> documentTypes, RegistrationTypeEntity registrationType) {
        AccountRegisteredEntity accountRegistered = new AccountRegisteredEntity();
        accountRegistered.setCitizen(createCitizen(random, dateStart, dateStart.minusYears(years), genderTypes, getDocumentTypeByName(documentTypes, "Паспорт")));
        accountRegistered.setRegistrationType(registrationType);
        accountRegistered.setDateStart(dateStart);
        accountRegistered.setDocumentAttachments(Collections.emptyList());
        return accountRegistered;
    }

    private CitizenEntity createCitizen(Random random, LocalDate dateStart, LocalDate birthday, List<GenderTypeEntity> genderTypes,
                                        DocumentTypeEntity documentType) {
        CitizenEntity citizen = new CitizenEntity();
        citizen.setGenderType(genderTypes.get(random.nextInt(2) > 0 ? 1 : 0));
        citizen.setBirthday(birthday);
        StringBuilder name = new StringBuilder("");
        while (name.length() < 8) {
            name.append(String.valueOf(random.nextInt(10)));
        }
        citizen.setFirstName(name.toString());
        citizen.setLastName(name.toString());
        citizen.setFatherName(name.toString());
        CitizenDocumentEntity citizenDocument = new CitizenDocumentEntity();
        citizenDocument.setDocumentType(documentType);
        citizenDocument.setDocumentSeries("-");
        citizenDocument.setDocumentNumber("-");
        citizenDocument.setDocumentIssuingAuthority("-");
        citizenDocument.setDocumentDateIssue(dateStart);
        citizenDocument.setDateStart(dateStart);
        citizenDocument.setDocumentAttachments(Collections.emptyList());

        citizen.setDocuments(Collections.singletonList(citizenDocument));
        citizenRepository.save(citizen);
        return citizen;
    }

    private ServiceEntity getServiceByName(List<ServiceEntity> services, String name) {
        ServiceEntity service = null;
        for (ServiceEntity obj : services) {
            if (obj.getName().contains(name)) {
                service = obj;
                break;
            }
        }
        return service;
    }

    private AccountMeterEntity createAccountMeter(Random random, LocalDate dateStart, LocalDate dateEnd, MeterTypeEntity meterType, ServiceEntity service) {
        AccountMeterEntity accountMeter = new AccountMeterEntity();
        accountMeter.setDateStart(dateStart);
        accountMeter.setMeter(createMeter(random, dateStart, dateEnd, meterType, service));
        return accountMeter;
    }

    private MeterEntity createMeter(Random random, LocalDate dateStart, LocalDate dateEnd, MeterTypeEntity meterType, ServiceEntity service) {
        MeterEntity meter = new MeterEntity();
        meter.setMeterType(meterType);

        StringBuilder name = new StringBuilder("");
        while (name.length() < 10) {
            name.append(String.valueOf(random.nextInt(10)));
        }

        meter.setName(name.toString());
        meter.setSerialNumber(name.toString());
        meter.setService(service);

        List<MeterValueEntity> meterValues = new ArrayList<>();
        Double nextVal1 = (double) random.nextInt(10) + 10;
        meterValues.add(createMeterValue(dateStart, nextVal1, 0D));
        Double nextVal2 = nextVal1 + (double) random.nextInt(10);
        meterValues.add(createMeterValue(dateEnd, nextVal2, nextVal2 - nextVal1));
        meter.setValues(meterValues);

        meterRepository.save(meter);

        return meter;
    }

    private MeterValueEntity createMeterValue(LocalDate date, Double value, Double consumption) {
        MeterValueEntity meterValue = new MeterValueEntity();
        meterValue.setDateValue(date);
        meterValue.setValue(value);
        meterValue.setConsumption(consumption);
        return meterValue;
    }

    private void createTestAccount1() {
        String testAccountNumber = "000000-test1";
        Page<AccountEntity> page = accountRepository.findByAccountNumber(testAccountNumber, new PageRequest(1, 1));
        if (page.getTotalElements() == 0) {
            log.info("createTestAccount1()");
            List<ApartmentEntity> apartments = apartmentRepository.findAll();
            ApartmentEntity apartment = apartments.get(0);
            ContractorEntity contractor = contractorRepository.findByNameContainingOrderByName("ООО «Перспектива»").get(0);
            ParameterTypeEntity parameterTypeTotalArea = parameterTypeRepository.findByCode(ParameterType.TOTAL_AREA.getCode());
            ParameterTypeEntity parameterTypePhoneNumber = parameterTypeRepository.findByCode(ParameterType.PHONE_NUMBER.getCode());
            WorkingPeriodEntity workingPeriod = getFirstWorkingPeriod();
            LocalDate dateStart = workingPeriod.getDateStart();
            LocalDate dateEnd = workingPeriod.getDateEnd();
            List<ServiceEntity> services = serviceRepository.findByNameContainingOrderByName("");
            List<TariffEntity> tariffs = tariffRepository.findByNameContainingOrderByName("");
            List<GenderTypeEntity> genderTypes = genderTypeRepository.findByNameContainingOrderByName("");
            List<DocumentTypeEntity> documentTypes = documentTypeRepository.findByNameContainingOrderByName("");
            RegistrationTypeEntity registrationType = registrationTypeRepository.findByNameContainingOrderByName("Постоянная").get(0);
            MeterTypeEntity meterType = meterTypeRepository.findByCode(MeterType.INDIVIDUAL.getCode());
            Random random = new Random();

            AccountEntity account = createAccount(0, random, dateStart, dateEnd, contractor,
                    apartment, parameterTypeTotalArea, parameterTypePhoneNumber,
                    services, tariffs, genderTypes, documentTypes, registrationType, meterType);

            account.setAccountNumber(testAccountNumber);

            List<AccountServiceEntity> accountServicesAll = new ArrayList<>();

            LocalDate dateStartCase1 = workingPeriod.getDateStart().minusMonths(1).withDayOfMonth(15);
            LocalDate dateEndCase1 = workingPeriod.getDateStart().minusMonths(1).withDayOfMonth(20);
            List<AccountServiceEntity> accountServicesCase1 = createAccountServices(services, tariffs, dateStartCase1, dateEndCase1);

            LocalDate dateStartCase2 = workingPeriod.getDateStart().minusMonths(1).withDayOfMonth(15);
            LocalDate dateEndCase2 = workingPeriod.getDateStart().withDayOfMonth(15);
            List<AccountServiceEntity> accountServicesCase2 = createAccountServices(services, tariffs, dateStartCase2, dateEndCase2);

            LocalDate dateStartCase3 = workingPeriod.getDateStart().withDayOfMonth(15);
            LocalDate dateEndCase3 = workingPeriod.getDateStart().withDayOfMonth(20);
            List<AccountServiceEntity> accountServicesCase3 = createAccountServices(services, tariffs, dateStartCase3, dateEndCase3);

            LocalDate dateStartCase4 = workingPeriod.getDateStart().withDayOfMonth(15);
            LocalDate dateEndCase4 = workingPeriod.getDateStart().plusMonths(1).withDayOfMonth(15);
            List<AccountServiceEntity> accountServicesCase4 = createAccountServices(services, tariffs, dateStartCase4, dateEndCase4);

            LocalDate dateStartCase5 = workingPeriod.getDateStart().plusMonths(1).withDayOfMonth(15);
            LocalDate dateEndCase5 = workingPeriod.getDateStart().plusMonths(1).withDayOfMonth(20);
            List<AccountServiceEntity> accountServicesCase5 = createAccountServices(services, tariffs, dateStartCase5, dateEndCase5);

            LocalDate dateStartCase6 = workingPeriod.getDateStart().plusMonths(1).withDayOfMonth(20);
            List<AccountServiceEntity> accountServicesCase6 = createAccountServices(services, tariffs, dateStartCase6, null);

            LocalDate dateStartCase7 = workingPeriod.getDateStart().minusMonths(1).withDayOfMonth(15);
            List<AccountServiceEntity> accountServicesCase7 = createAccountServices(services, tariffs, dateStartCase7, null);

            accountServicesAll.addAll(accountServicesCase1);
            accountServicesAll.addAll(accountServicesCase2);
            accountServicesAll.addAll(accountServicesCase3);
            accountServicesAll.addAll(accountServicesCase4);
            accountServicesAll.addAll(accountServicesCase5);
            accountServicesAll.addAll(accountServicesCase6);
            accountServicesAll.addAll(accountServicesCase7);
            account.setServices(accountServicesAll);

            accountRepository.save(account);
        }
    }

    private void createTestAccount2() {
        String testAccountNumber = "000000-test2";
        Page<AccountEntity> page = accountRepository.findByAccountNumber(testAccountNumber, new PageRequest(1, 1));
        if (page.getTotalElements() == 0) {
            log.info("createTestAccount2()");
            List<ApartmentEntity> apartments = apartmentRepository.findAll();
            ApartmentEntity apartment = apartments.get(0);
            ContractorEntity contractor = contractorRepository.findByNameContainingOrderByName("ООО «Перспектива»").get(0);
            ParameterTypeEntity parameterTypeTotalArea = parameterTypeRepository.findByCode(ParameterType.TOTAL_AREA.getCode());
            ParameterTypeEntity parameterTypePhoneNumber = parameterTypeRepository.findByCode(ParameterType.PHONE_NUMBER.getCode());
            WorkingPeriodEntity workingPeriod = getFirstWorkingPeriod();
            LocalDate dateStart = workingPeriod.getDateStart();
            LocalDate dateEnd = workingPeriod.getDateEnd();
            List<ServiceEntity> services = serviceRepository.findByNameContainingOrderByName("");
            List<TariffEntity> tariffs = tariffRepository.findByNameContainingOrderByName("");
            List<GenderTypeEntity> genderTypes = genderTypeRepository.findByNameContainingOrderByName("");
            List<DocumentTypeEntity> documentTypes = documentTypeRepository.findByNameContainingOrderByName("");
            RegistrationTypeEntity registrationType = registrationTypeRepository.findByNameContainingOrderByName("Постоянная").get(0);
            MeterTypeEntity meterType = meterTypeRepository.findByCode(MeterType.INDIVIDUAL.getCode());
            Random random = new Random();

            AccountEntity account = createAccount(0, random, dateStart, dateEnd, contractor,
                    apartment, parameterTypeTotalArea, parameterTypePhoneNumber,
                    services, tariffs, genderTypes, documentTypes, registrationType, meterType);

            account.setAccountNumber(testAccountNumber);

            List<AccountServiceEntity> accountServicesAll = new ArrayList<>();

            LocalDate dateStartCase1 = workingPeriod.getDateStart().plusMonths(2).withDayOfMonth(1);
            LocalDate dateEndCase1 = workingPeriod.getDateStart().plusMonths(2).withDayOfMonth(15);
            List<AccountServiceEntity> accountServicesCase1 = createAccountServices(services, tariffs, dateStartCase1, dateEndCase1);

            LocalDate dateStartCase2 = workingPeriod.getDateStart().plusMonths(2).withDayOfMonth(16);
            LocalDate dateEndCase2 = workingPeriod.getDateStart().plusMonths(2).withDayOfMonth(workingPeriod.getDateStart().plusMonths(2).lengthOfMonth());
            List<AccountServiceEntity> accountServicesCase2 = createAccountServices(services, tariffs, dateStartCase2, dateEndCase2);

            accountServicesAll.addAll(accountServicesCase1);
            accountServicesAll.addAll(accountServicesCase2);
            account.setServices(accountServicesAll);

            accountRepository.save(account);
        }
    }

    private void createTestAccount3() {
        String testAccountNumber = "000000-test3";
        Page<AccountEntity> page = accountRepository.findByAccountNumber(testAccountNumber, new PageRequest(1, 1));
        if (page.getTotalElements() == 0) {
            log.info("createTestAccount3()");
            List<ApartmentEntity> apartments = apartmentRepository.findAll();
            ApartmentEntity apartment = apartments.get(0);
            ContractorEntity contractor = contractorRepository.findByNameContainingOrderByName("ООО «Перспектива»").get(0);
            ParameterTypeEntity parameterTypeTotalArea = parameterTypeRepository.findByCode(ParameterType.TOTAL_AREA.getCode());
            ParameterTypeEntity parameterTypePhoneNumber = parameterTypeRepository.findByCode(ParameterType.PHONE_NUMBER.getCode());
            WorkingPeriodEntity workingPeriod = getFirstWorkingPeriod();
            LocalDate dateStart = workingPeriod.getDateStart();
            LocalDate dateEnd = workingPeriod.getDateEnd();
            List<ServiceEntity> services = serviceRepository.findByNameContainingOrderByName("");
            List<TariffEntity> tariffs = tariffRepository.findByNameContainingOrderByName("");
            List<GenderTypeEntity> genderTypes = genderTypeRepository.findByNameContainingOrderByName("");
            List<DocumentTypeEntity> documentTypes = documentTypeRepository.findByNameContainingOrderByName("");
            RegistrationTypeEntity registrationType = registrationTypeRepository.findByNameContainingOrderByName("Постоянная").get(0);
            MeterTypeEntity meterType = meterTypeRepository.findByCode(MeterType.INDIVIDUAL.getCode());
            Random random = new Random();

            AccountEntity account = createAccount(0, random, dateStart, dateEnd, contractor,
                    apartment, parameterTypeTotalArea, parameterTypePhoneNumber,
                    services, tariffs, genderTypes, documentTypes, registrationType, meterType);

            account.setAccountNumber(testAccountNumber);
            List<AccountServiceEntity> accountServices = account.getServices();
            for (AccountServiceEntity accountService : accountServices) {
                accountService.setAccount(account);
            }

            List<AccountMeterEntity> accountMeters = account.getMeters();
            for (AccountMeterEntity accountMeter : accountMeters) {
                MeterEntity meter = accountMeter.getMeter();
                List<MeterValueEntity> meterValues = meter.getValues();
                Double prevValue = meterValues.get(1).getValue();
                Double nextVal1 = prevValue + (double) random.nextInt(10);
                meterValues.add(createMeterValue(dateStart.plusMonths(1).withDayOfMonth(1), nextVal1, nextVal1 - prevValue));
                Double nextVal2 = nextVal1 + (double) random.nextInt(10);
                meterValues.add(createMeterValue(dateStart.plusMonths(2).withDayOfMonth(1), nextVal2, nextVal2 - nextVal1));
                meter.setValues(meterValues);
                meterRepository.save(meter);
            }

            accountRepository.save(account);
        }
    }

    private void createTestWorkingPeriods() {
        if (workingPeriodRepository.count() == 1) {
            log.info("createTestWorkingPeriods()");
            long seconds = 1;
            WorkingPeriodEntity currentWorkingPeriod = getFirstWorkingPeriod();
            calculationService.calculateAccounts(currentWorkingPeriod.getId(), currentWorkingPeriod.getId());
            while (systemPropertyService.getCalculationIsActive()) {
                sleep(seconds);
            }
            for (int i = 0; i < appCreateTestPeriodsCount; i++) {
                calculationService.closeWorkingPeriod();
                while (systemPropertyService.getCalculationIsActive()) {
                    sleep(seconds);
                }
            }
        }
    }

    private void sleep(long seconds) {
        try {
            TimeUnit.SECONDS.sleep(seconds);
        } catch (InterruptedException e) {
            log.error(e.getMessage(), e);
        }
    }
}
