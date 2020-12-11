package API.Repositories;

import API.Models.MClass;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ClassRepository extends CrudRepository<MClass , Integer> {
    MClass findById(UUID id);
    void deleteById(UUID id);
}
