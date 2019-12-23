package com.numericanalysis.numericanalysisbackend.model;

import java.util.Date;
import java.util.Objects;

public class Comment {
    private Date date;
    private User author;
    private String comment;

    public Comment(Date date, User author, String comment) {
        this.date = date;
        this.author = author;
        this.comment = comment;
    }

    public Comment() {}

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Comment)) return false;
        Comment comment1 = (Comment) o;
        return date.equals( comment1.date ) &&
                author.equals( comment1.author ) &&
                comment.equals( comment1.comment );
    }

    @Override
    public int hashCode() {
        return Objects.hash( date, author, comment );
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public User getAuthor() {
        return author;
    }

    public void setAuthor(User author) {
        this.author = author;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
}
