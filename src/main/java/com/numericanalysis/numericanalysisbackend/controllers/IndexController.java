package com.numericanalysis.numericanalysisbackend.controllers;

import com.numericanalysis.numericanalysisbackend.model.User;
import com.numericanalysis.numericanalysisbackend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@Controller
public class IndexController {/*
    @RequestMapping(value = {"/test"},method = RequestMethod.GET)
    public String test(Model m) {
        return "OK!";
    }
*/
    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
    @Autowired
    private UserService userService;
    @RequestMapping(value = {"/", "equations", "systems", "interpolation", "login", "registration"},method = RequestMethod.GET)
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

/*
    @RequestMapping(value = {"/interpolation.html"},method = RequestMethod.GET)
    public String interpol(Model m) {
        return "forward:/interpolation.html";
    }*/
}
