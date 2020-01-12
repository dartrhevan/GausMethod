package com.numericanalysis.numericanalysisbackend.controllers;

import com.numericanalysis.numericanalysisbackend.model.User;
import com.numericanalysis.numericanalysisbackend.services.PasswordDropping;
import com.numericanalysis.numericanalysisbackend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.Principal;

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
    public String register(User user,@RequestParam("file")MultipartFile file,Model model) throws IOException {
        //System.out.println( user );
        user.setPassword( encoder.encode( user.getPassword() ) );
        System.out.println(file);
        user.setPhoto(file.getBytes());
        userService.save( user );
        return "redirect:/login";
    }

}
