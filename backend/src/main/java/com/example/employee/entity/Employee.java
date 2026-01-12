package com.example.employee.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "employee")
@Data
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String month;
    private int year;
    private String department;
    private int presentDays;
    private int totalDays;
    private int availability;

    // 🔴 THIS LINKS employee -> user
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
