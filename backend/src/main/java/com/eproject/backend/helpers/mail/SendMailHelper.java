package com.eproject.backend.helpers.mail;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

public class SendMailHelper {

    public Boolean sendHTMLMail(String content, String sendToMail, JavaMailSender javaMailSender) throws MessagingException {
        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "utf-8");
            message.setContent(content, "text/html");
            helper.setTo(sendToMail);
            helper.setSubject("Test send HTML email");
            javaMailSender.send(message);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

}
