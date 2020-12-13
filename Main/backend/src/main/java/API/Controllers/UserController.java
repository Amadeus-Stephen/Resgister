package API.Controllers;

import API.Models.MUser;
import API.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping(path ="/user")
public class UserController {
    @Autowired
    UserRepository userRepository;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    @PostMapping(path="/")
    public @ResponseBody String addNewStudent (@RequestBody MUser muser) {
        if (MUser.choicefields(muser)) {
            String encodedPassword = bCryptPasswordEncoder.encode(muser.getPassword());
            muser.setPassword(encodedPassword);
            userRepository.save(muser);
            return "create new user";
        }
        return "some fields are missing";
    }
    @GetMapping(path = "/")
    public @ResponseBody Iterable<MUser> getAllUsers() {return userRepository.findAll();}
}
