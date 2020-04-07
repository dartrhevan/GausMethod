package com.numericalanalysis.numericalalanalysisbackend.services;

import com.numericalanalysis.numericalalanalysisbackend.model.Comment;
import com.numericalanalysis.numericalalanalysisbackend.model.CommentMessage;
import com.numericalanalysis.numericalalanalysisbackend.model.Origin;

import java.util.Collection;

public interface CommentService {
    Collection<CommentMessage> getComments(Origin origin);

    void addComment(Comment comment);

    void addComment(Comment comment,int parentId);
}
