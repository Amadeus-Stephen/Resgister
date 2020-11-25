package register.api.Models;


import com.sun.istack.NotNull;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.UUID;

@Entity // This tells Hibernate to make a table out of this class
@Table
public class StudentModel {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private UUID id;

	private String firstName;
	private String lastName;
	private String middleName;
	private Integer gradeYear;
	private String careerPath;
	private String email;
	private String passWord;


	public UUID getId() {
		return id;
	}

	public void setId(UUID id) {
		this.id = id;
	}

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

	public Integer getGradeYear() {
		return gradeYear;
	}

	public void setGradeYear(int gradeYear) {
		this.gradeYear = gradeYear;
	}

	public String getCareerPath() {
		return careerPath;
	}

	public void setCareerPath(String careerPath) {
		this.careerPath = careerPath;
	}
	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassWord() {
		return passWord;
	}
	public void setPassWord(String passWord) {
		this.passWord = passWord;
	}

	public static boolean choicefields(StudentModel student){
		if (student.getGradeYear() == null|| student.getEmail().isBlank()) {
		 return false;
		}
		System.out.println("Pass1");
		System.out.println(student.getName());
		for (int num = 0 ; num< student.getName().size() ; num++) {
			if (student.getName().get(num) == null) {
				return false;
			}
		}
		return true;
	}
}
