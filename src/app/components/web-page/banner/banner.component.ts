import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  // data account 
  accountSubject: any;
  username: string = '';
  roleId: number = 0;
  

  constructor(
    private router: Router,
  ) { 
    console.log(localStorage.getItem('accountSubject') || 'Blank');
    let currentUser = localStorage.getItem('accountSubject') || 'Blank';
    if(currentUser == 'Blank') {
      this.accountSubject = currentUser;
    } else {
      console.log('gan data')
      // account subject
      this.accountSubject = currentUser;
      this.username = JSON.parse(currentUser).username;
      this.roleId = JSON.parse(currentUser).roleId;
    }
    // this.accountSubject = ;
    // this.username = JSON.parse(this.accountSubject).username || '';
  }

  ngOnInit(): void {
    console.log(this.accountSubject);
  }

  logoutUser() {
    localStorage.removeItem("token");
    localStorage.removeItem("accountSubject");
    window.location.href = '/web/home';
    // this.router.navigate(['/web/home']);
  }
}
