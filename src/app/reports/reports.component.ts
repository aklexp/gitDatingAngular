import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../shared/auth.service';
import { DisplayService } from '../shared/display.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  userId: number;
  loggedUser: string;
  page:number=1;
  filter="";
  mostHobby:string="";

  constructor(public displayservice: DisplayService, private route: ActivatedRoute,
    private toasterservice: ToastrService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    // get empId from ActivateRouter
    //this.userId = this.route.snapshot.params['empId']
    this.loggedUser = localStorage.getItem("USERNAME");

   // get most hobby
    this.displayservice.getmostHobby().subscribe(
      result => {
        console.log(result);
        //this.displayservice.reportformData=Object.assign(result);
        this.mostHobby = result;
      }
    );
    this.displayservice.bindAllMostHobby();
    this.displayservice.bindListMovie();
    this.displayservice.bindListHobby();
    // console.log("hobbyyyyy");
    // console.log(this.displayservice.reportformData);
  }
  logOut() {
    localStorage.removeItem("USERNAME");
    localStorage.removeItem("ACESSROLE");
    sessionStorage.removeItem("USERNAME");
    this.router.navigateByUrl('login');
  }
}
