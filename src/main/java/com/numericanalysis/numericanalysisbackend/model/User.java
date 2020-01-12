package com.numericanalysis.numericanalysisbackend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.annotations.Expose;
import org.checkerframework.common.aliasing.qual.Unique;

import javax.persistence.*;
import java.util.Collection;
import java.util.Objects;

@Entity(name = "users")
//@Table(name = "user")
public class User {/*
    @Id
    @Column(unique=true)
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
    @Expose(deserialize = true, serialize = false)
    private Integer id;*/
    @Expose(deserialize = true, serialize = false)
    @OneToMany(mappedBy = "author", fetch = FetchType.EAGER)
    private Collection<Comment> comments;
    @Id
    @Column(unique=true)
    @Expose
    private String email;
    @Expose(deserialize = true, serialize = false)
    private String password;
    @Expose
    private int age;
    @Expose
    private String nickname;
    @Expose
    private String activity;

    public byte[] getPhoto() {
        return photo;
    }

    public void setPhoto(byte[] photo) {
        this.photo=photo;
    }

    private byte[] photo;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof User)) return false;
        User user = (User) o;
        return age == user.age &&
                email.equals( user.email ) &&
                password.equals( user.password ) &&
                nickname.equals( user.nickname ) &&
                Objects.equals( activity, user.activity );
    }

    @Override
    public String toString() {
        return "User{" +
                "comments=" + comments +
                //", id=" + id +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", age=" + age +
                ", nickname='" + nickname + '\'' +
                ", activity='" + activity + '\'' +
                '}';
    }

    public String toJSON() {
        Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
        return gson.toJson( this );
    }

    @Override
    public int hashCode() {
        return Objects.hash( email, password, age, nickname, activity);
    }

    public User(String email, String password, int age, String nickname, String activity) {
        this.email = email;
        this.password = password;
        this.age = age;
        this.nickname = nickname;
        this.activity = activity;
    }

    public User() {}


    public User(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        if(age < 0 || age > 150)
            throw new IllegalArgumentException("Unreal age");
        this.age = age;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getActivity() {
        return activity;
    }

    public void setActivity(String activity) {
        this.activity = activity;
    }

}
