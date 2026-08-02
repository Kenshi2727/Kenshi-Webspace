package dev.kenshi.service.encryption;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @Value("${spring.security.user.name}")
    private String user;

    @GetMapping("/")
    public String greet(){
        return "Welcome "+user+" to Kenshi Webspace Encryption Microservice!";
    }
}
