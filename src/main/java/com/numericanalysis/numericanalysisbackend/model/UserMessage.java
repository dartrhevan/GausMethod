package com.numericanalysis.numericanalysisbackend.model;


import java.util.Objects;

public class UserMessage {
    public UserMessage(int age,String nickname,String activity) {
        this.age = age;
        this.nickname = nickname;
        this.activity = activity;
    }

    public UserMessage(User user) {
        this.age = user.getAge();
        this.nickname = user.getNickname();
        this.activity = user.getActivity();
        email = user.getEmail();
    }

    private int age;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email=email;
    }

    private String email;
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserMessage that = (UserMessage) o;
        return age == that.age &&
                nickname.equals(that.nickname) &&
                Objects.equals(activity,that.activity);
    }

    @Override
    public int hashCode() {
        return Objects.hash(age,nickname,activity);
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
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

    private String nickname;
    private String activity;
}
