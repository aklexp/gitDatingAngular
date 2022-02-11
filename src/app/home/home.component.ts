import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { DisplayService } from '../shared/display.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  loggedUser : string;
  page:number=1;
  filter="";
  constructor(public displayservice: DisplayService,private route:ActivatedRoute,private authService:AuthService,private router : Router) { }

  ngOnInit(): void {
    //alert('working');
    this.displayservice.bindAllClients();
    this.loggedUser = localStorage.getItem("USERNAME");
  }
  logOut()
  {
    localStorage.removeItem("USERNAME");
    localStorage.removeItem("ACESSROLE");
    sessionStorage.removeItem("USERNAME");
    this.router.navigateByUrl('login');
  }
  //edit employee
  updateUser(userId: number) {
    console.log(userId);
    //navigate to edit form with selected employee details
    this.router.navigate(['updateUser',userId])


  }

}
