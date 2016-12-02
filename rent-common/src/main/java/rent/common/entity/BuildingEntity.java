package rent.common.entity;

import javax.persistence.*;

/**
 * Строение
 */
@Entity
@Table(name = BuildingEntity.TABLE_NAME, indexes = {
        @Index(columnList = BuildingEntity.Columns.HOUSE),
        @Index(columnList = BuildingEntity.Columns.STREET)})
public class BuildingEntity extends AbstractEntity {
    public static final String TABLE_NAME = "address_buildings";

    public interface Columns extends AbstractEntity.Columns {
        String STREET = "street_id";
        String HOUSE = "house";
        String HOUSE_NUMBER = "house_number";
        String HOUSING = "housing";
    }

    /**
     * Улица
     */
    @JoinColumn(name = Columns.STREET)
    @ManyToOne(fetch = FetchType.LAZY)
    private StreetEntity street;

    /**
     * Дом
     */
    @Column(name = Columns.HOUSE)
    private String house;

    /**
     * Номер дома
     */
    @Column(name = Columns.HOUSE_NUMBER)
    private Integer houseNumber;

    /**
     * Корпус
     */
    @Column(name = Columns.HOUSING)
    private String housing;

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
}
