import { Injectable } from '@angular/core';
import { Client } from './client';
import { Report1 } from './report1'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Movie } from './movie';
import { Hobby } from './hobby';

@Injectable({
  providedIn: 'root'
})
export class DisplayService {

  clients:Client[];
  formData:Client=new Client();
  report1:Report1[];
  reportformData:Report1 = new Report1();
  mostHobby:string="";
  movies:Movie[];
  movieFormData:Movie=new Movie();
  hobby : Hobby[];
  hobbyFormData:Hobby = new Hobby();

  constructor(private httpClient:HttpClient) { }
  bindAllClients(){
    this.httpClient.get(environment.apiUrl+'/api/users/getusers')
    .toPromise().then(
        response => {
          console.log(response);
          this.clients = response as Client[];
          console.log(this.clients);
        }
    )
  }
  bindAllMostHobby(){
    console.log("check");
    this.httpClient.get(environment.apiUrl+'/api/Users/GetMostHobby')
    .subscribe(
        response => {
          console.log(response);
          this.mostHobby+response; //= response as string;
          console.log("hobbbyyyy"+this.mostHobby+response);
        },
        error => {
          console.log(error);
        }
        
    )
  }
  
  bindListMovie(){
    this.httpClient.get(environment.apiUrl+'/api/Movies')
    .toPromise().then(
      response=>{
      this.movies=response as Movie[];
        console.log(this.movies);
      }
    )
  }
  bindListHobby(){
    this.httpClient.get(environment.apiUrl+'/api/Hobbies/GetHobbies')
    .toPromise().then(
      response=>{
      this.hobby=response as Hobby[];
        console.log(this.movies);
      }
    )
  }
  
  //most hobby
  getmostHobby() : Observable<any>
  {
    console.log(environment.apiUrl + "/api/Users/GetMostHobby");
    return this.httpClient.get(environment.apiUrl + "/api/Users/GetMostHobby",{responseType: 'text'});

  }

  //get employee by id
  getUserById(Id : number) : Observable<any>
  {
    return this.httpClient.get(environment.apiUrl + "/api/Users/" +Id);
  }

  //insert employee
  insertUser(client : Client) : Observable<any>
  {
    return this.httpClient.post(environment.apiUrl + "/api/Users",client);
  }

  //update employee
  updateUser(client : Client) : Observable<any>
  {
    return this.httpClient.put(environment.apiUrl + "/api/Users",client);
  }

  //delete employee
  DeleteUser(Id : number)
  {
    return this.httpClient.delete(environment.apiUrl + "/api/Users/" +Id);
  }
}
