package com.numericalanalysis.numericalalanalysisbackend.model;

import com.google.gson.Gson;
import com.google.gson.annotations.Expose;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.Collection;
import java.util.Date;
import java.util.Objects;

@DynamicUpdate
@Entity(name = "comment")
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

    @JoinColumn(name = "parent", nullable=true)
    @ManyToOne(optional = true, cascade = CascadeType.ALL)
    private Comment parent = null;

    @Expose(deserialize = false, serialize = true)
    @OneToMany(mappedBy = "parent", fetch = FetchType.EAGER)
    private Collection<Comment> replies;

    public int getNesting() {
        return nesting;
    }

    public void setNesting(int nesting) {
        if(nesting < 0)
            throw new IllegalArgumentException();
        this.nesting = nesting;
    }

    private int nesting = 0;

    public int returnId() {
        return id;
    }
    @Id
    @Column(unique=true)
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    public Comment getParent() {
        return parent;
    }

    public void setParent(Comment parent) {
        this.parent=parent;
    }

    public Collection<Comment> getReplies() {
        return replies;
    }

    public void setReplies(Collection<Comment> replies) {
        this.replies=replies;
    }

    public Comment(Date date,User author,String comment,Origin origin) {
        this.date = date;
        this.origin = origin;
        this.author = author;
        this.comment = comment;
    }

    public Comment(Date date, User author, String comment, Origin origin, int nesting) {
        this.date = date;
        this.nesting = nesting;
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
