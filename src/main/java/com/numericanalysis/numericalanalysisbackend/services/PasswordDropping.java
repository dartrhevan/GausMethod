package com.numericanalysis.numericalanalysisbackend.services;

import com.numericanalysis.numericalanalysisbackend.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Date;
import java.util.Properties;
import java.util.Random;

@Component
public class PasswordDropping {
    private static final String addresserEmail = "numeranalysis@gmail.com";
    private static final String addresserPassword = "androidos";
    @Autowired
    private BCryptPasswordEncoder encoder;
    @Autowired
    private UserService userService;
    private final Sender sender = new Sender(addresserEmail, addresserPassword);
    private static String generatePassword() {
        StringBuilder res = new StringBuilder();
        Random r = new Random(new Date().getTime());
        for (int i = 0; i < 10; i++)
            res.append((char)(48 + Math.abs(r.nextInt(74))));
        return res.toString();
    }
    public void dropPassword(String email) throws Exception {
        String pswd = generatePassword();
        User user = userService.findByEmail(email);
        userService.edit(email, encoder.encode(pswd), user);
        sender.send("Password dropping", "<h1>Password dropping</h1>Your password has been succesfully dropped. " +
                "<br/>Your new password: " + pswd, addresserEmail, email);
    }
}

class Sender {

    private String username;
    private String password;
    private Properties props;

    public Sender(String username, String password) {
        this.username = username;
        this.password = password;

        props = new Properties();
        props.put("mail.smtp.host", "smtp.gmail.com");
        props.put("mail.smtp.socketFactory.port", "465");
        props.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.ssl.trust", "smtp.gmail.com");
        props.put("mail.smtp.port", "465");
    }

    public void send(String subject, String text, String fromEmail, String toEmail) throws Exception{
        Session session = Session.getDefaultInstance(props, new Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(username, password);
            }
        });
        Message message=new MimeMessage(session);
        //от кого
        message.setFrom(new InternetAddress(fromEmail));
        //кому
        message.setRecipients(Message.RecipientType.TO,InternetAddress.parse(toEmail));
        //тема сообщения
        message.setSubject(subject);
        //текст
        message.setText(text);

        //отправляем сообщение
        Transport.send(message);
    }
}