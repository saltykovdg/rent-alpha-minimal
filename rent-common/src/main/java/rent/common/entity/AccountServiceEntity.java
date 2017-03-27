package rent.common.entity;

import rent.common.interfaces.UseDateStartDateEnd;

import javax.persistence.*;
import java.util.Date;

/**
 * Услуга лицевого счета
 */
@Entity
@Table(name = AccountServiceEntity.TABLE_NAME, indexes = {
        @Index(columnList = AccountServiceEntity.Columns.ID),
        @Index(columnList = AccountServiceEntity.Columns.SERVICE),
        @Index(columnList = AccountServiceEntity.Columns.DATE_START),
        @Index(columnList = AccountServiceEntity.Columns.DATE_END)
})
public class AccountServiceEntity extends AbstractEntity implements UseDateStartDateEnd {
    public static final String TABLE_NAME = "accounts_services";

    public interface Columns extends AbstractEntity.Columns {
        String ACCOUNT = "account_id";
        String SERVICE = "service_id";
        String TARIFF = "tariff_id";
        String DATE_START = "date_start";
        String DATE_END = "date_end";
    }

    /**
     * лс
     */
    @JoinColumn(name = Columns.ACCOUNT)
    @ManyToOne(fetch = FetchType.LAZY)
    private AccountEntity account;

    /**
     * услуга
     */
    @JoinColumn(name = Columns.SERVICE)
    @ManyToOne(fetch = FetchType.LAZY)
    private ServiceEntity service;

    /**
     * дата начала
     */
    @Column(name = Columns.DATE_START)
    private Date dateStart;

    /**
     * дата окончания
     */
    @Column(name = Columns.DATE_END)
    private Date dateEnd;

    /**
     * тариф
     */
    @JoinColumn(name = Columns.TARIFF)
    @ManyToOne(fetch = FetchType.LAZY)
    private TariffEntity tariff;

    public AccountEntity getAccount() {
        return account;
    }

    public void setAccount(AccountEntity account) {
        this.account = account;
    }

    public ServiceEntity getService() {
        return service;
    }

    public void setService(ServiceEntity service) {
        this.service = service;
    }

    public Date getDateStart() {
        return dateStart;
    }

    public void setDateStart(Date dateStart) {
        this.dateStart = dateStart;
    }

    public Date getDateEnd() {
        return dateEnd;
    }

    public void setDateEnd(Date dateEnd) {
        this.dateEnd = dateEnd;
    }

    public TariffEntity getTariff() {
        return tariff;
    }

    public void setTariff(TariffEntity tariff) {
        this.tariff = tariff;
    }
}
