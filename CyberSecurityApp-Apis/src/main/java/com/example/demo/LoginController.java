package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
public class LoginController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/get-user/{id}")
    public User getUserById(@PathVariable Long id) {
        return userRepository.findById(id).orElse(null);
    }

    @GetMapping("/get-all-users")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @PostMapping("/login")
    public String login(@RequestBody User userIn) {
        System.out.println("Received login request: " + userIn);
        List<User> users = userRepository.findByEmailAndPassword(userIn.getEmail(), userIn.getPassword());
        System.out.println("Users found: " + users);
        if (users.isEmpty()) {
            return "Login Failed";
        } else {
            return "Login Success";
        }
    }
    

    @PostMapping("/register")
    public User register(@RequestBody User userIn) {
        return userRepository.save(userIn);
    }
}
