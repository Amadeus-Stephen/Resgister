package API.Models;


import javax.persistence.*;
import java.util.ArrayList;
import java.util.UUID;

@Entity
@Table
public class MClass {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;
    private String className;
    private UUID teacherId;
    private String teacherUsername;
    private Integer period;
    private ArrayList<UUID> studentList = new ArrayList<>();

    public void setId(UUID id) {
        this.id = id;
    }

    public void setClassName(String className) {
        this.className = className;
    }

    public void setTeacherId(UUID teacherId) {
        this.teacherId = teacherId;
    }

    public void setTeacherUsername(String teacherUsername) {
        this.teacherUsername = teacherUsername;
    }

    public void setPeriod(Integer period) {
        this.period = period;
    }
    public UUID getId()  { return  id;}

    public String getClassName() {return className;}

    public UUID getTeacherId() {return teacherId;}


    public String getTeacherUsername() {
        return teacherUsername;
    }

    public Integer getPeriod() {
        return period;
    }

    public int getNumOfStudents() {
        return studentList.size();
    }
    public int getStudentIndex(UUID studentID) {
        for ( int num = 0; num < studentList.size() ; num++ ) {
            if (studentList.get(num) == studentID ) {
                return num;
            }
        }
        return -1;
    }
    public  void addStudent(UUID studentID) {
        studentList.add(studentID);
    }
    public void removeStudent(UUID studentID) {
        int index = getStudentIndex(studentID);
        if (index > -1) {
            studentList.remove(index);
        }
    }
    public void changeStudent(UUID oldStudentID , UUID newStudentID) {
        int index = getStudentIndex(oldStudentID);
        if (index > -1) {
            studentList.set(index, newStudentID);
        }
    }
    public static boolean choicefields(MClass mclass){
        if (mclass.getTeacherId() == null|| mclass.getClassName().isBlank()|| mclass.getTeacherUsername().isBlank() ) {
            return false;
        }
        return true;
    }

}
