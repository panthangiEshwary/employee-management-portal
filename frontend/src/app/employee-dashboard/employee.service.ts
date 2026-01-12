import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class EmployeeService {

  constructor(private http: HttpClient) {}

  private auth() {
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('token')}`
      })
    };
  }

  submitAvailability(data: any) {
  return this.http.post(
    'http://localhost:8080/api/employee/availability',
    data,
    {
      ...this.auth(),
      responseType: 'text'   // 🔥 THIS IS THE FIX
    }
  );
}
}
