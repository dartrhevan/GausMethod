package com.numericalanalysis.numericalalanalysisbackend.services;

import com.numericalanalysis.numericalalanalysisbackend.model.User;
import com.numericalanalysis.numericalalanalysisbackend.repositories.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;

/**
 * A service for manipulating users
 * @author dartrhevan
 */
public interface UserService {
    /**
     * Retrieve user's data by his email
     * @param email - user's email to identify him
     * @return user
     */
    User findByEmail(String email);

    /**
     * Save user to some storage, used for registration
     * @param user - user to save
     */
    void save(User user);

    /**
     *
     * @param email - user's email
     * @param newPassword - new password, can be null if there is no need to change password
     * @param user - user data contains data to change,
     *             each property besides <b>password (should contain current password if checkPassword is true )</b> can be null,
     *             if there is no need to change
     * @param checkPassword - signal whether to compare password from db with user's password; true by default.
     *                      If it is false user's password can be null. This is used for password dropping.
     * @throws Exception
     */
    void edit(String email, String newPassword, User user, boolean checkPassword) throws Exception;
    void edit(String email, String newPassword, User user) throws Exception;

    /**
     * Used for Spring DI autowiring
     * @param userRepository
     */
    void setUserRepository(UserRepository userRepository);

    /**
     * Used for Spring DI autowiring
     * @param encoder
     */
    void setEncoder(PasswordEncoder encoder);

}
