package com.example.employee.repository;

import com.example.employee.dto.EmployeeDashboardResponse;
import com.example.employee.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    @Query("""
        SELECT new com.example.employee.dto.EmployeeDashboardResponse(
            e.id,
            u.name,
            u.email,
            e.month,
            e.year,
            e.department,
            CONCAT(e.presentDays, '/', e.totalDays),
            e.availability
        )
        FROM Employee e
        JOIN e.user u
    """)
    List<EmployeeDashboardResponse> getAdminDashboard();

    // ✅ UPDATE QUERY
    @Modifying
    @Transactional
    @Query("""
        UPDATE Employee e
        SET e.department = :department,
            e.presentDays = :presentDays,
            e.availability = :availability
        WHERE e.id = :id
    """)
    void updateEmployee(
            @Param("id") Long id,
            @Param("department") String department,
            @Param("presentDays") Integer presentDays,
            @Param("availability") Integer availability
    );
}
