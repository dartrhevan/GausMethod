package com.numericalanalysis.numericalalanalysisbackend.services;

import com.numericalanalysis.numericalalanalysisbackend.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Date;
import java.util.Properties;
import java.util.Random;

@Component
@PropertySource(value="classpath:db.properties",  ignoreResourceNotFound=true)
public class PasswordDropping {
    private static String addresserEmail = null;//"numeranalysis@gmail.com";
    private static String addresserPassword = null;
    @Autowired
    private BCryptPasswordEncoder encoder;
    @Resource
    private Environment env;
    @Autowired
    private UserService userService;

    private static String generatePassword() {
        StringBuilder res = new StringBuilder();
        Random r = new Random(new Date().getTime());
        for (int i = 0; i < 10; i++)
            res.append((char)(48 + Math.abs(r.nextInt(74))));
        return res.toString();
    }
    public void dropPassword(String email) throws Exception {
        String pswd = generatePassword();
        if(addresserEmail == null) addresserEmail = env.getProperty( "email_address" );
        if(addresserPassword == null) addresserPassword = env.getProperty( "email_password" );
        Sender sender = new Sender(addresserEmail, addresserPassword);
        User user = userService.findByEmail(email);
        userService.edit(email, pswd, user, false);
        sender.send("Password dropping", "Password dropping\nYour password has been succesfully dropped. " +
                "\nYour new password: " + pswd, addresserEmail, email);
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
        props.put("mail.smtp.host", "smtp.mail.ru");
        props.put("mail.smtp.socketFactory.port", "465");
        props.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.ssl.trust", "smtp.mail.ru");
        props.put("mail.smtp.port", "465");
    }

    public void send(String subject, String text, String fromEmail, String toEmail) throws Exception {
        Session session = Session.getDefaultInstance(props, new Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(username, password);
            }
        });
        Message message = new MimeMessage(session);
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