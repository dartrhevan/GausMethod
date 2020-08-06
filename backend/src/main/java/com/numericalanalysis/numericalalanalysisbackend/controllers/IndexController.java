package com.numericalanalysis.numericalalanalysisbackend.controllers;

import com.numericalanalysis.numericalalanalysisbackend.configs.SecurityConfig;
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

    private final BCryptPasswordEncoder encoder;

    private final UserService userService;

    @Autowired
    public IndexController(BCryptPasswordEncoder encoder, UserService userService) {
        this.encoder = encoder;
        this.userService=userService;
    }

    /**
     * Redirects the request to allow react-router handle them
     * @return - redirecting to index.html
     */
    @RequestMapping(value = {"/", "equations", "systems", "interpolation", "login", "registration", "user-information"},method = RequestMethod.GET)
    public String index(Model m) {
        return "forward:/index.html";
    }

    /**
     * Registration
     * @param user - user to be registered
     * @param photo - MultiPart image file to save as an user's photo
     * @param request - used for correct redirect to <b>POST</b> endpoint
     * @return - redirection to Spring Secure login path
     * @throws IOException
     */
    @RequestMapping(value = "/registration", method = RequestMethod.POST)
    public String register(User user, @RequestParam("photo")MultipartFile photo, HttpServletRequest request) throws IOException {
        user.setPassword( encoder.encode( user.getPassword() ) );
        System.out.println(photo);
        user.setPhoto(photo.getBytes());
        userService.save( user );
        /**
         * For correct redirect to <b>POST</b> endpoint
         */
        request.setAttribute( View.RESPONSE_STATUS_ATTRIBUTE, HttpStatus.TEMPORARY_REDIRECT);
        return "redirect:" + SecurityConfig.REGISTRATION_URL;
    }

}
