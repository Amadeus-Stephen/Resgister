package register.api.Repositories;
//
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import register.api.Models.StudentModel;

import java.util.Optional;
import java.util.UUID;

//// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
//// CRUD refers Create, Read, Update, Delete
@Repository
public interface StudentRepository extends CrudRepository<StudentModel, Integer> {

    Optional<StudentModel> findById(UUID id);
}
