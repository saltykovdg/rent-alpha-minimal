package rent.common.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import rent.common.entity.CitizenEntity;
import rent.common.projection.CitizenBasic;

@RepositoryRestResource(
        collectionResourceRel = "citizens",
        path = "citizen",
        itemResourceRel = "citizen",
        excerptProjection = CitizenBasic.class)
public interface CitizenRepository extends PagingAndSortingRepository<CitizenEntity, String> {
    @Query("select distinct citizen from CitizenEntity citizen join citizen.documents documents where " +
            "lower(citizen.firstName) like concat('%', lower(:firstName), '%') and " +
            "lower(citizen.lastName) like concat('%', lower(:lastName), '%') and " +
            "lower(citizen.fatherName) like concat('%', lower(:fatherName), '%') and " +
            "lower(documents.documentSeries) like concat('%', lower(:documentSeries), '%') and " +
            "lower(documents.documentNumber) like concat('%', lower(:documentNumber), '%')")
    Page<CitizenEntity> find(@Param("firstName") String firstName, @Param("lastName") String lastName,
                             @Param("fatherName") String fatherName, @Param("documentSeries") String documentSeries,
                             @Param("documentNumber") String documentNumber, Pageable p);
}
