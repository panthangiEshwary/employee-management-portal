import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface EmployeeAvailability {
  id: number;
  name: string;
  email: string;
  month: string;
  year: number;
  department: string;
  workingDays: string;
  availability: number;
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.css']
})
export class AdminDashboardComponent implements OnInit {

  departments = ['VEDC', 'GUSS', 'EMSS'];
  months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  selectedDepartment = '';
  selectedMonth = '';
  selectedYear = '';

  years: number[] = [];
  employees: EmployeeAvailability[] = [];

  editingId: number | null = null;
  editDepartment = '';
  editWorkingDays = 0;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    console.log('AdminDashboardComponent INIT'); // 🔴 ADDED
    this.loadEmployees();
  }

  loadEmployees() {
    const token = localStorage.getItem('token');

    console.log('Calling /api/admin/dashboard'); // 🔴 ADDED
    console.log('Token:', token);               // 🔴 ADDED

    this.http.get<EmployeeAvailability[]>(
      '/api/admin/dashboard',
      //'http://localhost:8080/api/admin/dashboard',
      { headers: { Authorization: `Bearer ${token}` } }
    ).subscribe({
      next: (res) => {
        console.log('ADMIN DASHBOARD RESPONSE 👉', res); // 🔴 ADDED
        this.employees = res;
        this.years = [...new Set(res.map(e => e.year))];
      },
      error: (err) => {
        console.error('ADMIN DASHBOARD ERROR 👉', err); // 🔴 ADDED
      }
    });
  }

  filteredEmployees() {
    return this.employees.filter(e => {
      const deptOk =
        !this.selectedDepartment || e.department === this.selectedDepartment;

      const monthOk =
        !this.selectedMonth || e.month === this.selectedMonth;

      const yearOk =
        !this.selectedYear || e.year === +this.selectedYear;

      return deptOk && monthOk && yearOk;
    });
  }

  startEdit(emp: EmployeeAvailability) {
    this.editingId = emp.id;
    this.editDepartment = emp.department;
    this.editWorkingDays = Number(emp.workingDays.split('/')[0]);
  }

  cancelEdit() {
    this.editingId = null;
  }

  saveEdit(emp: EmployeeAvailability) {
    const totalDays = Number(emp.workingDays.split('/')[1]);
    const availability = Math.round((this.editWorkingDays * 100) / totalDays);

    const payload = {
      department: this.editDepartment,
      presentDays: this.editWorkingDays,
      availability: availability
    };

    const token = localStorage.getItem('token');

    this.http.put(
      `/api/admin/availability/${emp.id}`,
      //`http://localhost:8080/api/admin/availability/${emp.id}`,
      payload,
      { headers: { Authorization: `Bearer ${token}` } }
    ).subscribe(() => {
      alert('Updated successfully');
      this.loadEmployees();
      this.editingId = null;
    });
  }

  deleteEmployee(id: number) {
    if (!confirm('Delete this record?')) return;

    const token = localStorage.getItem('token');

    this.http.delete(
      `/api/admin/availability/${id}`,
      //`http://localhost:8080/api/admin/availability/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    ).subscribe(() => {
      alert('Record deleted');
      this.loadEmployees();
    });
  }

  logout() {
    localStorage.clear();
    window.location.href = '/login';
  }
}
