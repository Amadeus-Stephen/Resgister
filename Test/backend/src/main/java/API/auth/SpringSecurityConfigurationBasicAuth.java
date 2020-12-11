//package API.auth;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.http.HttpMethod;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
//
//import javax.sql.DataSource;
//
//@Configuration
//@EnableWebSecurity
//public class SpringSecurityConfigurationBasicAuth extends WebSecurityConfigurerAdapter{
//    DataSource dataSource;
//    @Override
//    protected void configure(HttpSecurity http) throws Exception {
//        http
//        .csrf().disable()
//        .authorizeRequests()
//        .antMatchers(HttpMethod.OPTIONS,"/**").permitAll()
//                .anyRequest().authenticated()
//                .and()
//            //.formLogin().and()
//                .logout().permitAll().and()
//            .httpBasic();
//    }
//
////    @Bean
////    public BCryptPasswordEncoder passwordEncoder() {
////        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
////        return bCryptPasswordEncoder;
////    }
////    @Autowired
////    public void configAuthentication(AuthenticationManagerBuilder auth) throws  Exception {
////        auth.jdbcAuthentication().dataSource(dataSource).passwordEncoder(passwordEncoder());
////    }
//
//}