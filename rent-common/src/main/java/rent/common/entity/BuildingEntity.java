package rent.common.entity;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

/**
 * Строение
 */
@Entity
@Table(name = BuildingEntity.TABLE_NAME, indexes = {
        @Index(columnList = BuildingEntity.Columns.ID),
        @Index(columnList = BuildingEntity.Columns.HOUSE),
        @Index(columnList = BuildingEntity.Columns.STREET)})
public class BuildingEntity extends AbstractEntity {
    public static final String TABLE_NAME = "address_buildings";

    public interface Columns extends AbstractEntity.Columns {
        String BUILDING = "building_id";
        String STREET = "street_id";
        String HOUSE = "house";
        String HOUSE_NUMBER = "house_number";
        String HOUSING = "housing";
    }

    /**
     * улица
     */
    @JoinColumn(name = Columns.STREET)
    @ManyToOne(fetch = FetchType.LAZY)
    private StreetEntity street;

    /**
     * дом
     */
    @Column(name = Columns.HOUSE)
    private String house;

    /**
     * номер дома
     */
    @Column(name = Columns.HOUSE_NUMBER)
    private Integer houseNumber;

    /**
     * корпус
     */
    @Column(name = Columns.HOUSING)
    private String housing;

    /**
     * счетчики общедомовые
     */
    @JoinColumn(name = Columns.BUILDING)
    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<BuildingMeterEntity> meters;

    public StreetEntity getStreet() {
        return street;
    }

    public void setStreet(StreetEntity street) {
        this.street = street;
    }

    public String getHouse() {
        return house;
    }

    public void setHouse(String house) {
        this.house = house;
    }

    public Integer getHouseNumber() {
        return houseNumber;
    }

    public void setHouseNumber(Integer houseNumber) {
        this.houseNumber = houseNumber;
    }

    public String getHousing() {
        return housing;
    }

    public void setHousing(String housing) {
        this.housing = housing;
    }

    public List<BuildingMeterEntity> getMeters() {
        return meters;
    }

    public void setMeters(List<BuildingMeterEntity> meters) {
        this.meters = meters;
    }

    public List<BuildingMeterEntity> getCurrentMeters() {
        return getMetersForPeriod(new Date(System.currentTimeMillis()));
    }

    public List<BuildingMeterEntity> getMetersForPeriod(Date period) {
        return (List<BuildingMeterEntity>) getListForPeriod(period, this.meters);
    }
}
