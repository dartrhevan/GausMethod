package com.numericalanalysis.numericalalanalysisbackend.repositories;

import com.numericalanalysis.numericalalanalysisbackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface UserRepository extends JpaRepository<User, Integer> {
    @Query("select u from users u where u.email = :email")
    User findByEmail(@Param("email")String email);

    /**
     * Edit data of an existing user
     */
    @Transactional
    @Modifying
    @Query("UPDATE users u SET u.email = ?2, u.password = ?3, u.age = ?4, u.nickname = ?5, u.activity = ?6, u.photo = ?7 WHERE u.email = ?1")
    int edit(@Param("email")String email, @Param("newEmail")String newEmail, @Param("newPassword")String newPassword,
              @Param("age") int age, @Param("nickname")String nickname, @Param("activity")String activity, byte[] photo);
}
