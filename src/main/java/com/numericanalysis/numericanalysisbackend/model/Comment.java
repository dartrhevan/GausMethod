package com.numericanalysis.numericanalysisbackend.model;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.springframework.web.socket.TextMessage;

import javax.persistence.*;
import java.util.Date;
import java.util.Objects;

@Entity(name = "comment")
//@Table(name = "comment")
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
    @JoinColumn(name = "author")
    private User author;
    private String comment;

    public void setId(Integer id) {
        this.id = id;
    }

    @Id
    @Column(unique=true)
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    public Comment(Date date, User author, String comment, Origin origin) {
        this.date = date;
        this.origin = origin;
        this.author = author;
        this.comment = comment;
    }


    public Comment() {}

    public String toJSON() {
        Gson gson = new Gson();//GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
        return gson.toJson( this );
    }

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
