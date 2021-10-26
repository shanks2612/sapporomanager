import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  currentUser: any;
  nameUser: string = '';
  roleName: string = '';

  isPermission0Admin: boolean = false;
  isPermission0Staff: boolean = false;
  isPermission0User: boolean = false;

  isPermissionProduct: boolean = false;

  isPermissionAccount: boolean = false;

  isPermissionRole: boolean = false;

  constructor() {
    // console.log(localStorage.getItem('currentUser') || 'Blank');
    let currentUser = localStorage.getItem('accountSubject') || 'Blank';
    if (currentUser != 'Blank') {
      this.currentUser = currentUser;
      console.log(JSON.parse(this.currentUser));
      this.nameUser = JSON.parse(this.currentUser).username;
      if(JSON.parse(this.currentUser).roleId == 1) {
        this.roleName = 'Super Admin';
        this.isPermission0Admin = true;
        this.isPermissionProduct = true;
        this.isPermissionAccount = true;
        this.isPermissionRole = true;
      }
      if(JSON.parse(this.currentUser).roleId == 3) {
        this.roleName = 'Nhân viên';
        this.isPermission0Staff = true;
        this.isPermissionProduct = true;
        // this.isPermissionAccount = true;
        // this.isPermissionRole = true;
      }
    }
  }

  ngOnInit(): void {
    console.log(this.isPermissionProduct);
  }

}
