package com.numericanalysis.numericanalysisbackend.model;

import javax.persistence.*;
import java.util.Date;
import java.util.Objects;

@Entity
@Table(name = "comment")
public class Comment {
    public Origin getOrigin() {
        return origin;
    }

    public void setOrigin(Origin origin) {
        this.origin = origin;
    }

    private Origin origin;
    private Date date;
    @ManyToOne(optional = false, cascade = CascadeType.ALL)
    @JoinColumn(name = "author_id")
    private User author;
    private String comment;

    public void setId(Integer id) {
        this.id = id;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    public Comment(Date date, User author, String comment, Origin origin) {
        this.date = date;
        this.origin = origin;
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
                comment.equals( comment1.comment ) && origin.equals( comment1.origin );
    }

    @Override
    public int hashCode() {
        return Objects.hash( date, author, comment, origin );
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
