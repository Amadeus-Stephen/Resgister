package API.Models;

import javax.persistence.*;
import java.util.UUID;

@Entity
@Table
public class MUser {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;
    private String username;
    private String password;
    private String role;

    public MUser(UUID id ,
                 String username ,
                 String password,
                 String role
    ) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.role = role;
    }

    public UUID getId() {return  id;}
    public String getUsername() {return username;}
    public String getPassword() {return  password;}

    public static boolean choicefields(MUser muser) {
        if (muser.getUsername().isBlank() || muser.getPassword().isBlank() ) {
            return false;
        }
        return true;
    }
}
