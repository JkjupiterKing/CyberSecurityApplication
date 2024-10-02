package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import jakarta.persistence.EntityManager;

import java.util.List;

@SuppressWarnings("unused")
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    List<User> findByEmail(String emailId);
    
    List<User> findByEmailAndPassword(String emailId, String password);
     
    // Vulnerable query method
    @Query(value = "SELECT * FROM user_table WHERE email = ?1 AND password = ?2", nativeQuery = true)
    List<User> findByEmailAndPasswordVuln(String emailId, String Password);

}