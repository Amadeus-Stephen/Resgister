package API.Controllers;

import API.Repositories.TeacherRepository;
import API.jwt.JwtTokenUtil;
import API.jwt.JwtUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.UUID;

import API.Models.MTeacher;

@Controller
@RequestMapping(path="/teacher")
public class TeacherController {

    @Autowired
    private TeacherRepository teacherRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private UserDetailsService jwtInMemoryUserDetailsService;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @PostMapping(path="/")
    public @ResponseBody String addNewTeacher ( @RequestHeader("Authorization") String requestTokenHeader,@RequestBody MTeacher mteacher ) {
        if (checkAuth(new String[]{"admin"} , requestTokenHeader)) {
            if (MTeacher.choicefields(mteacher)) {
                String encodedPassword = bCryptPasswordEncoder.encode(mteacher.getPassword());
                mteacher.setPassword(encodedPassword);
                teacherRepository.save(mteacher);
                return "created a new teacher";
            }
            return  "some fields are missing";
        }
        return "you do not have the privileges for this action";
    }

    @GetMapping(path="/")
    public @ResponseBody Iterable<MTeacher> getAllTeachers(@RequestHeader("Authorization") String requestTokenHeader) {
        if (checkAuth(new String[]{"teacher" , "admin"} , requestTokenHeader)) {
            System.out.println("all");
            return teacherRepository.findAll();
        }
        System.out.println("fail");
        return null;
    }
    @GetMapping(path = "{id}")
    public @ResponseBody
    Optional<MTeacher> getTeacherById(@PathVariable("id")UUID id) {
        return teacherRepository.findById(id);
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
