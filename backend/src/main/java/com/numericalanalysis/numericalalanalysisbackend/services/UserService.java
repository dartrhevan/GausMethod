package com.numericalanalysis.numericalalanalysisbackend.services;

//import org.springframework.data.jpa.repository.JpaRepository;
import com.numericalanalysis.numericalalanalysisbackend.model.User;
import com.numericalanalysis.numericalalanalysisbackend.repositories.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;

public interface UserService {
    User findByEmail(String email);
    void save(User user);
    void edit(String email, String newPassword, User user, boolean checkPassword) throws Exception;
    void edit(String email, String newPassword, User user) throws Exception;

    UserRepository getUserRepository();

    void setUserRepository(UserRepository userRepository);

    PasswordEncoder getEncoder();

    void setEncoder(PasswordEncoder encoder);

}
