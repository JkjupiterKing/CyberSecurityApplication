package com.example.demo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    //findById
    //findAll
    //save
    List<User> findByEmail(String emailId);
    List<User> findByEmailAndPassword(String emailId, String Password);
}
