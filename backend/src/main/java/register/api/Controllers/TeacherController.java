package register.api.Controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import register.api.Models.TeacherModel;
import register.api.Repositories.TeacherRepository;

import java.util.Optional;
import java.util.UUID;

@Controller
@RequestMapping(path="/teacher")
public class TeacherController {

    @Autowired
    private TeacherRepository teacherRepository;

    @PostMapping(path="/")
    public @ResponseBody String addNewTeacher (@RequestBody TeacherModel teacher) {
        if (TeacherModel.choicefields(teacher)) {
            teacherRepository.save(teacher);
            return "created a new student";
        }
        return  "some fields are missing";
    }

    @GetMapping(path="/")
    public @ResponseBody Iterable<TeacherModel> getAllTeachers() {
        return teacherRepository.findAll();
    }

    @GetMapping(path = "{id}")
    public @ResponseBody
    Optional<TeacherModel> getTeacherById(@PathVariable("id")UUID id) {
        return teacherRepository.findById(id);
    }
}
