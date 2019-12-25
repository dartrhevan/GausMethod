package com.numericanalysis.numericanalysisbackend.repositories;

import com.numericanalysis.numericanalysisbackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
    User findByEmail(String username);
}
