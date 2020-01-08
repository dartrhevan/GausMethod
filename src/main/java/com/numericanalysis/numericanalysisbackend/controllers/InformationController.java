package com.numericanalysis.numericanalysisbackend.controllers;

import com.google.common.base.Strings;
import com.google.gson.Gson;
import com.numericanalysis.numericanalysisbackend.model.Comment;
import com.numericanalysis.numericanalysisbackend.model.Origin;
import com.numericanalysis.numericanalysisbackend.model.User;
import com.numericanalysis.numericanalysisbackend.services.CommentServiceImpl;
import com.numericanalysis.numericanalysisbackend.services.PasswordDropping;
import com.numericanalysis.numericanalysisbackend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.security.Principal;
import java.util.Date;

@RestController
@RequestMapping("/api")
public class InformationController {
    @Autowired
    private UserService userService;

    @RequestMapping(value = {"/get_user_data"},method = RequestMethod.GET)
    public String getUserData(Model m, Principal principal) {
        if(principal == null)
            return "{\"error\": \"You are not authorized\"}";
        return userService.findByEmail( principal.getName() ).toJSON();
    }

    @RequestMapping(value = {"/get_user_name"},method = RequestMethod.GET)
    public String getUserName(Model m, Principal principal) {
        if(principal == null)
            return "{\"error\": \"You are not authorized\"}";
        return "{ \"user\": \"" + principal.getName() + "\"}";
    }

    @RequestMapping(value = {"/edit_user_data"},method = RequestMethod.POST)
    public void editUserData(HttpServletResponse response, User u, String newPassword, Model m, Principal principal) throws Exception {//TODO: try/catch
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        System.out.println( u );
        System.out.println( newPassword );
        u.setPassword( encoder.encode( u.getPassword() ) );
        if(!Strings.isNullOrEmpty( newPassword ))
            newPassword = encoder.encode( newPassword );

        userService.edit( principal.getName(), newPassword, u );
        response.sendRedirect(u.getEmail().equals(principal.getName()) ? "/" : "/logout");
        //return "{\"error\": \"You are not authorized\"}";
    }

    @RequestMapping(value = "/add_comment", method = RequestMethod.POST)
    public String addComment(String origin,String comment,Model model,Principal principal) throws IOException {
        //return "";
        /*System.out.println(req.getRequestURI());
        System.out.println(req.getRequestURL());
        System.out.println(req.getRemoteAddr());*/
        System.out.println(origin);
        if(principal == null)
            //response.sendRedirect("/login");
            return "{\"error\": \"You are not authorised\"";
        else {
            commentService.addComment(new Comment(new Date(), userService.findByEmail(principal.getName()), comment, Origin.valueOf(origin)));
            //response.sendRedirect(req.getRequestURI());
            return "{}";
        }
    }

    @Autowired
    private CommentServiceImpl commentService;// = CommentService.getInstance();
    private final Gson gson = new Gson();
/*
    InformationController() {
        commentService.getOnCommentAdd().accept(null);//setOnCommentAdd(() -> );
    }*/

    @RequestMapping("/drop_password")
    public String dropPassword(String email, Model model) {
        try{
            passwordDropping.dropPassword(email);
            return "Password has been successfully dropped";
        }
        catch (Exception e)
        {
            return e.getMessage();
        }
    }

    @Autowired
    private PasswordDropping passwordDropping;

}
