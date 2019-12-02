import { Component, OnInit } from '@angular/core';
import { ApiService } from "../api.service";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent implements OnInit {
  constructor(private api: ApiService, private router: Router) { }

  ngOnInit() {
  }

  async onSubmit(employeeDetails: any) {
    await this.api.addEmployee(employeeDetails);
    this.router.navigate(["/employeeList"]);
  }
}
