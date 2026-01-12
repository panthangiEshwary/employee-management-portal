package com.example.employee.dto;

import lombok.Data;

@Data
public class AvailabilityRequest {
    private String department;
    private String month;
    private int year;
    private int workingDays;
    private int totalDays;
}
