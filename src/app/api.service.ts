import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private endpoint;
  constructor(private http: HttpClient) {
    this.endpoint = "http://localhost:3000";
  }

  async getEmployees() {
    return this.http.get(this.endpoint + "/api/employees").toPromise();
  }

  async addEmployee(employeeDetails) {
    return this.http.post(this.endpoint + "/api/employees", employeeDetails).toPromise();
  }

  async deleteEmployee(employeeId) {
    return this.http.delete(this.endpoint + "/api/employees/" + employeeId).toPromise();
  }
}