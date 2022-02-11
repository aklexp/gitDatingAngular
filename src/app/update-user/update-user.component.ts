import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../shared/auth.service';
import { DisplayService } from '../shared/display.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {

  userId : number;
  loggedUser : string;

  constructor(public displayservice:DisplayService,private route:ActivatedRoute, 
    private toasterservice: ToastrService,private authService:AuthService,private router : Router) { }

  ngOnInit(): void {
    // get empId from ActivateRouter
    //this.userId = this.route.snapshot.params['empId']
    this.loggedUser = localStorage.getItem("USERNAME");
  }
  onSubmit(form: NgForm) {
    console.log(form.value);

    //call insert 
      this.insertEmployeeRecord(form);

      // call reset form for clear
      this.resetForm(form);
      this.toasterservice.success('Employee record has been inserted', 'EmpApp v2022');

  }
  logOut()
  {
    localStorage.removeItem("USERNAME");
    localStorage.removeItem("ACESSROLE");
    sessionStorage.removeItem("USERNAME");
    this.router.navigateByUrl('login');
  }
  //insert method
  insertEmployeeRecord(form?: NgForm) {
    console.log("Inserting a record..");
    this.displayservice.insertUser(form.value).subscribe
      (
        (result) => {
          console.log(result);
        },
        (error) => {
          console.log(error);
        }
      );
  }
  // clear all contents after submit
  resetForm(form?: NgForm){
    if(form != null){
      form.resetForm();
    }
  }


}
