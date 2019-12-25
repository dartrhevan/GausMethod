package com.numericanalysis.numericanalysisbackend.services;

import com.numericanalysis.numericanalysisbackend.model.User;
import com.numericanalysis.numericanalysisbackend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
}
