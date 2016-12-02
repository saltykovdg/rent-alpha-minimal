package rent.common.entity;

import javax.persistence.*;

/**
 * Контрагент
 */
@Entity
@Table(name = ContractorEntity.TABLE_NAME, indexes = {
        @Index(columnList = ContractorEntity.Columns.CONTRACTOR_TYPE),
        @Index(columnList = ContractorEntity.Columns.FULL_NAME),
        @Index(columnList = ContractorEntity.Columns.NAME)
})
public class ContractorEntity extends AbstractEntity {
    public static final String TABLE_NAME = "organization_contractors";

    public interface Columns extends AbstractEntity.Columns {
        String CONTRACTOR_TYPE = "contractor_type_id";
        String FULL_NAME = "full_name";
        String NAME = "name";
        String INN = "inn";
        String KPP = "kpp";
        String OGRN = "ogrn";
        String MAILING_ADDRESS = "mailing_address";
        String LEGAL_ADDRESS = "legal_address";
        String EMAIL = "email";
        String PHONE = "phone";
        String FAX = "fax";
        String WEB_SITE = "web_site";
        String BANK_NAME = "bank_name";
        String BANK_ADDRESS = "bank_address";
        String SETTLEMENT_ACCOUNT = "settlement_account";
        String CORRESPONDENT_ACCOUNT = "correspondent_account";
        String BANK_IDENTIFICATION_CODE = "bank_identification_code";
    }

    /**
     * Тип контрагента
     */
    @JoinColumn(name = Columns.CONTRACTOR_TYPE)
    @ManyToOne(fetch = FetchType.LAZY)
    private ContractorTypeEntity contractorType;

    /**
     * Полное наименование контрагента
     */
    @Column(name = Columns.FULL_NAME)
    private String fullName;

    /**
     * Наименование контрагента
     */
    @Column(name = Columns.NAME)
    private String name;

    /**
     * Идентификационный номер налогоплательщика (ИНН)
     */
    @Column(name = Columns.INN)
    private String inn;

    /**
     * Код причины постановки на учёт (КПП)
     */
    @Column(name = Columns.KPP)
    private String kpp;

    /**
     * Основной государственный регистрационный номер (ОГРН)
     */
    @Column(name = Columns.OGRN)
    private String ogrn;

    /**
     * Почтовый адрес
     */
    @Column(name = Columns.MAILING_ADDRESS)
    private String mailingAddress;

    /**
     * Юридический адрес
     */
    @Column(name = Columns.LEGAL_ADDRESS)
    private String legalAddress;

    /**
     * Электронная почта
     */
    @Column(name = Columns.EMAIL)
    private String email;

    /**
     * Телефон
     */
    @Column(name = Columns.PHONE)
    private String phone;

    /**
     * Факс
     */
    @Column(name = Columns.FAX)
    private String fax;

    /**
     * Веб-сайт
     */
    @Column(name = Columns.WEB_SITE)
    private String webSite;

    /**
     * Наименование банка
     */
    @Column(name = Columns.BANK_NAME)
    private String bankName;

    /**
     * Адрес банка
     */
    @Column(name = Columns.BANK_ADDRESS)
    private String bankAddress;

    /**
     * Расчетный счет
     */
    @Column(name = Columns.SETTLEMENT_ACCOUNT)
    private String settlementAccount;

    /**
     * Корреспондентский Счет
     */
    @Column(name = Columns.CORRESPONDENT_ACCOUNT)
    private String correspondentAccount;

    /**
     * Банковский идентификационный код (БИК)
     */
    @Column(name = Columns.BANK_IDENTIFICATION_CODE)
    private String bankIdentificationCode;

    public ContractorTypeEntity getContractorType() {
        return contractorType;
    }

    public void setContractorType(ContractorTypeEntity contractorType) {
        this.contractorType = contractorType;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getInn() {
        return inn;
    }

    public void setInn(String inn) {
        this.inn = inn;
    }

    public String getKpp() {
        return kpp;
    }

    public void setKpp(String kpp) {
        this.kpp = kpp;
    }

    public String getOgrn() {
        return ogrn;
    }

    public void setOgrn(String ogrn) {
        this.ogrn = ogrn;
    }

    public String getMailingAddress() {
        return mailingAddress;
    }

    public void setMailingAddress(String mailingAddress) {
        this.mailingAddress = mailingAddress;
    }

    public String getLegalAddress() {
        return legalAddress;
    }

    public void setLegalAddress(String legalAddress) {
        this.legalAddress = legalAddress;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getFax() {
        return fax;
    }

    public void setFax(String fax) {
        this.fax = fax;
    }

    public String getWebSite() {
        return webSite;
    }

    public void setWebSite(String webSite) {
        this.webSite = webSite;
    }

    public String getBankName() {
        return bankName;
    }

    public void setBankName(String bankName) {
        this.bankName = bankName;
    }

    public String getBankAddress() {
        return bankAddress;
    }

    public void setBankAddress(String bankAddress) {
        this.bankAddress = bankAddress;
    }

    public String getSettlementAccount() {
        return settlementAccount;
    }

    public void setSettlementAccount(String settlementAccount) {
        this.settlementAccount = settlementAccount;
    }

    public String getCorrespondentAccount() {
        return correspondentAccount;
    }

    public void setCorrespondentAccount(String correspondentAccount) {
        this.correspondentAccount = correspondentAccount;
    }

    public String getBankIdentificationCode() {
        return bankIdentificationCode;
    }

    public void setBankIdentificationCode(String bankIdentificationCode) {
        this.bankIdentificationCode = bankIdentificationCode;
    }
}
