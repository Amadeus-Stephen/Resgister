package API.Controllers;
//
import API.Models.MClass;
import API.Repositories.ClassRepository;
import API.jwt.JwtTokenUtil;
import API.jwt.JwtUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@Controller
@RequestMapping(path = "/class")
public class ClassController {
    @Autowired
    private ClassRepository classRepository;

    @Autowired
    UserDetailsService jwtInMemoryUserDetailsService;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @PostMapping(path =  "/")
    public @ResponseBody String addNewClass (@RequestHeader("Authorization") String requestTokenHeader ,@RequestBody MClass mClass) {
        if (checkAuth(new String[] {"director" } , requestTokenHeader)) {
            if (MClass.choicefields(mClass)) {
                classRepository.save(mClass);
                return "Created a new class";
            }
            return "Failed a new class";
        }
        return "you do not have the privileges for this action";
    }
    @GetMapping(path = "/")
    public @ResponseBody Iterable<MClass> getAllClasses() {
        return classRepository.findAll();
    }


    @DeleteMapping(path = "/")
    public @ResponseBody String removeClass (@RequestHeader("Authorization") String requestTokenHeader,@RequestBody UUID classId) {

        if (checkAuth(new String[] {"admin" } , requestTokenHeader)) {

            classRepository.deleteById(classId);
            return  "Deleted Class";
        }
        return "you do not have the privileges for this action";
    }
    @PostMapping(path = "/student")
    public @ResponseBody String addStudent(@RequestHeader("Authorization") String requestTokenHeader,@RequestBody UUID classId , UUID studentId) {
        String jwtToken = requestTokenHeader.substring(7);
        String username = jwtTokenUtil.getUsernameFromToken(jwtToken);
        JwtUserDetails userDetails = (JwtUserDetails) this.jwtInMemoryUserDetailsService.loadUserByUsername(username);
        if (checkAuth(new String[] {"admin" , "teacher"} , requestTokenHeader)|| userDetails.getId() == studentId) {
            MClass mClass = classRepository.findById(classId);
            mClass.addStudent(studentId);
            return "Added student to classroom";
        }
        return "you do not have the privileges for this action";
    }
    @PostMapping(path = "/student/remove")
    public @ResponseBody String removeStudent(@RequestHeader("Authorization") String requestTokenHeader ,@RequestBody UUID classId  , UUID studentId) {
        if (checkAuth(new String[] {"admin" , "teacher"} , requestTokenHeader)) {
            MClass mClass = classRepository.findById(classId);
            mClass.removeStudent(studentId);
            return "Removed student from class";
        }
        return "you do not have the privileges for this action";
    }
    @PostMapping(path = "/student/change")
    public @ResponseBody String changeStudent(@RequestHeader("Authorization") String requestTokenHeader,@RequestBody UUID classId, UUID oStudentId, UUID nStudentId ) {
        if (checkAuth(new String[] {"admin" , "teacher"} , requestTokenHeader)) {
            MClass mClass = classRepository.findById(classId);
            mClass.changeStudent(oStudentId, nStudentId);
            return "Change students in class";
        }
        return "you do not have the privileges for this action";
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
