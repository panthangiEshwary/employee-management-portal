package com.example.employee.dto;

public class EmployeeDashboardResponse {

    private Long id;
    private String name;
    private String email;
    private String month;
    private int year;
    private String department;
    private String workingDays;
    private int availability;

    // ✅ THIS CONSTRUCTOR IS REQUIRED BY JPQL
    public EmployeeDashboardResponse(
            Long id,
            String name,
            String email,
            String month,
            int year,
            String department,
            String workingDays,
            int availability
    ) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.month = month;
        this.year = year;
        this.department = department;
        this.workingDays = workingDays;
        this.availability = availability;
    }

    // ✅ getters (IMPORTANT)
    public Long getId() { return id; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public String getMonth() { return month; }
    public int getYear() { return year; }
    public String getDepartment() { return department; }
    public String getWorkingDays() { return workingDays; }
    public int getAvailability() { return availability; }
}