package register.api.Repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import register.api.Models.ClassModel;

import java.util.UUID;

@Repository
public interface ClassRepository extends CrudRepository<ClassModel , Integer> {
    ClassModel findById(UUID id);


    void deleteById(UUID id);
}