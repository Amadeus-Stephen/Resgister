package register.api.Repositories;


import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import register.api.Models.TeacherModel;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface TeacherRepository extends CrudRepository <TeacherModel, Long> {
    Optional<TeacherModel> findById(UUID id);
}