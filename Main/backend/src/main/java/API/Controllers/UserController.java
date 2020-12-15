package API.Controllers;

import API.Models.MStudent;
import API.Models.MAdmin;
import API.Repositories.StudentRepository;
import API.Repositories.AdminRepository;
import API.jwt.JwtTokenUtil;
import API.jwt.JwtUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@Controller
@RequestMapping(path ="/user")
public class UserController {
    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private UserDetailsService jwtUserDetailsService;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @GetMapping(path = "/")
    public @ResponseBody HashMap<String, ? extends Object> getUserData(@RequestHeader("Authorization") String requestTokenHeader) {
        JwtUserDetails userDetails= getUserDetails(requestTokenHeader);
        if (userDetails.getRole().equals("director") || userDetails.getRole().equals("teacher")) {
            MAdmin mAdmin =  adminRepository.findByUsername(userDetails.getUsername());
            HashMap<String, Object> adminToJson = new HashMap<>();
            adminToJson.put("id", mAdmin.getId());
            adminToJson.put("name", mAdmin.getName());
            adminToJson.put("role", mAdmin.getRole());
            return adminToJson;
        }
        if (userDetails.getRole().equals("student")) {
            MStudent student = studentRepository.findByUsername(userDetails.getUsername());
            HashMap<String , Object> studentToJson = new HashMap<>();
            studentToJson.put("id" , student.getId());
            studentToJson.put("name", student.getName());
            studentToJson.put("role", student.getRole());
            return  studentToJson;
        }
        HashMap <String , String> responseMessage = new HashMap<>();
        responseMessage.put("Error","You do not have the privileges for this action" );
        return responseMessage;
    }

    public JwtUserDetails getUserDetails(String requestTokenHeader ) {
        String jwtToken = requestTokenHeader.substring(7);
        String username = jwtTokenUtil.getUsernameFromToken(jwtToken);
        JwtUserDetails userDetails = (JwtUserDetails) this.jwtUserDetailsService.loadUserByUsername(username);
        return userDetails;
    }
}
