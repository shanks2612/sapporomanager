import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/services/api-service/api.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // form login
  formLogin = this.formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]]
  })

  // number what
  W405_LOGIN_DATA_ACCOUNT: number = 405;

  //subscription
  subscription: Subscription[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
  }

  @ViewChild('input') input!: ElementRef;
  ngAfterViewInit() {
    this.input.nativeElement.focus();
  }

  onKey(event: any) {
    if (event.key === 'Tab') {
      this.input.nativeElement.focus();
    }
  }
  
  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      console.log(field);
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  deleteStatus: boolean = false;
  submitDataLogin() {
    
    let permissionIdAccount = 0;
    if (!this.formLogin.valid) {
      this.validateAllFormFields(this.formLogin);
    } else {
      this.spinner.show();
      this.apiService.selectAllByWhat(JSON.stringify(this.formLogin.value), this.W405_LOGIN_DATA_ACCOUNT)
        .subscribe({
          next: data => {
            if (data?.data?.deleteStatus) {
              this.deleteStatus = data?.data?.deleteStatus;
              // da xoa tai khoan bi khoa
            } else {
              console.log(data?.data);
              console.log(data?.status);
              console.log(data?.token[0]);
              localStorage.setItem('accountSubject', JSON.stringify(data?.data));
              localStorage.setItem('token', JSON.stringify(data?.token[0]));
              permissionIdAccount = data?.data?.roleId;
              this.deleteStatus = data?.data?.deleteStatus;
            }
          },
          error: error => {
            if (error?.error?.data == null) {
              this.spinner.hide();
              Swal.fire('Thông báo', 'Tài khoản này không tồn tại vui lòng chọn một tài khoản khác, hoặc đăng ký!', 'warning');
            }
            if (error?.name == "HttpErrorResponse") {
              this.spinner.hide();
              Swal.fire('Thông báo', 'Hệ thống đang gặp sự cố và đang được bảo trì!', 'warning');
            }
            console.log(error, 'error');
          },
          complete: () => {
            console.log('complete');
            if (this.deleteStatus) {
              // thong bao tai khoan bi khoa
              this.spinner.hide();
              Swal.fire('Thông báo', 'Tài khoản này đã bị khóa, vui lòng liên hệ ban nhân sự <b>0337560999</b> để mở lại tài khoản!', 'warning');
            } else {
              console.log()
              let rolePermit = permissionIdAccount == 1 || permissionIdAccount == 2 || permissionIdAccount == 3 || permissionIdAccount == 4;
              // admin -> admin
              if (rolePermit) {
                window.location.href = '/manager/home';
                this.spinner.hide();
              } else {
                window.location.href = '/web/home';
                this.spinner.hide();
              }
            }
          }
        })
    }
  }

}
