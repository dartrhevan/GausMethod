package com.numericalanalysis.tests;

import com.numericalanalysis.numericalalanalysisbackend.model.User;
import com.numericalanalysis.numericalalanalysisbackend.repositories.UserRepository;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

public class UserRepositoryTestImpl implements UserRepository {
    private final Map<String, User> users = new HashMap<>();

    @Override
    public User findByEmail(String email) {
        return users.get(email);
    }

    @Override
    public int edit(String email, String newEmail, String newPassword, int age, String nickname, String activity, byte[] photo) {
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
        return 0;//TODO:implement
    }

    @Override
    public <S extends User> S save(S s) {
        users.put(s.getEmail(), s);
        return s;
    }


    //Unnecessary
    @Override
    public List<User> findAll() {
        return null;
    }

    @Override
    public List<User> findAll(Sort sort) {
        return null;
    }

    @Override
    public Page<User> findAll(Pageable pageable) {
        return null;
    }

    @Override
    public List<User> findAllById(Iterable<Integer> iterable) {
        return null;
    }

    @Override
    public long count() {
        return 0;
    }

    @Override
    public void deleteById(Integer integer) {}

    @Override
    public void delete(User user) {}

    @Override
    public void deleteAll(Iterable<? extends User> iterable) {}

    @Override
    public void deleteAll() {}

    @Override
    public <S extends User> List<S> saveAll(Iterable<S> iterable) {
        return null;
    }

    @Override
    public Optional<User> findById(Integer integer) {
        return Optional.empty();
    }

    @Override
    public boolean existsById(Integer integer) {
        return false;
    }

    @Override
    public void flush() {}

    @Override
    public <S extends User> S saveAndFlush(S s) {
        return null;
    }

    @Override
    public void deleteInBatch(Iterable<User> iterable) {}

    @Override
    public void deleteAllInBatch() {}

    @Override
    public User getOne(Integer integer) {
        return null;
    }

    @Override
    public <S extends User> Optional<S> findOne(Example<S> example) {
        return Optional.empty();
    }

    @Override
    public <S extends User> List<S> findAll(Example<S> example) {
        return null;
    }

    @Override
    public <S extends User> List<S> findAll(Example<S> example, Sort sort) {
        return null;
    }

    @Override
    public <S extends User> Page<S> findAll(Example<S> example, Pageable pageable) {
        return null;
    }

    @Override
    public <S extends User> long count(Example<S> example) {
        return 0;
    }

    @Override
    public <S extends User> boolean exists(Example<S> example) {
        return false;
    }
}
