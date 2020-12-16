package API.Repositories;


import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.UUID;

import API.Models.MAdmin;

@Repository
public interface AdminRepository extends CrudRepository <MAdmin, Long> {
    MAdmin findById(UUID id);
    MAdmin findByUsername(String username);
    void delete(MAdmin admin);
}