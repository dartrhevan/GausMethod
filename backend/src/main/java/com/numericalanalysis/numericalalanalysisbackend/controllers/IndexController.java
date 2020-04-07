package com.numericalanalysis.numericalalanalysisbackend.controllers;

import com.numericalanalysis.numericalalanalysisbackend.model.User;
import com.numericalanalysis.numericalalanalysisbackend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.View;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@Controller
public class IndexController {
    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
    @Autowired
    private UserService userService;
    @RequestMapping(value = {"/", "equations", "systems", "interpolation", "login", "registration", "user-information"},method = RequestMethod.GET)
    public String index(Model m) {
        return "forward:/index.html";
    }
    //@ResponseBody
    @RequestMapping(value = "/registration", method = RequestMethod.POST)
    public String register(User user, @RequestParam("file")MultipartFile file, HttpServletRequest r, Model model) throws IOException {
        //System.out.println( user );
        user.setPassword( encoder.encode( user.getPassword() ) );
        System.out.println(file);
        user.setPhoto(file.getBytes());
        userService.save( user );
        r.setAttribute( View.RESPONSE_STATUS_ATTRIBUTE, HttpStatus.TEMPORARY_REDIRECT);
        return "redirect:/j_spring_security_check";
    }

}
