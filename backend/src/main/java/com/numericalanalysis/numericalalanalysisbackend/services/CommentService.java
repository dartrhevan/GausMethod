package com.numericalanalysis.numericalalanalysisbackend.services;

import com.numericalanalysis.numericalalanalysisbackend.model.Comment;
import com.numericalanalysis.numericalalanalysisbackend.model.CommentMessage;
import com.numericalanalysis.numericalalanalysisbackend.model.Origin;

import java.util.Collection;

/**
 * A service for manipulating users
 * @author dartrhevan
 */
public interface CommentService {
    /**
     * Retrieve a comments for a page
     * @param origin - a page of the site for which comments should be retrieved
     * @return comments for a page
     */
    Collection<CommentMessage> getComments(Origin origin);

    /**
     * Save the comment into some storage
     * @param comment - new comment
     */
    void addComment(Comment comment);

    /**
     * Save the responding comment into some storage
     * @param comment - comment to be saved
     * @param parentId - an id of a comment to be replied
     */
    void addComment(Comment comment,int parentId);
}
