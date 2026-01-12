package com.example.employee.repository;

import com.example.employee.entity.Availability;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AvailabilityRepository extends JpaRepository<Availability, Long> {

    // ✅ RAW DATA FOR ADMIN DASHBOARD
    @Query(value = """
        SELECT 
            a.id,
            u.name,
            u.email,
            a.month,
            a.year,
            a.department,
            CONCAT(a.working_days, '/', a.total_days),
            ROUND((a.working_days * 100.0) / a.total_days)
        FROM availability a
        JOIN users u ON u.id = a.user_id
        ORDER BY a.year DESC, a.month
    """, nativeQuery = true)
    List<Object[]> getAdminDashboardRaw();
}
