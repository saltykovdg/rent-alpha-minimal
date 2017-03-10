package rent.api.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import rent.common.entity.*;
import rent.common.enums.CalculationType;
import rent.common.enums.ParameterType;
import rent.common.repository.*;
import rent.common.enums.RoleType;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.annotation.PostConstruct;

@Service
public class DatabasePopulationService {
    private final Logger log = LoggerFactory.getLogger(DatabasePopulationService.class);

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final StreetTypeRepository streetTypeRepository;
    private final StreetRepository streetRepository;
    private final BuildingRepository buildingRepository;
    private final CalculationTypeRepository calculationTypeRepository;
    private final MeasurementUnitRepository measurementUnitRepository;
    private final ParameterTypeRepository parameterTypeRepository;
    private final CommonRepository commonRepository;
    private final GenderTypeRepository genderTypeRepository;
    private final DocumentTypeRepository documentTypeRepository;

    @Autowired
    public DatabasePopulationService(RoleRepository roleRepository, UserRepository userRepository,
                                     PasswordEncoder passwordEncoder, StreetTypeRepository streetTypeRepository,
                                     StreetRepository streetRepository, BuildingRepository buildingRepository,
                                     CalculationTypeRepository calculationTypeRepository, MeasurementUnitRepository measurementUnitRepository,
                                     ParameterTypeRepository parameterTypeRepository, CommonRepository commonRepository,
                                     GenderTypeRepository genderTypeRepository, DocumentTypeRepository documentTypeRepository) {
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
    }

    @PostConstruct
    private void init() {
        log.info("Start population database");
        createRoles();
        createUsers();
        createParameterTypes();
        createCalculationTypes();
        createMeasurementUnit();
        createGenderTypes();
        createDocumentTypes();
//        createStreetTypes();
//        createStreets();
//        createBuildings();
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
            calculationType = createCalculationType(CalculationType.TOTAL_AREA.getCode(), "По общей площади");
            calculationTypeRepository.save(calculationType);
        }
        calculationType = calculationTypeRepository.findByCode(CalculationType.PEOPLES.getCode());
        if (calculationType == null) {
            calculationType = createCalculationType(CalculationType.PEOPLES.getCode(), "По прописанным");
            calculationTypeRepository.save(calculationType);
        }
        calculationType = calculationTypeRepository.findByCode(CalculationType.METER_READING.getCode());
        if (calculationType == null) {
            calculationType = createCalculationType(CalculationType.METER_READING.getCode(), "По показаниям счетчика");
            calculationTypeRepository.save(calculationType);
        }
    }

    private CalculationTypeEntity createCalculationType(String id, String name) {
        CalculationTypeEntity calculationType = new CalculationTypeEntity();
        calculationType.setCode(id);
        calculationType.setName(name);
        calculationType.setNameOrigin(name);
        return calculationType;
    }

    private void createMeasurementUnit() {

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
            createDocumentType("Договор доверия");
        }
    }

    private void createDocumentType(String name) {
        DocumentTypeEntity documentType = new DocumentTypeEntity();
        documentType.setName(name);
        documentTypeRepository.save(documentType);
    }

//    private void createStreetTypes() {
//        if (streetTypeRepository.count() < 10) {
//            for (int i = 0; i < 100; i++) {
//                StreetTypeEntity streetTypeEntity = new StreetTypeEntity();
//                streetTypeEntity.setName(String.format("Test streetType %d", i));
//                streetTypeRepository.save(streetTypeEntity);
//            }
//        }
//    }

//    private void createStreets() {
//        if (streetRepository.count() < 10) {
//            StreetTypeEntity streetTypeEntity1 = streetTypeRepository.findOne("c6653995-72dd-4bd6-a6c4-8ee4cdb5c905");
//            StreetTypeEntity streetTypeEntity2 = streetTypeRepository.findOne("61985111-9cbf-4354-87a4-89326faf13cc");
//            for (int i = 0; i < 100; i++) {
//                StreetEntity streetEntity = new StreetEntity();
//                streetEntity.setName(String.format("Test street %d", i));
//                if (i < 50) {
//                    streetEntity.setStreetType(streetTypeEntity1);
//                } else {
//                    streetEntity.setStreetType(streetTypeEntity2);
//                }
//                streetRepository.save(streetEntity);
//            }
//        }
//    }

//    private void createBuildings() {
//        if (buildingRepository.count() < 10) {
//            StreetEntity streetEntity1 = streetRepository.findOne("37c219fa-2cf3-4901-8d6c-0708dc65234d");
//            StreetEntity streetEntity2 = streetRepository.findOne("f3cdf29d-bfc7-47cd-aaa1-ef66d5813ff3");
//            for (int i = 0; i < 100; i++) {
//                BuildingEntity buildingEntity = new BuildingEntity();
//                buildingEntity.setHouse(String.format("Test building %d", i));
//                buildingEntity.setHouseNumber(i);
//                buildingEntity.setHousing("-");
//                if (i < 50) {
//                    buildingEntity.setStreet(streetEntity1);
//                } else {
//                    buildingEntity.setStreet(streetEntity2);
//                }
//                buildingRepository.save(buildingEntity);
//            }
//        }
//    }
}
