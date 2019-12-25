package com.numericanalysis.numericanalysisbackend.repositories;

import com.numericanalysis.numericanalysisbackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepository<User, Integer> {
    @Query("select u from users u where u.email = :email")
    User findByEmail(@Param("email")String email);
}
