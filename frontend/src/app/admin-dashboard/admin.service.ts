import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AdminService {

  constructor(private http: HttpClient) {}

  getDashboard() {
    //return this.http.get<any[]>(
      //'http://localhost:8080/api/admin/dashboard'
      return this.http.get('/api/admin/dashboard');
    ;
  }
}
