import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { DisplayService } from '../shared/display.service';

@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.scss']
})
export class UserhomeComponent implements OnInit {

  loggedUser : string;
  page:number=1;
  filter="";
  constructor(public displayservice: DisplayService,private route:ActivatedRoute,private authService:AuthService,private router : Router) { }

  ngOnInit(): void {
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

}
