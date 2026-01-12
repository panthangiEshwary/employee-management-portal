package com.example.employee.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "availability")
public class Availability {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;
    private String department;
    private String month;
    private int year;
    private int workingDays;
    private int totalDays;
}
