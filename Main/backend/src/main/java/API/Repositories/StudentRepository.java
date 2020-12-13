package API.Repositories;
//
import API.Models.MStudent;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


import java.util.Optional;
import java.util.UUID;

//// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
//// CRUD refers Create, Read, Update, Delete
@Repository
public interface StudentRepository extends CrudRepository<MStudent, Integer> {
    Optional<MStudent> findById(UUID id);
    MStudent findByUsername(String username);
}
