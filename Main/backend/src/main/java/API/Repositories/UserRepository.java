package API.Repositories;

import API.Models.MUser;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends CrudRepository <MUser , Integer> {
    Optional<MUser> findById(UUID id);
    MUser findByUsername(String username);
}
