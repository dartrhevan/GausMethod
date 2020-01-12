package com.numericanalysis.numericanalysisbackend.services;

import com.numericanalysis.numericanalysisbackend.model.User;
import com.numericanalysis.numericanalysisbackend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.google.common.base.Strings;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {/*
    public User getUser(String login)
    {
        return new User(login, "$2y$12$QpTd8iwH6z6mVeyAIEahLeliP1GrnTLLN7u2K7acvkkqEP1TW.zwS");//1//
    }
    private static List<User> users = new ArrayList<User>();
    static {
        users.add(new User("abc@e", "$2y$12$QpTd8iwH6z6mVeyAIEahLeliP1GrnTLLN7u2K7acvkkqEP1TW.zwS"));//1//
        users.add(new User("bmde@e", "$2y$12$QpTd8iwH6z6mVeyAIEahLeliP1GrnTLLN7u2K7acvkkqEP1TW.zwS"));//1//
    }*/

    @Autowired
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
                !Strings.isNullOrEmpty(user.getActivity()) ? user.getActivity() : u.getActivity()
                /*!Strings.isNullOrEmpty(user.getDescription()) ? user.getDescription() : u.getDescription()*/);
    }
}
