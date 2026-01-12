package com.example.employee.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "users")
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;

    // ✅ FIX: Role names MUST start with ROLE_
    public enum Role {
        ROLE_ADMIN,
        ROLE_EMPLOYEE
    }
}
