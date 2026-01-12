package com.example.employee.controller;

import com.example.employee.dto.AvailabilityRequest;
import com.example.employee.dto.EmployeeProfileResponse;
import com.example.employee.entity.Availability;
import com.example.employee.entity.User;
import com.example.employee.repository.AvailabilityRepository;
import com.example.employee.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/employee")
@RequiredArgsConstructor
public class EmployeeController {

    private final UserRepository userRepository;
    private final AvailabilityRepository availabilityRepository;

    // ✅ EMPLOYEE DASHBOARD (NAME + EMAIL)
    @GetMapping("/dashboard")
    public EmployeeProfileResponse employeeDashboard(Authentication authentication) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return new EmployeeProfileResponse(
                user.getName(),
                user.getEmail()
        );
    }

    // ✅ SUBMIT AVAILABILITY
    @PostMapping("/availability")
    public String submitAvailability(
            @RequestBody AvailabilityRequest request,
            Authentication authentication
    ) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Availability availability = new Availability();
        availability.setUserId(user.getId());
        availability.setDepartment(request.getDepartment());
        availability.setMonth(request.getMonth());
        availability.setYear(request.getYear());
        availability.setWorkingDays(request.getWorkingDays());
        availability.setTotalDays(request.getTotalDays());

        availabilityRepository.save(availability);

        return "Availability submitted successfully";
    }
}
