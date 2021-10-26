import { ApiService } from 'src/app/services/api-service/api.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MustMatch } from 'src/app/services/validate-service/must-match.validator';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // form register
  formRegister = this.formBuilder.group(
    {
      firstName: ['',
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.minLength(5),
          this.checkValidateTextLength
        ]
      ],
      lastName: ['',
        [
          Validators.required,
          Validators.maxLength(50),
          // Validators.minLength(3),
          this.checkValidateLastNameLength
        ]
      ],
      email: ['',
        [
          Validators.required,
          Validators.email,
          Validators.maxLength(50),
          Validators.minLength(5),
          Validators.pattern(
            '[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}'
          ),
          this.checkValidateTextLength
        ]
      ],
      phone: ['',
        [
          Validators.required,
          Validators.maxLength(12),
          Validators.minLength(9),
          Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")
        ]
      ],
      username: ['',
        [
          Validators.required,
          Validators.pattern("^[a-zA-Z0-9]+$"),
          this.checkValidateTextLength
        ]
      ],
      password: ['',
        [
          Validators.required,
          // Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}'),
          this.checkValidateTextLength
        ]
      ],
      repassword: ['',
        [
          Validators.required,
          this.checkValidateTextLength,
          // this.checkValidateMustMatch
        ]
      ],

    },
    //confirm password
    // {
    //   validator: MustMatch('password', 'repassword'),
    // }
  )

  // number what
  W401_INSERT_DATA_ACCOUNT: number = 401;
  W402_CHECK_EXISTS_ACCOUNT: number = 402;

  W1001_INSERT_DATA_CUSTOMER: number = 1001;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  checkValidateTextLength(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.value.length > 0 && control.value.length <= 5) {
      return { 'minLength': true };
    } else if (control.value.length >= 49) {
      return { 'maxLength': true };
    }
    return null;
  }

  checkValidateLastNameLength(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.value.length > 49) {
      return { 'maxLength': true };
    }
    return null;
  }

  // checkValidateMustMatch(control: AbstractControl): { [key: string]: boolean } | null {
  //   let pass = this.formRegister.controls['password'].value;
  //   let confirmPass = this.formRegister.controls['repassword'].value;
  //   return pass !== confirmPass ? null : { notSame: true }
  // }


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

  submitDataRegister() {
    if (!this.formRegister.valid) {
      // Swal.fire('Thông báo', 'Vui lòng nhập đầy đủ và chính xác thông tin!', 'warning');
      this.validateAllFormFields(this.formRegister);
    } else if (this.formRegister.controls['password'].value != this.formRegister.controls['repassword'].value) {
      Swal.fire('Thông báo', 'Mật khẩu nhập lại không trùng khớp!', 'warning');
      // this.validateAllFormFields(this.formRegister);
    } else {
      const fullName = this.formRegister.controls['firstName'].value + " " + this.formRegister.controls['lastName'].value
      const param = {
        "email": this.formRegister.controls['email'].value,
        "fullName": fullName,
        "password": this.formRegister.controls['password'].value,
        "phone": this.formRegister.controls['phone'].value,
        "roleId": 5,
        "username": this.formRegister.controls['username'].value,
      }
      // check exists data email, sđt, username
      let paramCheckData = {
        "email": this.formRegister.controls['email'].value,
        "phone": this.formRegister.controls['phone'].value,
        "username": this.formRegister.controls['username'].value
      }
      this.spinner.show();
      this.apiService.selectAllByWhat(JSON.stringify(paramCheckData), this.W402_CHECK_EXISTS_ACCOUNT)
        .subscribe({
          next: data => {
            if (data?.data == true && data?.status == true) {
              this.spinner.hide();
              Swal.fire('Thông báo', 'Tài khoản, email hoặc sđt này đã tồn tại!', 'warning');
            } else {
              // after check exists data then submit
              this.insertDataAccountWhenPressSubmit(param);
            }
          },
          error: error => {
            console.log(error.message);
          }
        })
      // this.apiService.selectAllByWhat()
    }
  }

  /**
   * TODO: insert data account when press submit and check exists data
   */
  insertDataAccountWhenPressSubmit(data: any): void {
    // this.spinner.show();
    let accountIdWhenCreated = 0;
    this.apiService.selectAllByWhat(JSON.stringify(data), this.W401_INSERT_DATA_ACCOUNT).subscribe({
      next: data => {
        if (data?.status == true) {
          // binding account id when insert 
          accountIdWhenCreated = data?.data?.id;
          // this.onLoadDataAccount();
        }
      },
      error: error => {
        this.spinner.hide();
        //handle error
        console.log(error);
      },
      complete: () => {
        this.spinner.hide();
        
        // confirm continue created data account based on role
        Swal.fire({
          title: 'Cảnh báo',
          text: 'Bạn đã tạo tài khoản thành công, vui lòng đăng nhập và chỉnh sửa thông tin.',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Tiếp tục!',
        }).then((result) => {
          if (result.value) {
            this.spinner.show();
            console.log(accountIdWhenCreated);
            const newObj = {
              "accountId": `${accountIdWhenCreated}`,
              "status": '1',
              "description": 'No description',
              "address": 'No address',
              "districtId": '1',
              "gender": 'false',
              "provinceId": '1'
            }
            // this.insertDataWithRoleCustomer(newObj);
            this.apiService.selectAllByWhat(newObj, this.W1001_INSERT_DATA_CUSTOMER).subscribe({
              next: data => {
                console.log(data?.data);
                if (data?.status) {
                  this.spinner.hide();
                  // this.formRegister.reset();
                  window.location.href = '/login';
                }
              },
              error: error => {
                this.spinner.hide();
                console.log(error);
              },
            })
          }
        })
      }
    })
  }

  /**
   * 
   * @param data 
   */
  insertDataWithRoleCustomer(data: any) {
    console.log(JSON.stringify(data));
    this.apiService.selectAllByWhat(JSON.stringify(data), this.W1001_INSERT_DATA_CUSTOMER).subscribe({
      next: data => {
        console.log(data?.data);
        if (data?.status) {
          this.spinner.hide();
          // this.formRegister.reset();
          window.location.href = '/login';
        }
      },
      error: error => {
        this.spinner.hide();
        console.log(error);
      },
    })
  }
}
