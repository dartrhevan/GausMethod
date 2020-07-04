package com.numericalanalysis.numericalalanalysisbackend.controllers;

import com.numericalanalysis.numericalalanalysisbackend.model.Comment;
import com.numericalanalysis.numericalalanalysisbackend.model.CommentMessage;
import com.numericalanalysis.numericalalanalysisbackend.model.NewCommentMessage;
import com.numericalanalysis.numericalalanalysisbackend.services.CommentServiceImpl;
import com.numericalanalysis.numericalalanalysisbackend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;

import java.security.Principal;
import java.util.Collection;
import java.util.Date;

@Controller
public class CommentsController {

    private final UserService userService;
    private final CommentServiceImpl commentService;

    @Autowired
    public CommentsController(UserService userService, @Qualifier("singleInst") CommentServiceImpl commentService) {
        this.userService = userService;
        this.commentService = commentService;
    }

    @Secured("ROLE_USER")
    @MessageMapping("/comment")
    @SendTo("/client/comments")
    public Collection<CommentMessage> comment(NewCommentMessage comment, Principal principal) {
        commentService.addComment(new Comment(new Date(),
                userService.findByEmail(principal.getName()), comment.getComment(), comment.getOrigin()));
        return commentService.getComments(comment.getOrigin());
    }

    @Secured("ROLE_USER")
    @MessageMapping("/reply")
    @SendTo("/client/comments")
    public Collection<CommentMessage> reply(NewCommentMessage comment, Principal principal) {
        commentService.addComment(new Comment(new Date(),
                userService.findByEmail(principal.getName()), comment.getComment(), comment.getOrigin()), comment.getId());
        return commentService.getComments(comment.getOrigin());
    }
}
