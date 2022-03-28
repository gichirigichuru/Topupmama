import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from './../../shared/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  currentUser: any = {};
  constructor(
    public authService: AuthService,
    private actRoute: ActivatedRoute,
    public router: Router
  ) {
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.authService.getUserProfile(id).subscribe((res) => {
      this.currentUser = res;
    });
  }
  ngOnInit() {}

  deleteUser(){
    let id = this.actRoute.snapshot.paramMap.get('id');
    alert("Are you sure you want to delete user with id: " + `${id}?`)
    this.authService.deleteUser(id);
    alert("User of id: " + `${id}` + " was deleted.")
    this.router.navigate(['home']);
  }
}