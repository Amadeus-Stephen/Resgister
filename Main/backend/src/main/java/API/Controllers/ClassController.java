package API.Controllers;
//
import API.Models.MClass;
import API.Models.MStudent;
import API.Repositories.ClassRepository;
import API.Repositories.StudentRepository;
import API.jwt.JwtTokenUtil;
import API.jwt.JwtUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.UUID;

@Controller
@RequestMapping(path = "/class")
public class ClassController {
    @Autowired
    private ClassRepository classRepository;

    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    UserDetailsService jwtInMemoryUserDetailsService;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @PostMapping(path =  "/create")
    public @ResponseBody HashMap<String, Object> addNewClass (@RequestHeader("Authorization") String requestTokenHeader , @RequestBody MClass mClass) {
        HashMap<String , Object> responseMessage = new HashMap<>();
        if (checkAuth(new String[] {"director" } , requestTokenHeader)) {
            if (MClass.choicefields(mClass)) {
                classRepository.save(mClass);
                responseMessage.put("Success", "Created a new class");
                return responseMessage;
            }
            responseMessage.put("Error","Some of the required fields are missing" );
            return responseMessage;
        }
        responseMessage.put("Error","You do not have the privileges for this action" );
        return responseMessage;
    }
    @GetMapping(path = "/")
    public @ResponseBody HashMap<String  , Object> getAllClasses() {
        HashMap<String , Object> responseMessage = new HashMap<>();
        responseMessage.put("Success" , classRepository.findAll());
        return responseMessage;
    }
    @PostMapping("/student/get/")
    public  @ResponseBody HashMap<String , Object> getStudentClasses(ArrayList<UUID> classListUUID) {
       HashMap<String , Object> responseMessage = new HashMap<>();
       ArrayList<MClass> classList = new ArrayList<>();

       for (int num = 0 ; num < classListUUID.size() ; num++ ){
            classList.add(classRepository.findById(classListUUID.get(num)));
       }
       responseMessage.put("Success" , classList);
       return responseMessage;
    }
    @GetMapping("/teacher/{teacherUsername}/")
    public @ResponseBody HashMap<String, Object> getClassByTeacherId(@RequestHeader("Authorization") String requestTokenHeader, @PathVariable String teacherUsername ) {
        HashMap<String , Object> responseMessage = new HashMap<>();
        if (checkAuth(new String[] {"director" , "teacher"} , requestTokenHeader)) {
            responseMessage.put("Success" , classRepository.findByTeacherUsername(teacherUsername));
            return responseMessage;
        }
        responseMessage.put("Error","You do not have the privileges for this action" );
        return responseMessage;
    }

    @DeleteMapping(path = "/")
    public @ResponseBody HashMap<String, String> removeClass (@RequestHeader("Authorization") String requestTokenHeader, @RequestBody UUID classId) {

        HashMap<String , String> responseMessage = new HashMap<>();
        if (checkAuth(new String[] {"admin" } , requestTokenHeader)) {

            classRepository.deleteById(classId);
            responseMessage.put("Success" , "Deleted class");
            return responseMessage;
        }
        responseMessage.put("Error","You do not have the privileges for this action" );
        return responseMessage;
    }
    @PostMapping(path = "/student/add/")
    public @ResponseBody HashMap<String, String> addStudent(@RequestHeader("Authorization") String requestTokenHeader, @RequestBody UUID classId , UUID studentId) {
        HashMap<String , String> responseMessage = new HashMap<>();
        String jwtToken = requestTokenHeader.substring(7);
        String username = jwtTokenUtil.getUsernameFromToken(jwtToken);
        JwtUserDetails userDetails = (JwtUserDetails) this.jwtInMemoryUserDetailsService.loadUserByUsername(username);
        if (checkAuth(new String[] {"admin" , "teacher"} , requestTokenHeader)|| userDetails.getId() == studentId) {
            MClass mClass = classRepository.findById(classId);
            MStudent mStudent = studentRepository.findById(studentId);
            mStudent.addClass(classId);
            mClass.addStudent(studentId);

            responseMessage.put("Success" , "Added student to class");
            return responseMessage;
        }

        responseMessage.put("Error","You do not have the privileges for this action" );
        return responseMessage;
    }
    @PostMapping(path = "/student/remove")
    public @ResponseBody HashMap<String , String> removeStudent(@RequestHeader("Authorization") String requestTokenHeader ,@RequestBody UUID classId  , UUID studentId) {
        HashMap<String , String> responseMessage = new HashMap<>();
        if (checkAuth(new String[] {"admin" , "teacher"} , requestTokenHeader)) {
            MClass mClass = classRepository.findById(classId);
            MStudent mStudent = studentRepository.findById(studentId);
            mStudent.removeClass(classId);
            mClass.removeStudent(studentId);
            responseMessage.put("Success" , "Removed student from class");
            return responseMessage;
        }
        responseMessage.put("Error","You do not have the privileges for this action" );
        return responseMessage;
    }
    @PostMapping(path = "/student/change")
    public @ResponseBody HashMap<String , String> changeStudent(@RequestHeader("Authorization") String requestTokenHeader,@RequestBody UUID classId, UUID oStudentId, UUID nStudentId ) {
        HashMap<String , String> responseMessage = new HashMap<>();
        if (checkAuth(new String[] {"admin" , "teacher"} , requestTokenHeader)) {
            MClass mClass = classRepository.findById(classId);
            mClass.changeStudent(oStudentId, nStudentId);

            responseMessage.put("Success" , "Switch the two given students");
            return responseMessage;
        }
        responseMessage.put("Error","You do not have the privileges for this action" );
        return responseMessage;
    }
    public boolean checkAuth(String[] roles, String requestTokenHeader) {
        String jwtToken = requestTokenHeader.substring(7);
        String username = jwtTokenUtil.getUsernameFromToken(jwtToken);

        JwtUserDetails userDetails = (JwtUserDetails) this.jwtInMemoryUserDetailsService.loadUserByUsername(username);

        for (int num1 = 0  ; num1 < roles.length; num1++ ) {
            if (roles[num1].equals(userDetails.getRole())) {
                return true;
            }
        }
        return  false;
    }
}
