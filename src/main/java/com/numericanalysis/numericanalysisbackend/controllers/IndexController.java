package com.numericanalysis.numericanalysisbackend.controllers;

import com.numericanalysis.numericanalysisbackend.model.Comment;
import com.numericanalysis.numericanalysisbackend.model.Origin;
import com.numericanalysis.numericanalysisbackend.model.User;
import com.numericanalysis.numericanalysisbackend.services.CommentService;
import com.numericanalysis.numericanalysisbackend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.security.Principal;
import java.util.Date;

@Controller
public class IndexController {
    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
    @Autowired
    private UserService userService;
    @RequestMapping(value = {"/", "equations", "systems", "interpolation", "login", "registration", "user-information"},method = RequestMethod.GET)
    public String index(Model m) {
        return "forward:/index.html";
    }

    @RequestMapping(value = "/registration", method = RequestMethod.POST)
    public String register(User user, Model model) {
        //System.out.println( user );
        user.setPassword( encoder.encode( user.getPassword() ) );
        userService.save( user );
        return "redirect:/login";
    }


}
