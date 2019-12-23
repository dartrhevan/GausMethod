package com.numericanalysis.numericanalysisbackend.services;

//import org.springframework.data.jpa.repository.JpaRepository;
import com.numericanalysis.numericanalysisbackend.model.User;

public interface UserService/*extends JpaRepository<User, Long>*/ {
    User findByUsername(String email);
    void save(User user);
}
