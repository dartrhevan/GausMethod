package com.numericalanalysis.tests;

import com.numericalanalysis.numericalalanalysisbackend.model.User;
import com.numericalanalysis.numericalalanalysisbackend.services.UserService;
import com.numericalanalysis.numericalalanalysisbackend.services.UserServiceImpl;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.junit.Test;

public class UserServiceTests {

    private static UserService getUserService() {
        UserService userService = new UserServiceImpl();
        userService.setEncoder( new BCryptPasswordEncoder() );
        userService.setUserRepository( new UserRepositoryTestImpl() );
        return userService;
    }

    @Test
    public void saveAndFindTest()
    {
        UserService userService = getUserService();
        User user = new User();
        String email = "abc";
        user.setEmail( email );
        String nickname = "123";
        user.setNickname( nickname );
        userService.save( user );
        User u = userService.findByEmail( email );
        assert nickname.equals( u.getNickname() );
    }

    @Test
    public void editData() throws Exception {
        UserService userService = getUserService();
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        User user = new User();
        String email = "abc",
        pass = "pass",
        newNick = "nk",
        newActivity = "act2";
        int newAge = 7;
        user.setEmail( email );
        user.setNickname( "nicky" );
        user.setPassword(encoder.encode( pass ));
        user.setAge( 5 );
        user.setActivity("act");
        userService.save( user );
        userService.edit( email, pass, new User(email, pass, newAge, newNick, newActivity) );
        User newUser = userService.findByEmail( email );
        assert newNick.equals( newUser.getNickname() );
        assert newAge == newUser.getAge();
        assert newNick.equals( newUser.getNickname() );
        assert newActivity.equals( newUser.getActivity() );
    }

    @Test
    public void changePasswordTest() throws Exception {
        passwordTest(true);
    }

    private static void passwordTest(boolean change) throws Exception {
        UserService userService = getUserService();
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        User user = new User();
        String email = "abc",
                pass = "pass",
                newPass = "newPass";
        user.setEmail( email );
        user.setPassword(encoder.encode( pass ));
        userService.save( user );
        userService.edit( email, newPass, new User(email, pass), change );
        User newUser = userService.findByEmail( email );
        assert encoder.matches( newPass, newUser.getPassword() );
    }

    @Test
    public void dropPasswordTest() throws Exception {
        passwordTest( false );
    }

    @Test
    public void changeEmailTest() throws Exception {
        UserService userService = getUserService();
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        User user = new User();
        String email = "abc",
                pass = "pass",
                newEmail = "newEmail";
        user.setEmail( email );
        user.setPassword(encoder.encode( pass ));
        userService.save( user );
        userService.edit( email, pass, new User(newEmail, pass) );
        User newUser = userService.findByEmail( newEmail );
        User oldUser = userService.findByEmail( email );
        assert newUser.getEmail().equals( newEmail );
        assert oldUser == null;
    }
}
