import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }
  
  //get usename and password --2  
  public loginVerify(user: User) {
    //calling webservices and passing data
    console.log(user);
    console.log(environment.roleUrl + "/api/users/login/" + user.UserName + "&" + user.UserPassword);
    return this.httpClient.get(environment.roleUrl + "/api/users/" + user.UserName + "&" + user.UserPassword)
    //return this.httpclient.get(environment.roleUrl + "api/Users/login/"+user.userName+"/"+user.password);

  }

  //LOGOUT
  public logOut() {
    localStorage.removeItem("USERNAME");
    localStorage.removeItem("ACESSROLE");
    sessionStorage.removeItem("USERNAME");
  }

}
