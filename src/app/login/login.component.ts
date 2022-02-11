import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../shared/user';
import { AuthService } from '../shared/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  //declare variables
  loginForm!: FormGroup;
  isSubmitted = false;
  error = '';
  loginUser: any = new User();

  //constructor injection
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group(
      {
        //form control names
        UserName: ['', [Validators.required]],
        UserPassword: ['', [Validators.required]]

      }
    );
  }

  //get controls for validation
  get formControls() {
    return this.loginForm.controls;
  }

  //login Verify
  loginCredentials() {
    this.isSubmitted = true;
    if (this.loginForm.invalid) {
      console.log("Submitted invalid Credentials ");
      this.error = "";
      return;
    }
    if (this.loginForm.valid) {
      console.log("submitted valid credentials")
      this.error = "";
      //calling method from authservice 
      this.authService.loginVerify(this.loginForm.value).subscribe
        (
          data => {
            console.log(data);
            this.loginUser = data;

            sessionStorage.setItem('JwtTOKEN', this.loginUser.token)
            //check the role based on roleid ,it redirects to respective page
            if (this.loginUser.roleId === 2) {
              console.log("ADMIN");
              localStorage.setItem("USERNAME", this.loginUser.userName);
              localStorage.setItem("ACCESSROLE", this.loginUser.roleId);
              sessionStorage.setItem("USERNAME", this.loginUser.userName);
              this.router.navigateByUrl('/home');

            }
            else if (this.loginUser.roleId === 1) {
              console.log("Client");
              localStorage.setItem("USERNAME", this.loginUser.userName);
              localStorage.setItem("ACCESSROLE", this.loginUser.roleId);
              sessionStorage.setItem("USERNAME", this.loginUser.userName);

              this.router.navigateByUrl('/userHome');
            }
            else {
              this.error = "Sorry ! NOT authenticate/authorize to access this module"
            }
          },
          error => {
            this.error = "Invalid username or password try again!"
          }
        );
    }
  }

}
