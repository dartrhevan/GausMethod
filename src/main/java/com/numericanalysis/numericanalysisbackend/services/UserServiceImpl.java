package com.numericanalysis.numericanalysisbackend.services;

import com.numericanalysis.numericanalysisbackend.model.User;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {/*
    public User getUser(String login)
    {
        return new User(login, "$2y$12$QpTd8iwH6z6mVeyAIEahLeliP1GrnTLLN7u2K7acvkkqEP1TW.zwS");//1//
    }
*/
    @Override
    public User findByEmail(String email) {
        return new User(email, "$2y$12$QpTd8iwH6z6mVeyAIEahLeliP1GrnTLLN7u2K7acvkkqEP1TW.zwS");//1//
    }

    @Override
    public void save(User user) {

    }
}
