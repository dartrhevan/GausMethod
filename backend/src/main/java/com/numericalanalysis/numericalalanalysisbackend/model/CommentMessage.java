package com.numericalanalysis.numericalalanalysisbackend.model;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.Objects;
import java.util.stream.Collectors;

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
        this.id = comment.returnId();
        this.nesting = comment.getNesting();
        this.parentId = comment.getParent() != null ? comment.getParent().returnId() : 0;
        this.replies = comment.getReplies() == null ? new ArrayList<>() : comment.getReplies().parallelStream().map(CommentMessage::new).collect(Collectors.toList());
    }


    public int getNesting() {
        return nesting;
    }

    public void setNesting(int nesting) {
        if(nesting < 0)
            throw new IllegalArgumentException();
        this.nesting = nesting;
    }

    public Collection<CommentMessage> getReplies() {
        return replies;
    }

    public void setReplies(Collection<CommentMessage> replies) {
        this.replies=replies;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id=id;
    }

    private Collection<CommentMessage> replies;
    private int nesting = 0;
    private int id;
    private Date date;

    public int getParentId() {
        return parentId;
    }

    public void setParentId(int parentId) {
        this.parentId=parentId;
    }

    private int parentId = 0;
}
