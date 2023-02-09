import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  model: any = {"username":"", "password":"", "conf_password":""};
  

  constructor(      
    private router: Router,
    private http: HttpClient
    ) { }

  ngOnInit(): void {
  }

  register(){

    let url = 'https://user-auth-rest-api.herokuapp.com/api/auth/register';

    console.log(this.model);

    if(this.model.username == "" || this.model.password == "" || this.model.conf_password == ""){
      alert("All fields must be filled!");
    }else if(this.model.password != this.model.conf_password){
      alert("Password and Confirm Password must match!");
      this.model.password = "";
      this.model.conf_password = "";
    }else{

      this.http.post<any>(url, {
        username: this.model.username,
        password: this.model.password
      }).subscribe(res => {

      },
      error => {
        console.log(error);
        if(error.status == 201){
          alert("User Registered Successfully!");
          this.router.navigate(['/login']);
        }else if(error.status == 400){
          alert(error.error);
          this.model.password = "";
          this.model.conf_password = "";
        }

      });
    }


  }

}
