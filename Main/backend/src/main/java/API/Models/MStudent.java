package API.Models;


import javax.persistence.*;
import java.util.ArrayList;
import java.util.UUID;

@Entity // This tells Hibernate to make a table out of this class
@Table
public class MStudent {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private UUID id;

	private String username;
	private String firstName;
	private String lastName;
	private String middleName;
	private Integer finalYear;
	private String careerPath;
	private String email;
	private String role;
	private String password;

	public void setId(UUID id) {
		this.id = id;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public void setMiddleName(String middleName) {
		this.middleName = middleName;
	}

	public void setFinalYear(Integer finalYear) {
		this.finalYear = finalYear;
	}

	public void setCareerPath(String careerPath) {
		this.careerPath = careerPath;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public UUID getId() {
		return id;
	}

	public String getUsername() {return  username;}

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


	public Integer getFinalYear() {
		return finalYear;
	}


	public String getCareerPath() {
		return careerPath;
	}

	public String getEmail() {
		return email;
	}

	public String getRole() {return role;}

	public String getPassword() {return  password;}
	public  void  setPassword(String password) {this.password = password;}
	public static boolean choicefields(MStudent MStudent){
		if (MStudent.getFinalYear() == null
				|| MStudent.getEmail().isBlank()
				|| MStudent.getUsername().isBlank()
				|| MStudent.getRole().isBlank()
				|| MStudent.getPassword().isBlank())
		{
			return false;
		}
		for (int num = 0; num< MStudent.getName().size() ; num++) {
			if (MStudent.getName().get(num) == null) {
				return false;
			}
		}
		return true;
	}
}
