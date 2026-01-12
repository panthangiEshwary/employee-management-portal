package com.example.employee.controller;

import com.example.employee.dto.EmployeeDashboardResponse;
import com.example.employee.dto.EmployeeUpdateRequest;
import com.example.employee.entity.Availability;
import com.example.employee.repository.AvailabilityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AvailabilityRepository availabilityRepository;

    // ✅ DASHBOARD DATA (FINAL FIX)
    @GetMapping("/dashboard")
    public List<EmployeeDashboardResponse> getDashboard() {

        List<Object[]> rows = availabilityRepository.getAdminDashboardRaw();

        return rows.stream()
                .map(r -> new EmployeeDashboardResponse(
                        ((Number) r[0]).longValue(),   // id
                        (String) r[1],                 // name
                        (String) r[2],                 // email
                        (String) r[3],                 // month
                        ((Number) r[4]).intValue(),    // year
                        (String) r[5],                 // department
                        (String) r[6],                 // workingDays
                        ((Number) r[7]).intValue()     // availability
                ))
                .collect(Collectors.toList()); // ✅ FIX
    }

    @DeleteMapping("/availability/{id}")
    public void deleteAvailability(@PathVariable Long id) {
        availabilityRepository.deleteById(id);
    }

    @PutMapping("/availability/{id}")
    public void updateAvailability(
            @PathVariable Long id,
            @RequestBody EmployeeUpdateRequest updated) {

        Availability availability = availabilityRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Record not found"));

        availability.setDepartment(updated.getDepartment());
        availability.setWorkingDays(updated.getPresentDays());

        availabilityRepository.save(availability);
    }
}
