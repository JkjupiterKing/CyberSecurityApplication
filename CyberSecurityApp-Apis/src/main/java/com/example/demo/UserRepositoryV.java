package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;

import java.util.List;

@SuppressWarnings("unused")
@Repository
public class UserRepositoryV {

    @Autowired
    private EntityManager entityManager;

    @SuppressWarnings("unchecked")
    public List<User> findByEmailAndPassword(String emailId, String password) {
        // System.out.println("Here============");
        String sql = "SELECT * FROM user_table WHERE email =" +emailId + "password = "+ password;
        System.out.println(sql);
        Query query = entityManager.createNativeQuery(sql, User.class);
        // query.setParameter("emailId", emailId);
        // query.setParameter("password", password);
        return query.getResultList();
    }

}