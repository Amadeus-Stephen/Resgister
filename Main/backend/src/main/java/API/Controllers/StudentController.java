package API.Controllers;
//

import API.Models.MStudent;
import API.Repositories.StudentRepository;
import API.jwt.JwtTokenUtil;
import API.jwt.JwtUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.UUID;

@Controller	// This means that this class is a Controller
@RequestMapping(path="/student") // This means URL's start with /student (after Application path)
public class StudentController {
	@Autowired // This means to get the bean called userRepository
			   // Which is auto-generated by Spring, we will use it to handle the data
	private StudentRepository studentRepository;

	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;

	@Autowired
	private UserDetailsService jwtInMemoryUserDetailsService;

	@Autowired
	private JwtTokenUtil jwtTokenUtil;

	@PostMapping(path="/") // Map ONLY POST Requests
	public @ResponseBody String addNewStudent (@RequestHeader("Authorization")String requestTokenHeader, @RequestBody MStudent mstudent) {


		if (checkAuth(new String[] {"admin"} ,requestTokenHeader)) {

			if (MStudent.choicefields(mstudent)) {
				String encodedPassword = bCryptPasswordEncoder.encode(mstudent.getPassword());
				mstudent.setPassword(encodedPassword);
				studentRepository.save(mstudent);
				return "created a new student";
			}
			return  "some fields are missing";
		}
		return "you do not have the privileges for this action";
	}

	@GetMapping(path="/")
	public @ResponseBody Iterable<MStudent> getAllStudents(@RequestHeader("Authorization") String requestTokenHeader) {

		if (checkAuth(new String[]{"admin", "teacher"} , requestTokenHeader)) {
			return studentRepository.findAll();
		}
		return null;
	}
	@GetMapping(path = "{id}")
	public @ResponseBody
	Optional<MStudent> getStudentById(@PathVariable("id")UUID id) {
		return studentRepository.findById(id);
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
