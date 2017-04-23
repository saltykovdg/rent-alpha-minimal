package rent.api.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import rent.common.entity.*;
import rent.common.enums.CalculationType;
import rent.common.enums.MeterType;
import rent.common.enums.ParameterType;
import rent.common.repository.*;
import rent.common.enums.RoleType;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.annotation.PostConstruct;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class DatabasePopulationService {
    private final Logger log = LoggerFactory.getLogger(DatabasePopulationService.class);

    private final String appLocale;
    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final StreetTypeRepository streetTypeRepository;
    private final CalculationTypeRepository calculationTypeRepository;
    private final MeasurementUnitRepository measurementUnitRepository;
    private final ParameterTypeRepository parameterTypeRepository;
    private final CommonRepository commonRepository;
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
    private final TariffValueRepository tariffValueRepository;
    private final WorkingPeriodRepository workingPeriodRepository;
    private final ContractorRepository contractorRepository;
    private final AccountRepository accountRepository;
    private final AccountParameterRepository accountParameterRepository;
    private final AccountServiceRepository accountServiceRepository;
    private final AccountOwnerRepository accountOwnerRepository;
    private final AccountRegisteredRepository accountRegisteredRepository;
    private final AccountMeterRepository accountMeterRepository;
    private final CitizenDocumentRepository citizenDocumentRepository;
    private final CitizenRepository citizenRepository;
    private final MeterRepository meterRepository;
    private final MeterValueRepository meterValueRepository;

    @Autowired
    public DatabasePopulationService(@Value("${app.locale}") String appLocale,
                                     RoleRepository roleRepository, UserRepository userRepository,
                                     PasswordEncoder passwordEncoder, StreetTypeRepository streetTypeRepository,
                                     StreetRepository streetRepository, BuildingRepository buildingRepository,
                                     CalculationTypeRepository calculationTypeRepository, MeasurementUnitRepository measurementUnitRepository,
                                     ParameterTypeRepository parameterTypeRepository, CommonRepository commonRepository,
                                     GenderTypeRepository genderTypeRepository, DocumentTypeRepository documentTypeRepository,
                                     RegistrationTypeRepository registrationTypeRepository, MeterTypeRepository meterTypeRepository,
                                     ServiceTypeRepository serviceTypeRepository, ContractorTypeRepository contractorTypeRepository,
                                     ApartmentRepository apartmentRepository, ServiceRepository serviceRepository,
                                     TariffRepository tariffRepository, TariffValueRepository tariffValueRepository,
                                     WorkingPeriodRepository workingPeriodRepository, ContractorRepository contractorRepository,
                                     AccountRepository accountRepository, AccountParameterRepository accountParameterRepository,
                                     AccountServiceRepository accountServiceRepository, AccountOwnerRepository accountOwnerRepository,
                                     AccountRegisteredRepository accountRegisteredRepository, AccountMeterRepository accountMeterRepository,
                                     CitizenDocumentRepository citizenDocumentRepository, CitizenRepository citizenRepository,
                                     MeterRepository meterRepository, MeterValueRepository meterValueRepository) {
        this.appLocale = appLocale;
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.streetTypeRepository = streetTypeRepository;
        this.streetRepository = streetRepository;
        this.buildingRepository = buildingRepository;
        this.calculationTypeRepository = calculationTypeRepository;
        this.measurementUnitRepository = measurementUnitRepository;
        this.parameterTypeRepository = parameterTypeRepository;
        this.commonRepository = commonRepository;
        this.genderTypeRepository = genderTypeRepository;
        this.documentTypeRepository = documentTypeRepository;
        this.registrationTypeRepository = registrationTypeRepository;
        this.meterTypeRepository = meterTypeRepository;
        this.serviceTypeRepository = serviceTypeRepository;
        this.contractorTypeRepository = contractorTypeRepository;
        this.apartmentRepository = apartmentRepository;
        this.serviceRepository = serviceRepository;
        this.tariffRepository = tariffRepository;
        this.tariffValueRepository = tariffValueRepository;
        this.workingPeriodRepository = workingPeriodRepository;
        this.contractorRepository = contractorRepository;
        this.accountRepository = accountRepository;
        this.accountParameterRepository = accountParameterRepository;
        this.accountServiceRepository = accountServiceRepository;
        this.accountOwnerRepository = accountOwnerRepository;
        this.accountRegisteredRepository = accountRegisteredRepository;
        this.accountMeterRepository = accountMeterRepository;
        this.citizenDocumentRepository = citizenDocumentRepository;
        this.citizenRepository = citizenRepository;
        this.meterRepository = meterRepository;
        this.meterValueRepository = meterValueRepository;
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
            user = new UserEntity();
            user.setBlocked(false);
            user.setLogin(login);
            user.setPassword(passwordEncoder.encode(password));
            user.setRole(role);
            userRepository.save(user);
        }
    }

    private void createParameterTypes() {
        ParameterTypeEntity parameterType;
        parameterType = parameterTypeRepository.findByCode(ParameterType.TOTAL_AREA.getCode());
        if (parameterType == null) {
            parameterType = createParameterType(ParameterType.TOTAL_AREA.getCode(), "Общая площадь");
            parameterTypeRepository.save(parameterType);
        }
        parameterType = parameterTypeRepository.findByCode(ParameterType.PHONE_NUMBER.getCode());
        if (parameterType == null) {
            parameterType = createParameterType(ParameterType.PHONE_NUMBER.getCode(), "Номер телефона");
            parameterTypeRepository.save(parameterType);
        }
    }

    private ParameterTypeEntity createParameterType(String code, String name) {
        ParameterTypeEntity parameterType = new ParameterTypeEntity();
        parameterType.setCode(code);
        parameterType.setName(name);
        parameterType.setNameOrigin(name);
        return parameterType;
    }

    private void createCalculationTypes() {
        CalculationTypeEntity calculationType;
        calculationType = calculationTypeRepository.findByCode(CalculationType.TOTAL_AREA.getCode());
        if (calculationType == null) {
            createCalculationType(CalculationType.TOTAL_AREA.getCode(), "По общей площади");
        }
        calculationType = calculationTypeRepository.findByCode(CalculationType.PEOPLES.getCode());
        if (calculationType == null) {
            createCalculationType(CalculationType.PEOPLES.getCode(), "По прописанным");
        }
        calculationType = calculationTypeRepository.findByCode(CalculationType.METER_READING.getCode());
        if (calculationType == null) {
            createCalculationType(CalculationType.METER_READING.getCode(), "По показаниям счетчика");
        }
    }

    private void createCalculationType(String code, String name) {
        CalculationTypeEntity calculationType = new CalculationTypeEntity();
        calculationType.setCode(code);
        calculationType.setName(name);
        calculationType.setNameOrigin(name);
        calculationTypeRepository.save(calculationType);
    }

    private void createMeasurementUnits() {
        if (measurementUnitRepository.count() == 0) {
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
        MeterTypeEntity meterType;
        meterType = meterTypeRepository.findByCode(MeterType.INDIVIDUAL.getCode());
        if (meterType == null) {
            createMeterType(MeterType.INDIVIDUAL.getCode(), "Индивидуальный");
        }
        meterType = meterTypeRepository.findByCode(MeterType.COMMON_HOUSE.getCode());
        if (meterType == null) {
            createMeterType(MeterType.COMMON_HOUSE.getCode(), "Общедомовой");
        }
    }

    private void createMeterType(String code, String name) {
        MeterTypeEntity meterType = new MeterTypeEntity();
        meterType.setCode(code);
        meterType.setName(name);
        meterType.setNameOrigin(name);
        meterTypeRepository.save(meterType);
    }

    private void createStreetTypes() {
        if (streetTypeRepository.count() == 0) {
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
            WorkingPeriodEntity workingPeriod = new WorkingPeriodEntity();

            LocalDate initial = LocalDate.now();
            LocalDate dateStart = initial.withDayOfMonth(1);
            LocalDate dateEnd = initial.withDayOfMonth(initial.lengthOfMonth());
            DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("LLLL yyyy", Locale.forLanguageTag(appLocale));
            workingPeriod.setName(dateStart.format(dateTimeFormatter));

            workingPeriod.setDateStart(dateStart);
            workingPeriod.setDateEnd(dateEnd);

            workingPeriodRepository.save(workingPeriod);
        }
    }

    /**
     * Testing data
     */
    private void createTestData() {
        createStreets();
        createBuildings();
        createApartments();
        createServices();
        createTariffs();
        createContractors();
        createAccounts();
    }

    private void createStreets() {
        if (streetRepository.count() == 0) {
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
                int apartmentAreaIndex = 1;
                int apartmentEntrance = 1;
                int apartmentFloor = 0;
                int apartmentRoomsNumber = 0;
                Double apartmentArea = 0D;
                for (int i = 0; i < apartmentsCount; i++) {
                    if (apartmentIndex == 20) {
                        apartmentIndex = 0;
                    }
                    apartmentIndex++;
                    switch (apartmentAreaIndex) {
                        case 1:
                            apartmentAreaIndex = 2;
                            apartmentArea = 63.5D;
                            apartmentRoomsNumber = 3;
                            apartmentFloor++;
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
                    createApartment(building, String.valueOf(i), i, apartmentEntrance, apartmentFloor, apartmentArea, apartmentRoomsNumber);
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

    private WorkingPeriodEntity getLastWorkingPeriod() {
        return workingPeriodRepository.getFirstByIdIsNotNullOrderByDateStartAsc();
    }

    private void createTariffs() {
        if (tariffRepository.count() == 0) {
            List<ServiceEntity> services = serviceRepository.findByNameContainingOrderByName("");

            CalculationTypeEntity calculationTypeTotalArea = calculationTypeRepository.findByCode(CalculationType.TOTAL_AREA.getCode());
            //CalculationTypeEntity calculationTypePeoples = calculationTypeRepository.findByCode(CalculationType.PEOPLES.getCode());
            CalculationTypeEntity calculationTypeMeterReading = calculationTypeRepository.findByCode(CalculationType.METER_READING.getCode());

            MeasurementUnitEntity measurementUnitArea = measurementUnitRepository.findByNameContainingOrderByName("кв. м").get(0);
            //MeasurementUnitEntity measurementUnitHeating = measurementUnitRepository.findByNameContainingOrderByName("гкал").get(0);
            MeasurementUnitEntity measurementUnitWater = measurementUnitRepository.findByNameContainingOrderByName("куб. м").get(0);

            for (ServiceEntity service : services) {
                if (service.getName().contains("Содержание жилья")) {
                    createTariff(calculationTypeTotalArea, measurementUnitArea, 22.5D, service);
                } else if (service.getName().contains("Текущий ремонт")) {
                    createTariff(calculationTypeTotalArea, measurementUnitArea, 2.5D, service);
                } else if (service.getName().contains("Отопление")) {
                    createTariff(calculationTypeTotalArea, measurementUnitArea, 30.5D, service);
                } else if (service.getName().contains("Холодная вода")) {
                    createTariff(calculationTypeMeterReading, measurementUnitWater, 8.5D, service);
                } else if (service.getName().contains("Горячая вода")) {
                    createTariff(calculationTypeMeterReading, measurementUnitWater, 40.5D, service);
                } else if (service.getName().contains("Водоотведение")) {
                    createTariff(calculationTypeMeterReading, measurementUnitWater, 14.5D, service);
                }
            }
        }
    }

    private void createTariff(CalculationTypeEntity calculationType, MeasurementUnitEntity measurementUnit,
                              Double value, ServiceEntity service) {
        TariffValueEntity tariffValue = new TariffValueEntity();
        tariffValue.setCalculationType(calculationType);
        tariffValue.setDateStart(getFirstWorkingPeriod().getDateStart());
        tariffValue.setMeasurementUnit(measurementUnit);
        tariffValue.setValue(value);

        TariffEntity tariff = new TariffEntity();
        tariff.setService(service);
        tariff.setName(String.format("Тариф ну услугу <%s>", service.getName()));
        tariff.setValues(Collections.singletonList(tariffValue));
        tariffRepository.save(tariff);
    }

    private void createContractors() {
        if (contractorRepository.count() == 0) {
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

    private void createAccount(int index, Random random, LocalDate dateStart, LocalDate dateEnd, ContractorEntity contractor, ApartmentEntity apartment,
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

        List<AccountServiceEntity> accountServices = new ArrayList<>();
        for (ServiceEntity service : services) {
            AccountServiceEntity accountService = new AccountServiceEntity();
            accountService.setService(service);
            accountService.setDateStart(dateStart);
            for (TariffEntity tariff : tariffs) {
                if (tariff.getService().getId().equals(service.getId())) {
                    accountService.setTariff(tariff);
                    break;
                }
            }
            accountServices.add(accountService);
        }
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
        Double nextVal2 = (double) random.nextInt(100) + 50;
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
}
