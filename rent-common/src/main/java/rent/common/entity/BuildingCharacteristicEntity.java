package rent.common.entity;

import javax.persistence.*;
import java.util.Date;

/**
 * Характеристика строения
 */
@Entity
@Table(name = BuildingCharacteristicEntity.TABLE_NAME, indexes = {
        @Index(columnList = BuildingCharacteristicEntity.Columns.BUILDING),
        @Index(columnList = BuildingCharacteristicEntity.Columns.BUILDING_MATERIAL),
        @Index(columnList = BuildingCharacteristicEntity.Columns.BUILDING_TYPE_LIVABILITY),
        @Index(columnList = BuildingCharacteristicEntity.Columns.DISTRICT),
//        @Index(columnList = BuildingCharacteristicEntity.Columns.GROUP_NORM),
//        @Index(columnList = BuildingCharacteristicEntity.Columns.GROUP_NORM_ELECTRO),
        @Index(columnList = BuildingCharacteristicEntity.Columns.CONTRACTOR),
        @Index(columnList = BuildingCharacteristicEntity.Columns.START_DATE),
        @Index(columnList = BuildingCharacteristicEntity.Columns.END_DATE)})
public class BuildingCharacteristicEntity extends AbstractEntity {
    public static final String TABLE_NAME = "address_buildings_characteristics";

    public interface Columns extends AbstractEntity.Columns {
        String BUILDING = "building_id";
        String BUILDING_MATERIAL = "building_material_id";
        String BUILDING_TYPE_LIVABILITY = "building_type_livability_id";
        String DISTRICT = "district_id";
        String GROUP_NORM = "group_norm_id";
        String GROUP_NORM_ELECTRO = "group_norm_electro_id";
        String CONTRACTOR = "contractor_id";
        String LIFT = "lift";
        String FLOOR_NUMBER = "floor_number";
        String AREA_OF_COMMON_PROPERTY = "area_of_common_property";
        String TOTAL_AREA = "total_area";
        String START_DATE = "start_date";
        String END_DATE = "end_date";
    }

    /**
     * строение
     */
    @JoinColumn(name = Columns.BUILDING)
    @ManyToOne(fetch = FetchType.LAZY)
    private BuildingEntity building;

    /**
     * материал строения
     */
    @JoinColumn(name = Columns.BUILDING_MATERIAL)
    @ManyToOne(fetch = FetchType.LAZY)
    private BuildingMaterialEntity buildingMaterial;

    /**
     * тип благоустроенности строения
     */
    @JoinColumn(name = Columns.BUILDING_TYPE_LIVABILITY)
    @ManyToOne(fetch = FetchType.LAZY)
    private BuildingTypeLivabilityEntity buildingTypeLivability;

    /**
     * район
     */
    @JoinColumn(name = Columns.DISTRICT)
    @ManyToOne(fetch = FetchType.LAZY)
    private DistrictEntity district;

//    /**
//     * группа норматива
//     */
//    @JoinColumn(name = Columns.GROUP_NORM)
//    @ManyToOne(fetch = FetchType.LAZY)
//    private GroupNormModel groupNorm;
//
//    /**
//     * группа норматива электроэнергии
//     */
//    @JoinColumn(name = Columns.GROUP_NORM_ELECTRO)
//    @ManyToOne(fetch = FetchType.LAZY)
//    private GroupNormModel groupNormElectro;

    /**
     * подрядчик
     */
    @JoinColumn(name = Columns.CONTRACTOR)
    @ManyToOne(fetch = FetchType.LAZY)
    private ContractorEntity contractor;

    /**
     * признак есть ли лифт в доме
     */
    @Column(name = Columns.LIFT)
    private Boolean lift;

    /**
     * число этажей
     */
    @Column(name = Columns.FLOOR_NUMBER)
    private Integer floorNumber;

    /**
     * площадь общего имущества
     */
    @Column(name = Columns.AREA_OF_COMMON_PROPERTY)
    private String areaOfCommonProperty;

    /**
     * общая площадь дома
     */
    @Column(name = Columns.TOTAL_AREA)
    private String totalArea;

    /**
     * Дата начала
     */
    @Column(name = Columns.START_DATE)
    @Temporal(TemporalType.TIMESTAMP)
    private Date startDate;

    /**
     * Дата окончания
     */
    @Column(name = Columns.END_DATE)
    @Temporal(TemporalType.TIMESTAMP)
    private Date endDate;

    public BuildingEntity getBuilding() {
        return building;
    }

    public void setBuilding(BuildingEntity building) {
        this.building = building;
    }

    public BuildingMaterialEntity getBuildingMaterial() {
        return buildingMaterial;
    }

    public void setBuildingMaterial(BuildingMaterialEntity buildingMaterial) {
        this.buildingMaterial = buildingMaterial;
    }

    public BuildingTypeLivabilityEntity getBuildingTypeLivability() {
        return buildingTypeLivability;
    }

    public void setBuildingTypeLivability(BuildingTypeLivabilityEntity buildingTypeLivability) {
        this.buildingTypeLivability = buildingTypeLivability;
    }

    public DistrictEntity getDistrict() {
        return district;
    }

    public void setDistrict(DistrictEntity district) {
        this.district = district;
    }

//    public GroupNormModel getGroupNorm() {
//        return groupNorm;
//    }
//
//    public void setGroupNorm(GroupNormModel groupNorm) {
//        this.groupNorm = groupNorm;
//    }
//
//    public GroupNormModel getGroupNormElectro() {
//        return groupNormElectro;
//    }
//
//    public void setGroupNormElectro(GroupNormModel groupNormElectro) {
//        this.groupNormElectro = groupNormElectro;
//    }

    public ContractorEntity getContractor() {
        return contractor;
    }

    public void setContractor(ContractorEntity contractor) {
        this.contractor = contractor;
    }

    public Boolean getLift() {
        return lift;
    }

    public void setLift(Boolean lift) {
        this.lift = lift;
    }

    public Integer getFloorNumber() {
        return floorNumber;
    }

    public void setFloorNumber(Integer floorNumber) {
        this.floorNumber = floorNumber;
    }

    public String getAreaOfCommonProperty() {
        return areaOfCommonProperty;
    }

    public void setAreaOfCommonProperty(String areaOfCommonProperty) {
        this.areaOfCommonProperty = areaOfCommonProperty;
    }

    public String getTotalArea() {
        return totalArea;
    }

    public void setTotalArea(String totalArea) {
        this.totalArea = totalArea;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }
}
