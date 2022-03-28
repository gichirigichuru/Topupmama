import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { User } from 'src/app/shared/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  users!: User[];
  lat: any;
  lng: any;

  constructor(private http: HttpClient, private authService: AuthService, public router: Router) { }

  ngOnInit() {
    this.users = []
    this.getLocation()
  }

  public getUsers(){
    this.http.get<any>('https://reqres.in/api/users').subscribe(res => {
      this.users = res.data;
      // data contains actual array of users
  });
  }

  viewProfile(id: any){
    this.authService.getUserProfile(id);
    this.router.navigate(['user-profile/' + id]);
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: any) => {
        if (position) {
          console.log("Latitude: " + position.coords.latitude +
            "Longitude: " + position.coords.longitude);
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
          console.log(this.lat);
          console.log(this.lat);
        }
      },
        (error: any) => console.log(error));
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

}
