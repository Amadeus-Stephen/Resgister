package API.Repositories;


import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.UUID;

import API.Models.MTeacher;

@Repository
public interface TeacherRepository extends CrudRepository <MTeacher, Long> {
    Optional<MTeacher> findById(UUID id);
}