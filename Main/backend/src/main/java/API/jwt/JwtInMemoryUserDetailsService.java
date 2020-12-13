package API.jwt;

import API.Models.MStudent;
import API.Models.MTeacher;
import API.Models.MUser;
import API.Repositories.UserRepository;
import API.Repositories.StudentRepository;
import API.Repositories.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class JwtInMemoryUserDetailsService implements UserDetailsService {
  @Autowired
  private UserRepository userRepository;

  @Autowired
  private StudentRepository studentRepository;
  @Autowired
  private  TeacherRepository teacherRepository;
  static List<JwtUserDetails> inMemoryUserList = new ArrayList<>();

  static {
    inMemoryUserList.add(new JwtUserDetails(UUID.randomUUID(), "in28minutes",
        "$2a$10$3zHzb.Npv1hfZbLEU5qsdOju/tk2je6W6PnNnY.c1ujWPcZh4PL6e", "ROLE_USER_2"));
  }

  @Override
  public JwtUserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

//    Optional<JwtUserDetails> findFirst = inMemoryUserList.stream()
//            .filter(user -> user.getUsername().equals(username)).findFirst();
//
//    if (!findFirst.isPresent()) {
//      throw new UsernameNotFoundException(String.format("USER_NOT_FOUND '%s'.", username));
//    }
//
//    return findFirst.get();

    System.out.println(username);
    MStudent mstudent = studentRepository.findByUsername(username);
    MTeacher mteacher = teacherRepository.findByUsername(username);

    if (mstudent != null) {return  new JwtUserDetails(mstudent.getId() , mstudent.getUsername() , mstudent.getPassword() , mstudent.getRole());}
    if (mteacher != null) {return new JwtUserDetails(mteacher.getId() , mteacher.getUsername(), mteacher.getPassword() , mteacher.getRole());}
    throw new UsernameNotFoundException(String.format("USER_NOT_FOUND '%s'.", username));

//    return new JwtUserDetails(user.getId(),user.getUsername(), user.getPassword(), "student");
//    UserDetails userDetails = new JwtUserDetails(null ,user.getUsername() , user.getPassword() , "student" );
//    return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword());
//    return new User(user.getPassword() , user.getPassword())
  }
}


