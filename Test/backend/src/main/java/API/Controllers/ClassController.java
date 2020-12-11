package API.Controllers;
//
import API.Models.MClass;
import API.Repositories.ClassRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@Controller
@RequestMapping(path = "/class")
public class ClassController {
    @Autowired
    private ClassRepository classRepository;

    @PostMapping(path =  "/")
    public @ResponseBody String addNewClass (@RequestBody MClass mClass) {
        if( MClass.choicefields(mClass) ) {
            classRepository.save(mClass);
            return "Created a new class";
        }
        return "Failed a new class";
    }
    @GetMapping(path = "/")
    public @ResponseBody Iterable<MClass> getAllClasses() {
        return classRepository.findAll();
    }
    @GetMapping(path = "{id}")
    public  @ResponseBody
    MClass getClass(@PathVariable("id")  UUID id) {
        return classRepository.findById(id);
    }

    @DeleteMapping(path = "/")
    public @ResponseBody String removeClass (@RequestBody UUID id) {
        classRepository.deleteById(id);
        return  "Deleted Class";
    }
    @PostMapping(path = "/student")
    public @ResponseBody String addStudent(@RequestBody UUID ID , UUID student) {
       MClass mClass = classRepository.findById(ID);
       mClass.addStudent(student);
       return "Added student to classroom";
    }
    @PostMapping(path = "/student/remove")
    public @ResponseBody String removeStudent(@RequestBody UUID ID , UUID student) {
        MClass mClass = classRepository.findById(ID);
        mClass.removeStudent(student);
        return "Removed student from class";
    }
    @PostMapping(path = "/student/change")
    public @ResponseBody String changeStudent(@RequestBody UUID classroom , UUID oStudent, UUID nStudent ) {
        MClass mClass = classRepository.findById(classroom);
        mClass.changeStudent(oStudent , nStudent);
        return  "Change students in class";
    }



}
