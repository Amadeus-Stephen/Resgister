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

import java.util.ArrayList;

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
    public @ResponseBody Object getUserData(@RequestHeader("Authorization") String requestTokenHeader) {
        JwtUserDetails userDetails= getUserDetails(requestTokenHeader);
        if (userDetails.getRole().equals("director") || userDetails.getRole().equals("teacher")) {
            MAdmin mAdmin =  adminRepository.findByUsername(userDetails.getUsername());
            ArrayList adminData = new ArrayList();
            adminData.add(mAdmin.getId());
            adminData.add(mAdmin.getName());
            adminData.add(mAdmin.getRole());
            return  adminData;
        }
        if (userDetails.getRole().equals("student")) {
            MStudent student = studentRepository.findByUsername(userDetails.getUsername());
            ArrayList studentData = new ArrayList();
            studentData.add(student.getId());
            studentData.add(student.getName());
            studentData.add(student.getRole());
            return  studentData;
        }
        return "you do not have the privileges for this action";
    }

    public JwtUserDetails getUserDetails(String requestTokenHeader ) {
        String jwtToken = requestTokenHeader.substring(7);
        String username = jwtTokenUtil.getUsernameFromToken(jwtToken);
        JwtUserDetails userDetails = (JwtUserDetails) this.jwtUserDetailsService.loadUserByUsername(username);
        return userDetails;
    }
}
