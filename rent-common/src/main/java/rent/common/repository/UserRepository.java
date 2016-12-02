package rent.common.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import rent.common.entity.UserEntity;
import rent.common.projection.UserBasic;

@RepositoryRestResource(
        collectionResourceRel = "users",
        path = "user",
        itemResourceRel = "user",
        excerptProjection = UserBasic.class)
public interface UserRepository extends PagingAndSortingRepository<UserEntity, String> {
    UserEntity findByLogin(@Param("login") String login);
}
