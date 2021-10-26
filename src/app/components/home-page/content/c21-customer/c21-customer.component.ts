import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/services/api-service/api.service';
import { CommonService } from 'src/app/services/common-service/common.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-c21-customer',
  templateUrl: './c21-customer.component.html',
  styleUrls: ['./c21-customer.component.css']
})
export class C21CustomerComponent implements OnInit {

  // list data
  listCustomer: any = [];
  listCheckboxCustomer: any[] = [];
  listDistrict: any = [];
  listProvince: any = [];
  listGender: any = [{ "id": 1, "value": "Nam" }, { "id": 0, "value": "Nữ" }]

  deleteStatus: boolean = false;
  customerName: string = '';
  customerId: any;

  // birthDay: any = Date;

  // update pagination
  page: any = 1;
  pageIndex: number = 1;
  pageLength = 0;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 20, 50, 100];
  totalPage: number = 0;

  // form data
  formData = this.formBuilder.group({
    accountId: ['', [Validators.required]],
    code: [''],
  });

  formDetail = this.formBuilder.group({
    id: [''],
    accountId: [0, [Validators.required]],
    address: ['', Validators.required],
    age: [0, [Validators.required]],
    birthDay: ['', [Validators.required]],
    description: [''],
    districtId: [0, [Validators.required]],
    gender: [0, [Validators.required]],
    provinceId: [0, [Validators.required]],
    status: [0],
    email: [''],
    fullName: [''],
    phone: [''],
    username: [''],
    roleId: [0],
    createdDate: [''],
    modifiedDate: [''],
    createdBy: [''],
    modifiedBy: ['']
  });

  formUpdate = this.formBuilder.group({
    id: [''],
    accountId: [0],
    address: ['', Validators.required],
    age: [0, [Validators.required]],
    birthDay: ['', [Validators.required]],
    description: ['', [Validators.maxLength(200)]],
    districtId: [0, [Validators.required]],
    gender: [0, [Validators.required]],
    provinceId: [0, [Validators.required]],
    status: [0]
  });

  // number what
  W403_DELETE_ACCOUNT_BY_ID: number = 403;

  W1000_FIND_ALL_DATA_CUSTOMER: number = 1000;

  W602_FIND_DATA_BY_ID: number = 602;
  W603_UPDATE_DATA_CUSTOMER: number = 603;
  W604_DELETE_DATA_BY_ID: number = 604;

  W700_FIND_ALL_DATA_DISTRICT: number = 700;
  W701_FIND_DATA_DISTRICT_BY_PROVINCE_ID: number = 701;

  W800_FIND_ALL_DATA_PROVINCE: number = 800;

  constructor(
    private apiService: ApiService,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private element: ElementRef,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.onLoadDataCustomer();
    this.onLoadDataProvince(); // load data thanh pho
  }

  /**
   * TODO: when press button refresh all data 
   */
  refreshAllData(): void {
    this.onLoadDataCustomer();
    this.listCheckboxCustomer = [];
  }

  /**
  * TODO: this function is load data to table 
  * !error: none
  * *Load data is success
  */
  onLoadDataCustomer(): void {
    this.spinner.show();
    this.apiService.selectAllByWhat('', this.W1000_FIND_ALL_DATA_CUSTOMER).subscribe({
      next: data => {
        if (data?.status) {
          this.listCustomer = data?.data;
          this.pageLength = data?.data.length;
        }
      },
      error: error => {
        console.log(error);
      },
      complete: () => {
        setTimeout(() => {
          this.spinner.hide();
        }, 1000);
        let ref = document.getElementById('keywordSearch');
        ref?.focus();
      }
    })
  }

  addDataCustomer() {
    Swal.fire({
      title: 'Cảnh báo',
      text: 'Vui lòng tạo tài khoản chọn quyền nhân viên, hệ thống sẽ điều hướng bạn về lại trang để chỉnh sửa?',
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Vâng, Tôi muốn tạo!',
      cancelButtonText: 'Không, ở lại'
    }).then((result) => {
      if (result.value) {
        this.router.navigate(['/manager/account']);
        // console.log('day la lay danh sach cac list check box de kiem tra');
        // this.getDataStaffById(i);
      }
    })
  }

  /**
  * TODO: this function is select option to show list data 5 record, 10 record,...
  * 
  */
  onOptionsSelected(event: any) {
    const value = event.target.value;
    this.pageSize = value;
    this.onLoadDataCustomer();
  }

  /**
   * TODO: This function is load data role for insert and update data in combobox
   */
  onLoadDataProvince(): void {
    this.apiService.selectAllByWhat('', this.W800_FIND_ALL_DATA_PROVINCE).subscribe({
      next: data => {
        this.listProvince = data?.data;
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
   * TODO: This function is get data to update get data by id and binding on text input 
   * 
   * @param id 
   */
  // setAutoAge: number = 0;
  updateCustomerData(id: any): void {
    this.apiService.selectAllByWhat('', this.W602_FIND_DATA_BY_ID, id).subscribe({
      next: data => {
        if (data?.status == true && data?.data?.deleteStatus == false) {
          this.formUpdate.controls['id'].setValue(id);
          this.formUpdate.controls['accountId'].setValue(data?.data?.accountId);
          this.formUpdate.controls['address'].setValue(data?.data?.address);
          this.formUpdate.controls['birthDay'].setValue(data?.data?.birthDay);
          this.formUpdate.controls['age'].setValue(data?.data?.age);
          this.formUpdate.controls['gender'].setValue(data?.data?.gender ? 1 : 0);
          this.formUpdate.controls['provinceId'].setValue(data?.data?.provinceId);
          this.formUpdate.controls['districtId'].setValue(data?.data?.districtId);
          this.formUpdate.controls['description'].setValue(data?.data?.description);
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
          this.changeDistrictByProvinceId(this.formUpdate.controls['provinceId'].value);
          // let ref = document.getElementById('openModalButton');
          // ref?.click();
        }

      }
    })
  }

  itemWasDeletedByOtherUserAlert() {
    Swal.fire({
      title: 'Cảnh báo',
      text: 'Thương hiệu này đã được xóa bởi một người khác, vui lòng nhấn bất kỳ để làm mới!',
      icon: 'warning',
      // showCancelButton: true,
      confirmButtonText: 'OK!',
      // cancelButtonText: 'Không, giữ lại'
    }).then((result) => {
      if (result.value) {
        this.onLoadDataCustomer();
        this.listCheckboxCustomer = [];
      }
      if (result.dismiss) {
        this.onLoadDataCustomer();
        this.listCheckboxCustomer = [];
      }
    });
  }


  changeBirthdayRenderAge(e: any) {
    let date1 = moment(e.target.value).year();
    let date2 = moment().year();
    this.formUpdate.controls['age'].setValue(date2 - date1);
  }

  changeGender(e: any) {
    let gender = e.target.value;
    console.log(gender);
    this.formUpdate.controls['gender'].setValue(gender, {
      onlySelf: true
    });
  }

  changeProvince(e: any) {
    let province = e.target.value;
    console.log(province);
    this.formUpdate.controls['provinceId'].setValue(province, {
      onlySelf: true
    });
    this.changeDistrictByProvinceId(province);
  }

  changeDistrictByProvinceId(id: any) {
    this.apiService.selectAllByWhat('', this.W701_FIND_DATA_DISTRICT_BY_PROVINCE_ID, id).subscribe({
      next: data => {
        if (data?.status == true) {
          // console.log(data?.data);
          this.listDistrict = data?.data;
        }
      },
      error: error => {
        console.log(error);
      }
    })
  }

  changeDistrict(e: any) {
    let district = e.target.value;
    this.formUpdate.controls['districtId'].setValue(district, {
      onlySelf: true
    });
  }

  submitDataCustomer(): void {
    // console.log('submit data');
    // console.log(this.formUpdate.value);
    this.formUpdate.controls['status'].setValue(2);
    this.formUpdate.controls['gender'].setValue(this.formUpdate.controls['gender'].value == 1 ? true : false)
    this.apiService.selectAllByWhat(JSON.stringify(this.formUpdate.value), this.W603_UPDATE_DATA_CUSTOMER).subscribe({
      next: data => {
        if (data?.status == true) {
          this.onLoadDataCustomer();
        }
      },
      error: error => {
        console.log(error);
      },
      complete: () => {
        // this.onLoadDataProvince();
        // this.changeDistrictByProvinceId(this.formUpdate.controls['provinceId'].value);
        let ref = document.getElementById('cancelUpdate');
        ref?.click();
        this.spinner.show();

        setTimeout(() => {
          this.spinner.hide();
        }, 1500);

        Swal.fire(
          'Thông báo!',
          'Bạn đã chỉnh sửa nhân viên này thành công!',
          'success'
        )
      }
    })
  }

  detailDataCustomer(id: any) {
    this.apiService.selectAllByWhat('', this.W602_FIND_DATA_BY_ID, id).subscribe({
      next: data => {
        console.log(data);
        if (data?.status == true && data?.data?.deleteStatus == false) {
          this.formDetail.controls['id'].setValue(id);
          this.formDetail.controls['accountId'].setValue(data?.data?.accountId);
          this.formDetail.controls['address'].setValue(data?.data?.address == '' || data?.data?.address == null ? 'Chưa được chỉnh sửa' : data?.data?.address);
          this.formDetail.controls['birthDay'].setValue(data?.data?.birthDay);
          this.formDetail.controls['age'].setValue(data?.data?.age);
          this.formDetail.controls['gender'].setValue(data?.data?.gender ? 1 : 0);
          this.formDetail.controls['provinceId'].setValue(data?.data?.provinceId);
          this.formDetail.controls['districtId'].setValue(data?.data?.districtId);
          this.formDetail.controls['description'].setValue(data?.data?.description == null || data?.data?.description == '' ? 'Chưa được chỉnh sửa' : data?.data?.description);
          this.formDetail.controls['email'].setValue(data?.data?.account?.email);
          this.formDetail.controls['fullName'].setValue(data?.data?.account?.fullName);
          this.formDetail.controls['phone'].setValue(data?.data?.account?.phone);
          this.formDetail.controls['username'].setValue(data?.data?.account?.username);
          this.formDetail.controls['roleId'].setValue(data?.data?.account?.roleId);
          this.formDetail.controls['createdDate'].setValue(data?.data?.account?.createdDate == null ? 'Dữ liệu trống' : moment(data?.data?.account?.createdDate).format('DD/MM/YYYY HH:mm'));
          this.formDetail.controls['createdBy'].setValue(data?.data?.account?.createdBy ?? 'Dữ liệu trống');
          this.formDetail.controls['modifiedDate'].setValue(data?.data?.account?.modifiedDate == null ? 'Chưa được chỉnh sửa' : moment(data?.data?.account?.modifiedDate).format('DD/MM/YYYY HH:mm'));
          this.formDetail.controls['modifiedBy'].setValue(data?.data?.account?.modifiedBy ?? 'Chưa được chỉnh sửa');
        }
      },
      error: error => {
        // console.log(error?.error);
        if (error?.error?.message.includes('Unable to find') || error?.error?.message.includes('with id')) {
          this.itemWasDeletedByOtherUserAlert()
        } else {
          console.log(error);
        }
      },
      complete: () => {
        if (this.deleteStatus == true) {
          this.itemWasDeletedByOtherUserAlert();
        } else {
          this.changeDistrictByProvinceId(this.formDetail.controls['provinceId'].value);
          // let ref = document.getElementById('openModalButton');
          // ref?.click();
        }
      }
    })
  }

  /**
   * TODO: this function is get all data is checked from checkbox on table
   * 
   * @param e event when click delete button
   * @param id id pass from Angular form
   */
  getCheckedOnList(e: any, id: any) {
    if (e.target.checked) {
      this.listCheckboxCustomer.push(id);
    } else {
      this.listCheckboxCustomer = this.listCheckboxCustomer.filter(m => m != id)
    }
  }

  deleteDataCustomer() {
    console.log(this.listCheckboxCustomer);
    if (this.listCheckboxCustomer.length > 1) {
      Swal.fire('Cảnh báo', 'Vì là thông tin quan trọng vui lòng chọn một tài khoản để thao tác và xóa!', 'warning');
    }
    if (this.listCheckboxCustomer.length < 1) {
      Swal.fire('Cảnh báo', 'Vui lòng chọn những hàng mà bạn cần xóa ở cột đầu tiên trong bảng!', 'warning');
    }
    if (this.listCheckboxCustomer.length == 1) {
      this.listCheckboxCustomer.map(i => {
        // console.log(i);
        Swal.fire({
          title: 'Cảnh báo',
          text: 'Khi xóa nhân viên này, tài khoản chứa nhân viên này sẽ bị xóa bạn vẫn muốn tiếp tục?',
          icon: 'error',
          showCancelButton: true,
          confirmButtonText: 'Vâng, Tôi sẽ xóa nó!',
          cancelButtonText: 'Không, giữ lại'
        }).then((result) => {
          if (result.value) {
            // console.log('day la lay danh sach cac list check box de kiem tra');
            this.getDataCustomerById(i);
          }
        })
      });
    }
  }

  getDataCustomerById(id: any): void {
    this.apiService.selectAllByWhat('', this.W602_FIND_DATA_BY_ID, id).subscribe({
      next: data => {
        if (data?.status == true && data?.data?.deleteStatus == false) {
          this.formDetail.controls['id'].setValue(id);
          this.formDetail.controls['accountId'].setValue(data?.data?.accountId);
          this.formDetail.controls['address'].setValue(data?.data?.address);
          this.formDetail.controls['birthDay'].setValue(data?.data?.birthDay);
          this.formDetail.controls['age'].setValue(data?.data?.age);
          this.formDetail.controls['gender'].setValue(data?.data?.gender ? 1 : 0);
          this.formDetail.controls['provinceId'].setValue(data?.data?.provinceId);
          this.formDetail.controls['districtId'].setValue(data?.data?.districtId);
          this.formDetail.controls['description'].setValue(data?.data?.description);
          this.formDetail.controls['email'].setValue(data?.data?.account?.email);
          this.formDetail.controls['fullName'].setValue(data?.data?.account?.fullName);
          this.formDetail.controls['phone'].setValue(data?.data?.account?.phone);
          this.formDetail.controls['username'].setValue(data?.data?.account?.username);
          this.formDetail.controls['roleId'].setValue(data?.data?.account?.roleId);

          this.customerName = data?.data?.name;
          this.customerId = data?.data?.id;
          this.deleteStatus = data?.data?.deleteStatus;
        } else {
          this.deleteStatus = data?.data?.deleteStatus;
        }
      },
      error: error => {
        // console.log(error?.error);
        if (error?.error?.message.includes('Unable to find') || error?.error?.message.includes('with id')) {
          this.itemWasDeletedByOtherUserAlert()
        } else {
          console.log(error);
        }
      },
      complete: () => {
        if (this.deleteStatus == true) {
          this.itemWasDeletedByOtherUserAlert();
        } else {
          this.changeDistrictByProvinceId(this.formDetail.controls['provinceId'].value);
          let ref = document.getElementById('openModalButton');
          ref?.click();
        }
      },
    })
  }

  /**
   * 
   * @param staffId 
   */
  continueDeleteData(customerId: any) {
    console.log('delete', customerId);
    let accountId = 0;
    this.apiService.selectAllByWhat('', this.W604_DELETE_DATA_BY_ID, customerId)
      .subscribe({
        next: data => {
          if (data?.status == true && data?.data?.deleteStatus == true) {
            accountId = data?.data?.accountId;
          }
        },
        error: error => {
          // handle error
          console.log(error.message);
        },
        complete: () => {
          this.continueDeleteAccount(accountId);
        }
      })
  }

  /**
   * 
   * @param id 
   */
  continueDeleteAccount(id: any) {
    this.apiService.selectAllByWhat('', this.W403_DELETE_ACCOUNT_BY_ID, id)
      .subscribe({
        next: data => {
          console.log(data);
          this.onLoadDataCustomer();
        },
        error: error => {
          // handle error
          console.log(error.message);
        },
        complete: () => {
          this.spinner.show();

          setTimeout(() => {
            this.listCheckboxCustomer = [];
            let cancelDelete = document.getElementById('cancelDelete');
            cancelDelete?.click();
            this.spinner.hide();
          }, 1500);

          Swal.fire(
            'Thông báo!',
            'Bạn đã xóa nhân viên này thành công!',
            'success'
          )
        }
      })
  }

  deleteCustomerDataById(id: any) {
    Swal.fire({
      title: 'Cảnh báo',
      text: 'Khi xóa nhân viên này, tài khoản chứa nhân viên này sẽ bị xóa bạn vẫn muốn tiếp tục?',
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Vâng, Tôi sẽ xóa nó!',
      cancelButtonText: 'Không, giữ lại'
    }).then((result) => {
      if (result.value) {
        this.getDataCustomerById(id);
      }
    })
  }

  /**
   * TODO: this function is sort category name based on alphabet 
   */
  sortAlphabetFullName() {
    this.spinner.show();
    this.listCustomer = this.listCustomer.sort((a: any, b: any) => {
      let x = this.commonService.cleanTextToSearch(a.account?.fullName).toLowerCase();
      let y = this.commonService.cleanTextToSearch(b.account?.fullName).toLowerCase();
      if (x < y) {
        return -1;
      } else {
        return 1;
      }
    })
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }

  /**
   * TODO: 
   */
  sortAlphabetFullNameReverse() {
    this.spinner.show();
    this.listCustomer = this.listCustomer.sort((a: any, b: any) => {
      let x = this.commonService.cleanTextToSearch(a.account?.fullName).toLowerCase();
      let y = this.commonService.cleanTextToSearch(b.account?.fullName).toLowerCase();
      if (x > y) {
        return -1;
      } else {
        return 1;
      }
    })
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }

  sortAgeNumber() {
    this.listCustomer = this.listCustomer.sort((a: any, b: any) => {
      if (a.age > 0) {
        return -1;
      } return b.age - a.age
    });
  }

  /**
   * TODO: 
   */
  isReverse: boolean = false;
  sortAlphabetColumn() {
    this.isReverse = !this.isReverse;
    this.listCustomer = this.listCustomer.sort((a: any, b: any) => {
      let x = this.commonService.cleanTextToSearch(a.account?.fullName).toLowerCase();
      let y = this.commonService.cleanTextToSearch(b.account?.fullName).toLowerCase();
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

  sortByUserName() {
    this.isReverse = !this.isReverse;
    this.listCustomer = this.listCustomer.sort((a: any, b: any) => {
      let x = this.commonService.cleanTextToSearch(a.account?.username).toLowerCase();
      let y = this.commonService.cleanTextToSearch(b.account?.username).toLowerCase();
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

  sortNumberAgeColumn() {
    this.isReverse = !this.isReverse;
    this.listCustomer = this.listCustomer.sort((a: any, b: any) => {
      if (this.isReverse) {
        if (a.age > 0) {
          return -1;
        } return b.age - a.age
      } else {
        if (a.age < 0) {
          return -1;
        } return b.age - a.age
      }
    })
  }

  /**
   * TODO: 
   */
  keywordSearch: any;
  searchDataCustomer() {
    if (this.keywordSearch == "") {
      // ngModelChange
      // this.onLoadDataStaff();
    } else {
      // this.listStaff = this.listStaff.filter((res: { name: string; }) => {
      //   let nameSearch = this.commonService.cleanTextToSearch(this.keywordSearch);
      //   let nameResponse = this.commonService.cleanTextToSearch(res.name);
      //   return nameResponse.toLowerCase().match(nameSearch.toLowerCase());
      // })
    }
  }
}
