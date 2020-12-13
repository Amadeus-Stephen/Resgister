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

    public UUID getId() {return  id;}
    public void setId(UUID id) {
        this.id = id;
    }
    public String getUsername() {return username;}
    public void setUsername(String username) {this.username= username;}

    public String getPassword() {return  password;}
    public void setPassword(String password) {this.password = password;}

    public static boolean choicefields(MUser muser) {
        if (muser.getUsername().isBlank() || muser.getPassword().isBlank() ) {
            return false;
        }
        return true;
    }
}
