package API.Controllers;

import API.Repositories.AdminRepository;
import API.jwt.JwtTokenUtil;
import API.jwt.JwtUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
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

    @PostMapping(path="/create")
    public @ResponseBody HashMap<String, String> addNewAdmin (@RequestHeader("Authorization") String requestTokenHeader, @RequestBody MAdmin mAdmin ) {
        HashMap <String , String> responseMessage = new HashMap<>();
        if (checkAuth(new String[]{"director", "teacher"} , requestTokenHeader)) {
            if (MAdmin.choicefields(mAdmin)) {
                String encodedPassword = bCryptPasswordEncoder.encode(mAdmin.getPassword());
                mAdmin.setPassword(encodedPassword);
                adminRepository.save(mAdmin);
                responseMessage.put("Success","Created a new admin");
                return responseMessage;
            }
            responseMessage.put("Error","Some fields are missing");
            return responseMessage;
        }
        responseMessage.put("Error","You do not have the privileges for this action" );
        return responseMessage;
    }

    @GetMapping(path="/")
    public @ResponseBody HashMap<String, Object> getAllAdmins(@RequestHeader("Authorization") String requestTokenHeader) {
        HashMap<String , Object> responseMessage = new HashMap<>();
        if (checkAuth(new String[]{"teacher" , "director"} , requestTokenHeader)) {
            ArrayList<MAdmin> adminList = (ArrayList<MAdmin>) adminRepository.findAll();
            for (int i = 0 ; i < adminList.size() ; i++ ) {
                MAdmin admin = adminList.get(i);
                admin.setPassword("password");
            }
            responseMessage.put("Success" , adminRepository.findAll());
            return responseMessage;
        }
        responseMessage.put("Error","You do not have the privileges for this action" );
        return responseMessage;
    }
    @DeleteMapping(path = "/{adminId}")
    public @ResponseBody Object removeAdmin(@PathVariable String adminId) {
        HashMap <String , String> responseMessage = new HashMap<>();
        System.out.println( adminId);
        MAdmin mAdmin = adminRepository.findByUsername(adminId);
        System.out.println(mAdmin);
        if (mAdmin != null) {
            adminRepository.delete(mAdmin);
            return  "deleted admin";
        }
        return "admin not found";
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
