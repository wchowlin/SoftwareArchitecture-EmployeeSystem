import { Component, OnInit } from '@angular/core';
import { ApiService } from "../api.service";

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  public employees
  constructor(private api: ApiService) { }

  ngOnInit() {
    this.getEmployees();
  }

  async getEmployees() {
    this.employees = await this.api.getEmployees();
  }

  async deleteEmployee(employeeId) {
    console.log(employeeId);
    await this.api.deleteEmployee(employeeId);
    await this.getEmployees();
  }
}
