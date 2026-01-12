package com.example.employee.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EmployeeUpdateRequest {

    private String department;
    private Integer presentDays;
    private Integer availability;
}
