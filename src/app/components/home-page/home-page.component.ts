import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(
    private router: Router,
    private spinner: NgxSpinnerService,
  ) {
    // let checkValidInfo = localStorage.getItem('accountSubject') || '';
    // if (checkValidInfo == '') {
    //   this.router.navigate(['/not-permit']);
    // } else {
    //   let role = JSON.parse(localStorage.getItem('accountSubject') || '');
    //   if (role == null || role == '') {
    //     this.spinner.show();
    //     this.router.navigate(['/not-permit']);
    //     setTimeout(() => {
    //       this.spinner.hide();
    //     }, 1000);
    //   } else {
    //     if (role.roleId != 5) {
    //       this.spinner.show();
    //       this.router.navigate(['/manager/home']);
    //       setTimeout(() => {
    //         this.spinner.hide();
    //       }, 1000);
    //     } else {
    //       this.spinner.show();
    //       this.router.navigate(['/web/home'])
    //       setTimeout(() => {
    //         this.spinner.hide();
    //       }, 1000);
    //     }
    //   }
    // }
  }

  ngOnInit(): void {
  }

}
