package com.numericalanalysis.numericalalanalysisbackend.controllers;

import com.numericalanalysis.numericalalanalysisbackend.model.Comment;
import com.numericalanalysis.numericalalanalysisbackend.model.CommentMessage;
import com.numericalanalysis.numericalalanalysisbackend.model.Origin;
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

    @Autowired
    private UserService userService;


    @Autowired
    @Qualifier("singleInst")
    private CommentServiceImpl commentService;

    @Secured("ROLE_USER")
    @MessageMapping("/comment")
    @SendTo("/client/comments")
    public Collection<CommentMessage> comment(String origin, String comment, Principal principal) throws Exception {
        System.out.println(origin);
        commentService.addComment(new Comment(new Date(),
                userService.findByEmail(principal.getName()), comment, Origin.valueOf(origin)));
        return commentService.getComments(Origin.valueOf(origin));
    }

    @Secured("ROLE_USER")
    @MessageMapping("/reply")
    @SendTo("/client/comments")
    public Collection<CommentMessage> reply(String origin, String comment, int id, Principal principal) throws Exception {
        System.out.println(origin);
        commentService.addComment(new Comment(new Date(),
                userService.findByEmail(principal.getName()), comment, Origin.valueOf(origin)), id);
        return commentService.getComments(Origin.valueOf(origin));
    }
}
