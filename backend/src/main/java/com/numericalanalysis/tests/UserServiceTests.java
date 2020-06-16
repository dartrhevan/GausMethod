package com.numericalanalysis.tests;

import com.numericalanalysis.numericalalanalysisbackend.model.User;
import com.numericalanalysis.numericalalanalysisbackend.repositories.UserRepository;
import com.numericalanalysis.numericalalanalysisbackend.services.UserService;
import com.numericalanalysis.numericalalanalysisbackend.services.UserServiceImpl;
import org.junit.Test;
import org.mockito.Mockito;
import org.mockito.invocation.InvocationOnMock;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.HashMap;
import java.util.Map;

public class UserServiceTests {

    private UserService getUserService() {
        UserService userService = new UserServiceImpl();
        userService.setEncoder( new BCryptPasswordEncoder() );
        userService.setUserRepository( getRepository() );
        return userService;
    }

    final Map<String, User> users = new HashMap<>();

    private UserRepository getRepository() {
        UserRepository repository = Mockito.mock( UserRepository.class );
        Mockito.when(repository.findByEmail(Mockito.anyString())).then(invocationOnMock ->
                users.get( invocationOnMock.getArgument( 0 ) ) );

        Mockito.when(repository.save(Mockito.any(User.class))).then(invocationOnMock -> {
            User user = invocationOnMock.getArgument( 0 );
            users.put(user.getEmail(), user);
            return user;
        });

        Mockito.when( repository.edit( Mockito.anyString(), Mockito.anyString(), Mockito.anyString(),
                Mockito.anyInt(),Mockito.anyString(), Mockito.anyString(), Mockito.any() ) )
                .then( this::edit );

        return repository;
    }

    private int edit(InvocationOnMock invocationOnMock) {
        String email = invocationOnMock.getArgument( 0 ),
                newEmail = invocationOnMock.getArgument(1),
                newPassword = invocationOnMock.getArgument( 2 ),
                nickname = invocationOnMock.getArgument( 4 ),
                activity = invocationOnMock.getArgument( 5 );
        int age = invocationOnMock.getArgument( 3 );
        byte[] photo = invocationOnMock.getArgument( 6 );

        User user = users.get(email);

        user.setEmail(newEmail);
        user.setAge(age);
        user.setPassword(newPassword);
        user.setActivity(activity);
        user.setNickname(nickname);
        user.setPhoto(photo);

        if(!email.equals(newEmail))
        {
            users.remove(email);
            users.put(newEmail, user);
        }

        return 0;
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

    private  void passwordTest(boolean change) throws Exception {
        UserService userService = getUserService();
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        User user = new User();
        String email = "abc",
                pass = "pass",
                newPass = "newPass";
        user.setNickname( "nicky" );
        user.setAge( 5 );
        user.setActivity("act");
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
        user.setNickname( "nicky" );
        user.setAge( 5 );
        user.setActivity("act");
        userService.save( user );
        userService.edit( email, pass, new User(newEmail, pass) );
        User newUser = userService.findByEmail( newEmail );
        User oldUser = userService.findByEmail( email );
        assert newUser.getEmail().equals( newEmail );
        assert oldUser == null;
    }
}
