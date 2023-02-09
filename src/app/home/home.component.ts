import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient) { }

  user_name = '';

  ngOnInit(): void {
    let url = 'https://user-auth-rest-api.herokuapp.com/api/list';

    this.http.get<any>(url).subscribe(res => {
      if (res) {

        let u = sessionStorage.getItem('username');
        if(u){
          this.user_name = u;
        }

        console.log('List ', res);
      } else {
          alert("Failed to query list.")
      }
    });
  }


  logout(){
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

}
