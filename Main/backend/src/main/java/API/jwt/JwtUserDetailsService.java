package API.jwt;

import API.Models.MStudent;
import API.Models.MAdmin;
import API.Repositories.UserRepository;
import API.Repositories.StudentRepository;
import API.Repositories.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class JwtUserDetailsService implements UserDetailsService {
  @Autowired
  private UserRepository userRepository;

  @Autowired
  private StudentRepository studentRepository;
  @Autowired
  private AdminRepository adminRepository;
//  static List<JwtUserDetails> inMemoryUserList = new ArrayList<>();
//
//  static {
//    inMemoryUserList.add(new JwtUserDetails(UUID.randomUUID(), "in28minutes",
//        "$2a$10$3zHzb.Npv1hfZbLEU5qsdOju/tk2je6W6PnNnY.c1ujWPcZh4PL6e", "ROLE_USER_2"));
//  }
//
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

    MStudent mStudent = studentRepository.findByUsername(username);
    MAdmin mAdmin = adminRepository.findByUsername(username);

    if (mStudent != null) {return  new JwtUserDetails(mStudent.getId() , mStudent.getUsername() , mStudent.getPassword() , mStudent.getRole());}
    if (mAdmin != null) {return new JwtUserDetails(mAdmin.getId() , mAdmin.getUsername(), mAdmin.getPassword() , mAdmin.getRole());}
    throw new UsernameNotFoundException(String.format("USER_NOT_FOUND '%s'.", username));

//    return new JwtUserDetails(user.getId(),user.getUsername(), user.getPassword(), "student");
//    UserDetails userDetails = new JwtUserDetails(null ,user.getUsername() , user.getPassword() , "student" );
//    return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword());
//    return new User(user.getPassword() , user.getPassword())
  }
}


