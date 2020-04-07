package com.numericalanalysis.numericalalanalysisbackend.services;

import com.numericalanalysis.numericalalanalysisbackend.model.User;
import com.numericalanalysis.numericalalanalysisbackend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.google.common.base.Strings;

@Service
public class UserServiceImpl implements UserService {

    //@Autowired
    private UserRepository userRepository;

    @Override
    public User findByEmail(String email) {
        return userRepository.findByEmail( email );//users.parallelStream().filter( user -> user.getEmail().equals( email ) ).findFirst().get();
    }

    @Override
    public void save(User user) {
        userRepository.save( user );
        //users.add(user);
    }
    @Autowired
    UserServiceImpl(PasswordEncoder encoder, UserRepository userRepository)
    {
        this.encoder = encoder;
        this.userRepository = userRepository;
    }

    //@Autowired
    private PasswordEncoder encoder;
    @Override
    public void edit(String email, String newPassword, User user) throws Exception {
        User u = findByEmail( email );
        if(/*!u.getPassword().equals( user.getPassword())*/!encoder.matches(user.getPassword(), u.getPassword()))
            throw new Exception( "Wrong password" );
        //u.setPassword( encoder.encode( u.getPassword() ) );
        if(!Strings.isNullOrEmpty( newPassword ))
            newPassword=encoder.encode(newPassword);
        user.setPassword( newPassword );
        userRepository.edit( email, !Strings.isNullOrEmpty(user.getEmail()) ? user.getEmail() : u.getEmail(),
                !Strings.isNullOrEmpty(user.getPassword()) ? user.getPassword() : u.getPassword(), user.getAge(),
                !Strings.isNullOrEmpty(user.getNickname()) ? user.getNickname() : u.getNickname(),
                !Strings.isNullOrEmpty(user.getActivity()) ? user.getActivity() : u.getActivity(),
                user.getPhoto() != null && user.getPhoto().length != 0 ? user.getPhoto() : u.getPhoto()
                /*!Strings.isNullOrEmpty(user.getDescription()) ? user.getDescription() : u.getDescription()*/);
    }
}
