import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/services/api-service/api.service';
import { CommonService } from 'src/app/services/common-service/common.service';
import { ValidateService } from 'src/app/services/validate-service/validate.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-c2-account',
  templateUrl: './c2-account.component.html',
  styleUrls: ['./c2-account.component.css']
})
export class C2AccountComponent implements OnInit {

  // list data
  listDataAccount: any = [];
  listDataRole: any = [];
  listCheckboxAccount: any = [];

  // sort filter
  offset: number = 1;
  limit: number = 5;
  fieldToSort: string = "id";
  fieldDirToSort: string = "desc";
  deleteStatus: boolean = false;

  // replaceRegex = /^((\+1)|1)? ?\(?(\d{3})\)?[ .-]?(\d{3})[ .-]?(\d{4})( ?(ext\.? ?|x)(\d*))?$/gi;

  // update pagination
  page: any = 1;
  pageIndex: number = 1;
  pageLength = 0;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 20, 50, 100];
  totalPage: number = 0;

  // form data
  formData = this.formBuilder.group({
    fullName: ['', [Validators.required]],
    username: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9]+$")]],
    phone: ['',
      [
        Validators.required,
        Validators.maxLength(12),
        Validators.minLength(9),
        Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")
      ]
    ],
    email: ['',
      [
        Validators.required, Validators.pattern(
          '[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}'
        ),
        this.validate.checkValidateEmail
      ]
    ],
    password: ['', [Validators.required]],
    roleId: ['', [Validators.required]]
  });

  formDetail = this.formBuilder.group({
    fullName: [''],
    username: [''],
    phone: [''],
    email: [''],
    roleName: [''],
    createdDate: [''],
    createdBy: [''],
    modifiedDate: [''],
    modifiedBy: ['']
  });

  formUpdate = this.formBuilder.group({
    id: [''],
    fullName: ['', [Validators.required]],
    username: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9]+$")]],
    phone: ['',
      [
        Validators.required,
        Validators.maxLength(12),
        Validators.minLength(9),
        Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")
      ]
    ],
    email: ['',
      [
        Validators.required, Validators.pattern(
          '[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}'
        ),
        this.validate.checkValidateEmail
      ]
    ],
    roleId: ['', [Validators.required]]
  });

  regexPattern = /\-?\d*\.?\d{1,2}/;
  formGoToPage = this.formBuilder.group({
    numberPage: [1, [Validators.pattern(this.regexPattern)]]
  })

  // number what
  W400_FIND_ALL_DATA_ACCOUNT: number = 400;
  W401_INSERT_DATA_ACCOUNT: number = 401;
  W402_CHECK_EXISTS_ACCOUNT: number = 402;
  W403_DELETE_DATA_ACCOUNT_BY_ID: number = 403;
  W404_FIND_ALL_DATA_BY_ID: number = 404;
  W406_UPDATE_DATA_ACCOUNT: number = 406;
  W407_FILTER_DATA_ACCOUNT_BY_ROLE: number = 407;
  W408_FIND_ALL_DATA_PAGING: number = 408;

  W500_FIND_ALL_DATA_ROLE: number = 500;

  W601_INSERT_DATA_STAFF: number = 601;

  W901_INSERT_DATA_SUPPLIER: number = 901;

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private spinner: NgxSpinnerService,
    private validate: ValidateService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.onLoadDataAccount(this.page, this.pageSize, this.fieldToSort, this.fieldDirToSort);
    this.onLoadDataRole();
  }

  /**
   * TODO: when press button refresh all data 
   */
  refreshAllData(): void {
    this.onLoadDataAccount(this.page, this.pageSize, this.fieldToSort, this.fieldDirToSort);
    this.listCheckboxAccount = [];
  }

  /**
   * TODO: This function is load data account to show table
   * !error: none
   * *Load data and binding data for listDataAccount and set page length
   */
  onLoadDataAccount(offset: number, limit: number, sortField: string, sortDir: string): void {
    this.spinner.show();
    let objectNew = {
      "offset": offset,
      "limit": limit,
      "sortField": sortField,
      "sortDir": sortDir
    };
    this.apiService.selectAllByWhat(JSON.stringify(objectNew), this.W408_FIND_ALL_DATA_PAGING).subscribe({
      next: data => {
        if (data?.status == true) {
          console.log(data?.data);
          this.listDataAccount = data?.data?.results;
          this.pageLength = data?.data?.totalPage;
        }
      },
      error: error => {
        console.log(error);
      },
      complete: () => {
        setTimeout(() => {
          this.spinner.hide();
        }, 1000);
        let ref = document.getElementById("keywordSearch");
        ref?.focus();
      }
    })
  }


  onPageChange(event: any) {
    let pageNumber = event;
    this.page = pageNumber;
    this.onLoadDataAccount(this.page, this.pageSize, this.fieldToSort, this.fieldDirToSort);
  }

  submitGoToPage() {
    if (!this.formGoToPage.valid) {
      Swal.fire({
        title: 'Thông báo',
        text: 'Trang bạn muốn đến không tồn tại, vui lòng thử lại!',
        icon: 'warning',
        confirmButtonText: 'ok',
      }).then((result) => {
        // press any out screen
        if (result.isConfirmed) {
          this.page = 1;
          this.formGoToPage.controls['numberPage'].setValue(1);
          this.onLoadDataAccount(this.page, this.pageSize, this.fieldToSort, this.fieldDirToSort);
        }
      })
    } else {
      this.page = this.formGoToPage.controls["numberPage"].value;
      this.onLoadDataAccount(this.page, this.pageSize, this.fieldToSort, this.fieldDirToSort);
    }
  }

  /**
   * TODO: This function is load data role for insert and update data in combobox
   * !error: none
   * *Load data and binding data for listDataRole and pass on combobox
   */
  onLoadDataRole(): void {
    this.apiService.selectAllByWhat('', this.W500_FIND_ALL_DATA_ROLE).subscribe({
      next: data => {
        this.listDataRole = data?.data;
      },
      error: error => {
        console.log(error);
      },
      complete: () => {
        // console.log(this.listDataRole);
      }
    })
  }

  /**
   * TODO: when press submit button add account
   */
  submitDataAccount(): void {
    console.log(this.formData.controls['roleId'].value);
    if (this.formData.controls['roleId'].value === 5) {
      Swal.fire('Thông báo', 'Quyền khách hàng vui lòng để khách hàng đăng ký!', 'warning');
    } else {
      // check exists data email, sđt, username
      let newObj = {
        "email": this.formData.controls['email'].value,
        "phone": this.formData.controls['phone'].value,
        "username": this.formData.controls['username'].value
      }
      this.apiService.selectAllByWhat(JSON.stringify(newObj), this.W402_CHECK_EXISTS_ACCOUNT)
        .subscribe({
          next: data => {
            if (data?.data == true && data?.status == true) {
              Swal.fire('Thông báo', 'Tài khoản, email hoặc sđt này đã tồn tại!', 'warning');
            } else {
              // after check exists data then submit
              this.insertDataAccountWhenPressSubmit();
            }
          },
          error: error => {
            console.log(error.message);
          }
        })
    }
  }

  /**
   * TODO: insert data account when press submit and check exists data
   */
  insertDataAccountWhenPressSubmit(): void {
    this.spinner.show();
    let accountIdWhenCreated = 0;
    this.apiService.selectAllByWhat(JSON.stringify(this.formData.value), this.W401_INSERT_DATA_ACCOUNT).subscribe({
      next: data => {
        if (data?.status == true) {
          // binding account id when insert 
          accountIdWhenCreated = data?.data?.id;
          this.onLoadDataAccount(this.page, this.pageSize, this.fieldToSort, this.fieldDirToSort);
        }
      },
      error: error => {
        //handle error
        console.log(error);
      },
      complete: () => {

        let ref = document.getElementById('cancelSubmit');
        ref?.click();

        setTimeout(() => {
          this.spinner.hide();
        }, 1500);
        // confirm continue created data account based on role
        Swal.fire({
          title: 'Cảnh báo',
          text: 'Bạn đã tạo tài khoản thành công, vui lòng nhấn tiếp tục để chỉnh sửa thông tin. Trong vòng 24h nếu bạn không chỉnh sửa thì tài khoản này sẽ bị khóa.',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Tiếp tục!',
          cancelButtonText: 'Thoát'
        }).then((result) => {
          if (result.value) {
            // this.formData.controls['roleId'].value == 3 insert data with role staff
            if (this.formData.controls['roleId'].value === 3) {
              let newObj = {
                "accountId": accountIdWhenCreated,
                "status": 1
              }
              this.insertDataWithRoleStaff(newObj);
            }

            // this.formData.controls['roleId'].value == 4 insert data with role supplier
            if (this.formData.controls['roleId'].value === 4) {
              let newObj = {
                "accountId": accountIdWhenCreated,
                "status": 1
              }
              this.insertDataWithRoleSupplier(newObj);
            }

            // this.formData.controls['roleId'].value == 5 insert data with role customer
            // confirm data "Khach hang co the tu them data ma ban khong can tao, ban van muon tao tk"

            // role 1: super admin and role 2: admin
            if (this.formData.controls['roleId'].value === 1 || this.formData.controls['roleId'].value === 2) {
              Swal.fire(
                'Thông báo!',
                'Bạn đã thêm tài khoản thành công!',
                'success'
              )
            }
          }
        })
      }
    })
  }

  /**
   * TODO: this function is insert data account with role staff
   * @param param 
   */
  insertDataWithRoleStaff(param: any) {
    this.apiService.selectAllByWhat(JSON.stringify(param), this.W601_INSERT_DATA_STAFF).subscribe({
      next: data => {
        console.log(data);
      },
      error: error => {
        //handle error
        console.log(error);
      },
      complete: () => {
        this.resetFormData();
        this.router.navigate(['/manager/staff']);
      }
    })
  }

  /**
   *  TODO: this function is insert data account with role supplier
   * @param param 
   */
  insertDataWithRoleSupplier(param: any) {
    this.apiService.selectAllByWhat(JSON.stringify(param), this.W901_INSERT_DATA_SUPPLIER).subscribe({
      next: data => {
        console.log(data);
      },
      error: error => {
        //handle error
        console.log(error);
      },
      complete: () => {
        this.resetFormData();
        this.router.navigate(['/manager/supplier']);
      }
    })
  }

  /**
   * TODO: this function is confirm before close add data
   */
  confirmBeforeCloseAddAccount(): void {
    let isNull = this.formData.controls['fullName'].value == '' &&
      this.formData.controls['username'].value == '' &&
      this.formData.controls['phone'].value == '' &&
      this.formData.controls['email'].value == '' &&
      this.formData.controls['password'].value == '' &&
      this.formData.controls['roleId'].value == '';
    if (isNull) {
      let ref = document.getElementById('cancelSubmit');
      ref?.click();
    } else {
      Swal.fire({
        title: 'Cảnh báo',
        text: 'Bạn đã chưa lưu những gì đã nhập bạn vẫn muốn tiếp tục thoát?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Thoát!',
        cancelButtonText: 'Không, giữ lại'
      }).then((result) => {
        if (result.value) {
          let ref = document.getElementById('cancelSubmit');
          ref?.click();
          this.resetFormData();
        }
      })
    }
  }

  /**
   * TODO: this function is reset form data
   */
  resetFormData(): void {
    this.formData.controls['fullName'].setValue('');
    this.formData.controls['username'].setValue('');
    this.formData.controls['phone'].setValue('');
    this.formData.controls['email'].setValue('');
    this.formData.controls['password'].setValue('');
    this.formData.controls['roleId'].setValue('');
  }

  /**
   * TODO: this function is select option to show list data 5 record, 10 record,...
   * 
   */
  onOptionsSelected(event: any) {
    const value = event.target.value;
    // console.log(value);
    this.pageSize = value;
    this.onLoadDataAccount(this.page, this.pageSize, this.fieldToSort, this.fieldDirToSort);
  }

  /**
   * TODO: this function is push alert when check id was deleted by other people and id not exists
   */
  itemWasDeletedByOtherUserAlert() {
    Swal.fire({
      title: 'Cảnh báo',
      text: 'Tài khoản này đã được xóa bởi một người khác, vui lòng nhấn bất kỳ để làm mới!',
      icon: 'warning',
      confirmButtonText: 'OK!',
    }).then((result) => {
      if (result.value) {
        this.onLoadDataAccount(this.page, this.pageSize, this.fieldToSort, this.fieldDirToSort);
        this.listCheckboxAccount = [];
      }
      if (result.dismiss) {
        this.onLoadDataAccount(this.page, this.pageSize, this.fieldToSort, this.fieldDirToSort);
        this.listCheckboxAccount = [];
      }
    });
  }

  /**
   * TODO: This function is find all data by id and binding data on formDetail
   * 
   * @param id 
   */
  showDetailData(id: any) {
    // console.log(id);
    this.apiService.selectAllByWhat('', this.W404_FIND_ALL_DATA_BY_ID, id).subscribe({
      next: data => {
        // console.log(data);
        if (data?.status == true && data?.data?.deleteStatus == false) {
          this.formDetail.controls['fullName'].setValue(data?.data?.fullName ?? 'Thông tin trống');
          this.formDetail.controls['username'].setValue(data?.data?.username ?? 'Thông tin trống');
          this.formDetail.controls['phone'].setValue(this.commonService.formatPhoneDisplay(data?.data?.phone) ?? 'Thông tin trống');
          this.formDetail.controls['email'].setValue(data?.data?.email ?? 'Thông tin trống');
          this.formDetail.controls['roleName'].setValue(data?.data?.role?.name ?? 'Thông tin trống');
          this.formDetail.controls['createdDate'].setValue(moment(data?.data?.createdDate).format('DD-MM-YYYY HH:mm') ?? 'Thông tin trống');
          this.formDetail.controls['createdBy'].setValue(data?.data?.createdBy ?? 'Thông tin trống');
          this.formDetail.controls['modifiedDate'].setValue(moment(data?.data?.modifiedDate).format('DD-MM-YYYY HH:mm') ?? 'Thông tin trống');
          this.formDetail.controls['modifiedBy'].setValue(data?.data?.modifiedBy ?? 'Thông tin trống');
          this.bindingDataOnForm(this.formDetail, data);
          this.deleteStatus = data?.data?.deleteStatus;
        } else {
          this.deleteStatus = data?.data?.deleteStatus;
        }
      },
      error: error => {
        console.log(error);
      },
      complete: () => {
        if (this.deleteStatus) {
          this.itemWasDeletedByOtherUserAlert();
        } else {
          let ref = document.getElementById('openModalDetail');
          ref?.click();
        }
      }
    })
  }

  /**
   * 
   * @param formBinding 
   * @param data 
   */
  bindingDataOnForm(formBinding: any, data: any) {
    formBinding.controls['fullName'].setValue(data?.data?.fullName ?? 'Thông tin trống');
    formBinding.controls['username'].setValue(data?.data?.username ?? 'Thông tin trống');
    formBinding.controls['phone'].setValue(this.commonService.formatPhoneDisplay(data?.data?.phone) ?? 'Thông tin trống');
    formBinding.controls['email'].setValue(data?.data?.email ?? 'Thông tin trống');
    formBinding.controls['roleName'].setValue(data?.data?.role?.name ?? 'Thông tin trống');
    formBinding.controls['createdDate'].setValue(moment(data?.data?.createdDate).format('DD-MM-YYYY HH:mm') ?? 'Thông tin trống');
    formBinding.controls['createdBy'].setValue(data?.data?.createdBy ?? 'Thông tin trống');
    formBinding.controls['modifiedDate'].setValue(moment(data?.data?.modifiedDate).format('DD-MM-YYYY HH:mm') ?? 'Thông tin trống');
    formBinding.controls['modifiedBy'].setValue(data?.data?.modifiedBy ?? 'Thông tin trống');
  }

  /**
   * TODO: This function is get data by id to binding on form update
   * 
   * @param id equal id of account
   */
  updateAccountData(id: any) {
    this.apiService.selectAllByWhat('', this.W404_FIND_ALL_DATA_BY_ID, id).subscribe({
      next: data => {
        console.log(data);
        if (data?.status == true && data?.data?.deleteStatus == false) {
          this.formUpdate.controls['id'].setValue(id);
          this.formUpdate.controls['email'].setValue(data?.data?.email);
          this.formUpdate.controls['fullName'].setValue(data?.data?.fullName);
          this.formUpdate.controls['roleId'].setValue(data?.data?.roleId);
          this.formUpdate.controls['username'].setValue(data?.data?.username);
          this.formUpdate.controls['phone'].setValue(data?.data?.phone);
          this.deleteStatus = data?.data?.deleteStatus;
        } else {
          this.deleteStatus = data?.data?.deleteStatus;
        }
      },
      error: error => {
        // console.log(error?.error);
        if (error?.error?.message.includes('Unable to find') || error?.error?.message.includes('with id')) {
          this.itemWasDeletedByOtherUserAlert();
        } else {
          console.log(error);
        }
      },
      complete: () => {
        if (this.deleteStatus == true) {
          this.itemWasDeletedByOtherUserAlert();
        } else {
          let ref = document.getElementById('openModalUpdate');
          ref?.click();
        }
      }
    })
  }

  /**
   * TODO: this function is check data account when click submit data update
   */
  saveUpdateDataAccount() {
    this.spinner.show()
    // console.log(this.formUpdate.value);
    let paramCheckData = {
      "email": this.formUpdate.controls['email'].value,
      "phone": this.formUpdate.controls['phone'].value,
      "username": this.formUpdate.controls['username'].value
    }
    this.apiService.selectAllByWhat(JSON.stringify(paramCheckData), this.W402_CHECK_EXISTS_ACCOUNT)
      .subscribe({
        next: data => {
          if (data?.data == true && data?.status == true) {
            this.spinner.hide();
            Swal.fire('Thông báo', 'Tài khoản, email hoặc sđt này đã tồn tại!', 'warning');
          } else {
            // after check exists data then submit
            this.updateDataAccount(this.formUpdate.value);
          }
        },
        error: error => {
          console.log(error.message);
        }
      })
  }

  /**
   * TODO: next step check data exists them update data on database
   * 
   * @param param 
   */
  updateDataAccount(param: any) {
    this.apiService.selectAllByWhat(JSON.stringify(param), this.W406_UPDATE_DATA_ACCOUNT).subscribe({
      next: data => {
        console.log(data);
        if (data?.status == true) {
          this.onLoadDataAccount(this.page, this.pageSize, this.fieldToSort, this.fieldDirToSort);
        }
      },
      error: error => {
        console.log(error);
      },
      complete: () => {
        let ref = document.getElementById("closeFormUpdate");
        ref?.click();

        setTimeout(() => {
          this.spinner.hide();
        }, 1500);

        Swal.fire(
          'Thông báo!',
          'Bạn đã chỉnh sửa tài khoản này thành công!',
          'success'
        )
      }
    })
  }

  @ViewChild('searchTerm') input!: ElementRef;

  keywordSearch: any;
  functionToCallOnKeyUp() {
    if (this.keywordSearch == "") {
      // ngModelChange
      this.onLoadDataAccount(this.page, this.pageSize, this.fieldToSort, this.fieldDirToSort);
    } else {
      this.listDataAccount = this.listDataAccount.filter((res: { fullName: string; }) => {
        let nameSearch = this.commonService.cleanTextToSearch(this.keywordSearch);
        let nameResponse = this.commonService.cleanTextToSearch(res.fullName);
        return nameResponse.toLowerCase().match(nameSearch.toLowerCase());
      })
    }
  }

  /**
   * 
   * 
   * @param role 
   */
  selectValueAccountByRole(role: any) {
    this.spinner.show();
    let objectNew = {
      "roleId": role.id,
      "offset": this.offset,
      "limit": this.limit,
      "sortField": this.fieldToSort,
      "sortDir": this.fieldDirToSort
    };
    this.apiService.selectAllByWhat(JSON.stringify(objectNew), this.W407_FILTER_DATA_ACCOUNT_BY_ROLE).subscribe({
      next: data => {
        if (data?.status == true) {
          this.listDataAccount = data?.data;
          this.pageLength = data?.data.length;
        }
      },
      error: error => {
        if (error?.error?.status == 400) {
          console.log('Day ra page 400', error);
        } else {
          console.log(error);
        }
      },
      complete: () => {
        setTimeout(() => {
          this.spinner.hide();
        }, 1000);
        let ref = document.getElementById("keywordSearch");
        ref?.focus();
      }
    })
  }

  /**
   * TODO: sort alphabet in column 
   */
  isReverse: boolean = false;
  sortAlphabetColumn() {
    this.isReverse = !this.isReverse;
    this.listDataAccount = this.listDataAccount.sort((a: any, b: any) => {
      let x = this.commonService.cleanTextToSearch(a.fullName).toLowerCase();
      let y = this.commonService.cleanTextToSearch(b.fullName).toLowerCase();
      if (this.isReverse) {
        if (x > y) {
          return -1;
        } else {
          return 1;
        }
      } else {
        if (x < y) {
          return -1;
        } else {
          return 1;
        }
      }
    })
  }

  sortAlphabetColumnUsername() {
    this.isReverse = !this.isReverse;
    this.listDataAccount = this.listDataAccount.sort((a: any, b: any) => {
      let x = this.commonService.cleanTextToSearch(a.username).toLowerCase();
      let y = this.commonService.cleanTextToSearch(b.username).toLowerCase();
      if (this.isReverse) {
        if (x > y) {
          return -1;
        } else {
          return 1;
        }
      } else {
        if (x < y) {
          return -1;
        } else {
          return 1;
        }
      }
    })
  }

  sortNumberPhoneColumn() {
    this.isReverse = !this.isReverse;
    this.listDataAccount = this.listDataAccount.sort((a: any, b: any) => {
      if (this.isReverse) {
        if (a.phone > 0) {
          return -1;
        } return b.phone - a.phone
      } else {
        if (a.phone < 0) {
          return -1;
        } return b.phone - a.phone
      }
    })
  }
}
