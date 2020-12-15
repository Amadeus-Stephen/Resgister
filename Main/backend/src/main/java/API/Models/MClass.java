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
    private String teacherName;
    private String startTime;
    private String endTime;
    private Integer runTime;
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

    public void setTeacherName(String teacherName) {
        this.teacherName = teacherName;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }

    public void setRunTime(Integer runTime) {
        this.runTime = runTime;
    }

    public UUID getId()  { return  id;}


    public String getClassName() {return className;}

    public UUID getTeacherId() {return teacherId;}

    public String getTeacherName() {return teacherName;}



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
        if (mclass.getTeacherId() == null|| mclass.getClassName().isBlank()|| mclass.getTeacherName().isBlank() ) {
            return false;
        }
        return true;
    }

}
