package API.Controllers;

import API.Repositories.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
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

//    @Autowired
//    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @PostMapping(path="/")
    public @ResponseBody String addNewTeacher (@RequestBody MTeacher MTeacher) {
        System.out.println("hello nigga");
        if (MTeacher.choicefields(MTeacher)) {
//            String encodedPassword = bCryptPasswordEncoder.encode(MTeacher.getPassword());
//            MTeacher.setPassword(encodedPassword);
//            teacherRepository.save(MTeacher);
            return "created a new student";
        }
        return  "some fields are missing";
    }

    @GetMapping(path="/")
    public @ResponseBody Iterable<MTeacher> getAllTeachers() {
        return teacherRepository.findAll();
    }

    @GetMapping(path = "{id}")
    public @ResponseBody
    Optional<MTeacher> getTeacherById(@PathVariable("id")UUID id) {
        return teacherRepository.findById(id);
    }
}
