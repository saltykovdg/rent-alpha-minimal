package rent.common.projection;

import org.springframework.data.rest.core.config.Projection;
import rent.common.entity.ContractorEntity;

@Projection(types = {ContractorEntity.class})
public interface ContractorBasic extends AbstractBasic {
    ContractorTypeBasic getContractorType();

    String getFullName();

    String getName();

    String getInn();

    String getKpp();

    String getOgrn();

    String getMailingAddress();

    String getLegalAddress();

    String getEmail();

    String getPhone();

    String getFax();

    String getWebSite();

    String getBankName();

    String getBankAddress();

    String getSettlementAccount();

    String getCorrespondentAccount();

    String getBankIdentificationCode();
}
