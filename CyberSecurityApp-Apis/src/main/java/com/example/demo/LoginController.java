package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
public class LoginController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserRepositoryV userRepositoryV;

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

    @PostMapping("/vulnerable-login")
    public ResponseEntity<String> vulnerableLogin(@RequestBody User userIn) {
        System.out.println("Received vulnerable login request: " + userIn);
        
        // This will use the native query which is vulnerable
        List<User> users = userRepositoryV.findByEmailAndPassword(userIn.getEmail(), userIn.getPassword());
        System.out.println("Users found with vulnerable query: " + users);
    
        // Check if any user matched; if so, simulate a successful login response
        if (users.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Vulnerable Login Failed: Invalid credentials");
        } else {
            return ResponseEntity.ok("Vulnerable Login Success");
        }
    }
    

@PostMapping("/safe-login")
public ResponseEntity<String> safeLogin(@RequestBody User userIn) {
    System.out.println("Received safe login request: " + userIn);
    List<User> users = userRepository.findByEmail(userIn.getEmail());

    if (users.isEmpty() || !users.get(0).getPassword().equals(userIn.getPassword())) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Safe Login Failed: Invalid credentials");
    } else {
        return ResponseEntity.ok("Safe Login Success");
    }
}


    @PostMapping("/register")
    public User register(@RequestBody User userIn) {
        return userRepository.save(userIn);
    }
}