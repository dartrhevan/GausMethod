package com.numericanalysis.numericanalysisbackend.model;

import java.util.Date;
import java.util.Objects;

public class CommentMessage {
    private Origin origin;
    private String comment;
    private UserMessage author;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CommentMessage that = (CommentMessage) o;
        return origin == that.origin &&
                comment.equals(that.comment) &&
                author.equals(that.author) &&
                Objects.equals(date,that.date);
    }

    @Override
    public int hashCode() {
        return Objects.hash(origin,comment,author,date);
    }

    public Origin getOrigin() {
        return origin;
    }

    public void setOrigin(Origin origin) {
        this.origin = origin;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public UserMessage getAuthor() {
        return author;
    }

    public void setAuthor(UserMessage author) {
        this.author = author;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public CommentMessage(Origin origin,String comment,UserMessage author,Date date) {
        this.origin = origin;
        this.comment = comment;
        this.author = author;
        this.date = date;
    }


    public CommentMessage(Comment comment) {
        this.origin = comment.getOrigin();
        this.comment = comment.getComment();
        this.author = new UserMessage(comment.getAuthor());
        this.date = comment.getDate();
    }

    private Date date;
}
