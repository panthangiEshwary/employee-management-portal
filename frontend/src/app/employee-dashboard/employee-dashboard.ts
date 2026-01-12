import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from './employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-dashboard.html',
  styleUrls: ['./employee-dashboard.css']
})
export class EmployeeDashboardComponent implements OnInit {

  
  // FIX: strongly typed user
  //user: { name: string; email: string } | null = null;

  user!: { name: string; email: string };
  departments = ['VEDC', 'GUSS', 'EMSS'];

  months = [
    { label: 'Jan', value: 1 },
    { label: 'Feb', value: 2 },
    { label: 'Mar', value: 3 },
    { label: 'Apr', value: 4 },
    { label: 'May', value: 5 },
    { label: 'Jun', value: 6 },
    { label: 'Jul', value: 7 },
    { label: 'Aug', value: 8 },
    { label: 'Sep', value: 9 },
    { label: 'Oct', value: 10 },
    { label: 'Nov', value: 11 },
    { label: 'Dec', value: 12 }
  ];

  years: number[] = [];

  selectedDepartment = '';
  selectedMonth: number | null = null;
  selectedYear: number | null = null;

  daysInMonth = 0;
  workingDays = 0;

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      this.router.navigate(['/login']);
      return;
    }
    this.user = JSON.parse(userStr);

    const year = new Date().getFullYear();
    this.years = Array.from({ length: 6 }, (_, i) => year - i);
  }

  onMonthOrYearChange() {
    if (this.selectedMonth && this.selectedYear) {
      this.daysInMonth = new Date(
        this.selectedYear,
        this.selectedMonth,
        0
      ).getDate();
      this.workingDays = 0;
    }
  }

  submit() {
    if (
      !this.selectedDepartment ||
      this.selectedMonth === null ||
      this.selectedYear === null ||
      this.workingDays <= 0 ||
      this.workingDays > this.daysInMonth
    ) {
      return;
    }

    const monthLabel =
      this.months.find(m => m.value === this.selectedMonth)?.label;

    this.employeeService.submitAvailability({
      department: this.selectedDepartment,
      month: monthLabel,
      year: this.selectedYear,
      workingDays: this.workingDays,
      totalDays: this.daysInMonth
    }).subscribe({
      next: () => alert('Submitted successfully'),
      error: () => alert('Submission failed')
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
