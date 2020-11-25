package register.api.Controllers;
//
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import register.api.Models.ClassModel;
import register.api.Repositories.ClassRepository;

import java.util.UUID;

@Controller
@RequestMapping(path = "/class")
public class ClassController {
    @Autowired
    private ClassRepository classRepository;

    @PostMapping(path =  "/")
    public @ResponseBody String addNewClass (@RequestBody ClassModel classModel) {
        if( ClassModel.choicefields(classModel) ) {
            classRepository.save(classModel);
            return "Created a new class";
        }
        return "Failed a new class";
    }
    @GetMapping(path = "/")
    public @ResponseBody Iterable<ClassModel> getAllClasses() {
        return classRepository.findAll();
    }
    @GetMapping(path = "{id}")
    public  @ResponseBody
    ClassModel getClass(@PathVariable("id")  UUID id) {
        return classRepository.findById(id);
    }

    @DeleteMapping(path = "/")
    public @ResponseBody String removeClass (@RequestBody UUID id) {
        classRepository.deleteById(id);
        return  "Deleted Class";
    }
    @PostMapping(path = "/student")
    public @ResponseBody String addStudent(@RequestBody UUID classroom , UUID student) {
       ClassModel classModel = classRepository.findById(classroom);
       classModel.addStudent(student);
       return "Added student to classroom";
    }
    @PostMapping(path = "/student/remove")
    public @ResponseBody String removeStudent(@RequestBody UUID classroom , UUID student) {
        ClassModel classModel = classRepository.findById(classroom);
        classModel.removeStudent(student);
        return "Removed student from class";
    }
    @PostMapping(path = "/student/change")
    public @ResponseBody String changeStudent(@RequestBody UUID classroom , UUID oldStudent, UUID newStudent ) {
        ClassModel classModel = classRepository.findById(classroom);
        classModel.changeStudent(oldStudent , newStudent);
        return  "Change students in class";
    }



}
