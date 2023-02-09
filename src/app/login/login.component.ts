import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: any = {"username":"", "password":""};
  sessionId: any = "";

  constructor(
      private router: Router,
      private http: HttpClient
  ) { }

  ngOnInit(): void {
  }

  login() {
    let url = 'https://user-auth-rest-api.herokuapp.com/api/auth/login';

    console.log(this.model);

    if(this.model.username == "" || this.model.password == ""){
      alert("Username & Password Required!");
    }else{
      this.http.post<any>(url, {
        username: this.model.username,
        password: this.model.password
      }).subscribe(res => {
        this.sessionId = res.sessionId;
            
        sessionStorage.setItem(
          'username',
          this.model.username
        );
        sessionStorage.setItem(
          'token',
          this.sessionId
        );
        this.router.navigate(['']);

      },
        error => {
          this.model.username = "";
          this.model.password = "";
          alert("Incorrect Username and/or Password!");
        }
      );
  }
    }



}
