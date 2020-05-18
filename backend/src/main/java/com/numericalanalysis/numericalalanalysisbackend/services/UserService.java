package com.numericalanalysis.numericalalanalysisbackend.services;

//import org.springframework.data.jpa.repository.JpaRepository;
import com.numericalanalysis.numericalalanalysisbackend.model.User;

public interface UserService/*extends JpaRepository<User, Long>*/ {
    User findByEmail(String email);
    void save(User user);
    void edit(String email, String newPassword, User user, boolean checkPassword) throws Exception;
    void edit(String email, String newPassword, User user) throws Exception;
}
