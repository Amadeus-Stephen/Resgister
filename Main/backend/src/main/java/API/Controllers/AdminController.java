package API.Controllers;

import API.Repositories.AdminRepository;
import API.jwt.JwtTokenUtil;
import API.jwt.JwtUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.UUID;

import API.Models.MAdmin;

@Controller
@RequestMapping(path="/admin")
public class AdminController {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private UserDetailsService jwtUserDetailsService;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @PostMapping(path="/")
    public @ResponseBody String addNewTeacher ( @RequestHeader("Authorization") String requestTokenHeader,@RequestBody MAdmin mteacher ) {
        if (checkAuth(new String[]{"director"} , requestTokenHeader)) {
            if (MAdmin.choicefields(mteacher)) {
                String encodedPassword = bCryptPasswordEncoder.encode(mteacher.getPassword());
                mteacher.setPassword(encodedPassword);
                adminRepository.save(mteacher);
                return "created a new teacher";
            }
            return  "some fields are missing";
        }
        return "you do not have the privileges for this action";
    }

    @GetMapping(path="/")
    public @ResponseBody Object getAllTeachers(@RequestHeader("Authorization") String requestTokenHeader) {
        if (checkAuth(new String[]{"teacher" , "director"} , requestTokenHeader)) {
            return adminRepository.findAll();
        }
        return "you do not have the privileges for this action";
    }
    @GetMapping(path = "{id}")
    public @ResponseBody
    Optional<MAdmin> getTeacherById(@PathVariable("id")UUID id) {
        return adminRepository.findById(id);
    }

    public boolean checkAuth(String[] roles, String requestTokenHeader) {
        String jwtToken = requestTokenHeader.substring(7);
        String username = jwtTokenUtil.getUsernameFromToken(jwtToken);

        JwtUserDetails userDetails = (JwtUserDetails) this.jwtUserDetailsService.loadUserByUsername(username);

        for (int num1 = 0  ; num1 < roles.length; num1++ ) {
           if (roles[num1].equals(userDetails.getRole())) {
               return true;
           }
        }
        return  false;
    }
}
