package com.numericalanalysis.numericalalanalysisbackend.services;

import com.numericalanalysis.numericalalanalysisbackend.model.User;
import com.numericalanalysis.numericalalanalysisbackend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.google.common.base.Strings;

@Service
public class UserServiceImpl implements UserService {

    @Override
    @Autowired
    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    @Autowired
    public void setEncoder(PasswordEncoder encoder) {
        this.encoder = encoder;
    }

    private UserRepository userRepository;

    @Override
    public User findByEmail(String email) {
        return userRepository.findByEmail( email );
    }

    @Override
    public void save(User user) {
        userRepository.save( user );
    }

    private PasswordEncoder encoder;

    public void edit(String email, String newPassword, User user) throws Exception {
        edit( email, newPassword, user, true );
    }


    /**
     * TODO: refactor ALL!
     * This code is bad because user.password contains either raw password or its hash.
     * */
    @Override
    public void edit(String email, String newPassword, User user, boolean checkPassword) throws Exception {
        User u = findByEmail( email );
        if(checkPassword && !encoder.matches(user.getPassword(), u.getPassword()))
            throw new Exception( "Wrong password" );
        if(!Strings.isNullOrEmpty( newPassword ))
            newPassword = encoder.encode(newPassword);
        user.setPassword( newPassword );
        String newEmail = !Strings.isNullOrEmpty(user.getEmail()) ? user.getEmail() : u.getEmail(),
                newPass = !Strings.isNullOrEmpty(user.getPassword()) ? user.getPassword() : u.getPassword(),
                newNickname = !Strings.isNullOrEmpty(user.getNickname()) ? user.getNickname() : u.getNickname(),
                newActivity = !Strings.isNullOrEmpty(user.getActivity()) ? user.getActivity() : u.getActivity();

        byte[] newPhoto = user.getPhoto() != null && user.getPhoto().length != 0 ? user.getPhoto() : u.getPhoto();

        userRepository.edit( email, newEmail, newPass, user.getAge(), newNickname, newActivity, newPhoto);
    }
}
