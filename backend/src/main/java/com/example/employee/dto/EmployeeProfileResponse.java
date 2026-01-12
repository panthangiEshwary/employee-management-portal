package com.example.employee.dto;

public class EmployeeProfileResponse {

    private String name;
    private String email;

    public EmployeeProfileResponse(String name, String email) {
        this.name = name;
        this.email = email;
    }

    public String getName() { return name; }
    public String getEmail() { return email; }
}
