package API.Models;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.UUID;

@Entity
@Table
public class MAdmin {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    private String username;
    private String firstName;
    private String lastName;
    private String middleName;
    private String email;
    private String role;
    private String password;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getUsername() {return username;}

    public void setUsername(String username) { this.username = username;}

    public ArrayList<String> getName() {
        ArrayList<String> fullName = new ArrayList<>();
        fullName.add(firstName);
        fullName.add(middleName);
        fullName.add(lastName);
        return fullName;
    }
    public String getFirstName() {
        return firstName;
    }
    public String getMiddleName() {
        return middleName;
    }
    public String getLastName () {
        return lastName;
    }


    public void setName(String firstName , String middleName, String lastName) {
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {return role;}

    public void setRole(String role) {this.role = role;}

    public String getPassword() {return  password;}

    public void setPassword(String password ) { this.password = password;}
    public static boolean choicefields(MAdmin MAdmin){
        if (
                MAdmin.getEmail().isBlank()
                        || MAdmin.getUsername().isBlank()
                        || MAdmin.getRole().isBlank()
                        || MAdmin.getPassword().isBlank())
        {
            return false;
        }
        for (int num = 0; num< MAdmin.getName().size() ; num++) {
            if (MAdmin.getName().get(num) == null) {
                return false;
            }
        }
        return true;
    }
}
