package com.numericalanalysis.numericalalanalysisbackend.model;

public class NewCommentMessage {
    private int id;
    private Origin origin;
    private String comment;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id=id;
    }

    public Origin getOrigin() {
        return origin;
    }

    public void setOrigin(Origin origin) {
        this.origin=origin;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment=comment;
    }
}
