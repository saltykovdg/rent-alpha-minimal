package rent.common.entity;

import javax.persistence.*;

/**
 * Помещение
 */
@Entity
@Table(name = ApartmentEntity.TABLE_NAME, indexes = {
        @Index(columnList = ApartmentEntity.Columns.BUILDING),
        @Index(columnList = ApartmentEntity.Columns.APARTMENT)})
public class ApartmentEntity extends AbstractEntity {
    public static final String TABLE_NAME = "address_apartments";

    public interface Columns extends AbstractEntity.Columns {
        String BUILDING = "building_id";
        String ENTRANCE = "entrance";
        String FLOOR = "floor";
        String APARTMENT = "apartment";
        String APARTMENT_NUMBER = "apartment_number";
        String APARTMENT_LETTER = "apartment_letter";
        String TOTAL_AREA = "total_area";
        String LIVING_AREA = "living_area";
        String ROOMS_NUMBER = "rooms_number";
    }

    /**
     * строение
     */
    @JoinColumn(name = Columns.BUILDING)
    @ManyToOne(fetch = FetchType.LAZY)
    private BuildingEntity building;

    /**
     * подъезд
     */
    @Column(name = Columns.ENTRANCE)
    private Integer entrance;

    /**
     * этаж
     */
    @Column(name = Columns.FLOOR)
    private Integer floor;

    /**
     * квартира
     */
    @Column(name = Columns.APARTMENT)
    private String apartment;

    /**
     * номер квартиры
     */
    @Column(name = Columns.APARTMENT_NUMBER)
    private Integer apartmentNumber;

    /**
     * литера квартиры
     */
    @Column(name = Columns.APARTMENT_LETTER)
    private String apartmentLetter;

    /**
     * общая площадь
     */
    @Column(name = Columns.TOTAL_AREA)
    private Double totalArea;

    /**
     * жилая площадь
     */
    @Column(name = Columns.LIVING_AREA)
    private Double livingArea;

    /**
     * кол-во комнат
     */
    @Column(name = Columns.ROOMS_NUMBER)
    private Integer roomsNumber;

    public BuildingEntity getBuilding() {
        return building;
    }

    public void setBuilding(BuildingEntity building) {
        this.building = building;
    }

    public Integer getEntrance() {
        return entrance;
    }

    public void setEntrance(Integer entrance) {
        this.entrance = entrance;
    }

    public Integer getFloor() {
        return floor;
    }

    public void setFloor(Integer floor) {
        this.floor = floor;
    }

    public String getApartment() {
        return apartment;
    }

    public void setApartment(String apartment) {
        this.apartment = apartment;
    }

    public Integer getApartmentNumber() {
        return apartmentNumber;
    }

    public void setApartmentNumber(Integer apartmentNumber) {
        this.apartmentNumber = apartmentNumber;
    }

    public String getApartmentLetter() {
        return apartmentLetter;
    }

    public void setApartmentLetter(String apartmentLetter) {
        this.apartmentLetter = apartmentLetter;
    }

    public Double getTotalArea() {
        return totalArea;
    }

    public void setTotalArea(Double totalArea) {
        this.totalArea = totalArea;
    }

    public Double getLivingArea() {
        return livingArea;
    }

    public void setLivingArea(Double livingArea) {
        this.livingArea = livingArea;
    }

    public Integer getRoomsNumber() {
        return roomsNumber;
    }

    public void setRoomsNumber(Integer roomsNumber) {
        this.roomsNumber = roomsNumber;
    }
}
