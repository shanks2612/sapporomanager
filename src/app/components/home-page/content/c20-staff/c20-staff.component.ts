import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/services/api-service/api.service';
import { CommonService } from 'src/app/services/common-service/common.service';
import Swal from 'sweetalert2';
import { debounce, debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { interval } from 'rxjs';

@Component({
  selector: 'app-c20-staff',
  templateUrl: './c20-staff.component.html',
  styleUrls: ['./c20-staff.component.css']
})
export class C20StaffComponent implements OnInit {

  // list data
  listStaff: any = [];
  listStaffWasDeleted: any = [];
  listCheckboxStaff: any[] = [];
  listDistrict: any = [];
  listProvince: any = [];
  listGender: any = [{ "id": 1, "value": "Nam" }, { "id": 0, "value": "Nữ" }]

  deleteStatus: boolean = false;
  staffName: string = '';
  staffId: any;

  historyDelete: number = 0;

  // birthDay: any = Date;

  // update pagination
  page: any = 1;
  // pageIndex: number = 1;
  pageLength = 0;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 20, 50, 100];
  // totalPage: number = 0;

  pageDeleted: any = 1;
  pageSizeDeleted = 5;
  pageSizeOptionsDeleted: number[] = [5, 10, 20, 50, 100];
  pageLengthDeleted = 0;

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

  W600_FIND_ALL_DATA_STAFF: number = 600;
  W602_FIND_DATA_BY_ID: number = 602;
  W603_UPDATE_DATA_STAFF: number = 603;
  W604_DELETE_DATA_BY_ID: number = 604;
  W605_FIND_ALL_DATA_STAFF_WAS_DELETED: number = 605;
  W606_RESTORE_DATA_STAFF_BY_ID: number = 606;
  W607_RESTORE_DATA_STAFF_MULTI_ID: number = 607;

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
    this.onLoadDataStaff();
    this.onLoadDataProvince(); // load data thanh pho
    this.onLoadDataStaffWasDeleted();

  }

  /**
   * TODO: when press button refresh all data 
   */
  refreshAllData(): void {
    this.onLoadDataStaff();
    this.listCheckboxStaff = [];
  }

  /**
  * TODO: this function is load data to table 
  * !error: none
  * *Load data is success
  */
  onLoadDataStaff(): void {
    this.spinner.show();
    this.apiService.selectAllByWhat('', this.W600_FIND_ALL_DATA_STAFF).subscribe({
      next: data => {
        if (data?.status) {
          this.listStaff = data?.data;
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

  addDataStaff() {
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
    this.onLoadDataStaff();
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
  updateStaffData(id: any): void {
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
      text: 'Nhân viên này đã được xóa bởi một người khác, vui lòng nhấn bất kỳ để làm mới!',
      icon: 'warning',
      // showCancelButton: true,
      confirmButtonText: 'OK!',
      // cancelButtonText: 'Không, giữ lại'
    }).then((result) => {
      if (result.value) {
        this.onLoadDataStaff();
        this.listCheckboxStaff = [];
      }
      if (result.dismiss) {
        this.onLoadDataStaff();
        this.listCheckboxStaff = [];
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

  submitDataStaff(): void {
    // console.log('submit data');
    // console.log(this.formUpdate.value);
    this.formUpdate.controls['status'].setValue(2);
    this.formUpdate.controls['gender'].setValue(this.formUpdate.controls['gender'].value == 1 ? true : false)
    this.apiService.selectAllByWhat(JSON.stringify(this.formUpdate.value), this.W603_UPDATE_DATA_STAFF).subscribe({
      next: data => {
        if (data?.status == true) {
          this.onLoadDataStaff();
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

  detailDataStaff(id: any) {
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
      this.listCheckboxStaff.push(id);
    } else {
      this.listCheckboxStaff = this.listCheckboxStaff.filter(m => m != id)
    }
  }

  deleteDataStaff() {
    console.log(this.listCheckboxStaff);
    if (this.listCheckboxStaff.length > 1) {
      Swal.fire('Cảnh báo', 'Vì là thông tin quan trọng vui lòng chọn một tài khoản để thao tác và xóa!', 'warning');
    }
    if (this.listCheckboxStaff.length < 1) {
      Swal.fire('Cảnh báo', 'Vui lòng chọn những hàng mà bạn cần xóa ở cột đầu tiên trong bảng!', 'warning');
    }
    if (this.listCheckboxStaff.length == 1) {
      this.listCheckboxStaff.map(i => {
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
            this.getDataStaffById(i);
          }
        })
      });
    }
  }

  getDataStaffById(id: any): void {
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

          this.staffName = data?.data?.name;
          this.staffId = data?.data?.id;
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
  continueDeleteData(staffId: any) {
    console.log('delete', staffId);
    let accountId = 0;
    this.apiService.selectAllByWhat('', this.W604_DELETE_DATA_BY_ID, staffId)
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
          this.onLoadDataStaff();
        },
        error: error => {
          // handle error
          console.log(error.message);
        },
        complete: () => {
          this.spinner.show();

          setTimeout(() => {
            this.listCheckboxStaff = [];
            let cancelDelete = document.getElementById('cancelDelete');
            cancelDelete?.click();
            // this.spinner.hide();
            this.onLoadDataStaffWasDeleted();
          }, 1500);

          Swal.fire(
            'Thông báo!',
            'Bạn đã xóa nhân viên này thành công!',
            'success'
          )
        }
      })
  }

  /**
   * 
   */
  deleteStaffDataById(id: any) {
    Swal.fire({
      title: 'Cảnh báo',
      text: 'Khi xóa nhân viên này, tài khoản chứa nhân viên này sẽ bị xóa bạn vẫn muốn tiếp tục?',
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Vâng, Tôi sẽ xóa nó!',
      cancelButtonText: 'Không, giữ lại'
    }).then((result) => {
      if (result.value) {
        this.getDataStaffById(id);
      }
    })
  }

  /**
   * TODO: this function is sort category name based on alphabet 
   */
  sortAlphabetFullName() {
    this.spinner.show();
    this.listStaff = this.listStaff.sort((a: any, b: any) => {
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
    this.listStaff = this.listStaff.sort((a: any, b: any) => {
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

  // sortAgeNumber() {
  //   this.listStaff = this.listStaff.sort((a: any, b: any) => {
  //     if (a.age > 0) {
  //       return -1;
  //     } return b.age - a.age
  //   });
  // }

  /**
   * TODO: 
   */
  isReverse: boolean = false;
  sortAlphabetColumn() {
    this.isReverse = !this.isReverse;
    this.listStaff = this.listStaff.sort((a: any, b: any) => {
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
    this.listStaff = this.listStaff.sort((a: any, b: any) => {
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
    this.listStaff = this.listStaff.sort((a: any, b: any) => {
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
  searchDataStaff() {
    if (this.keywordSearch == "") {
      // ngModelChange
      this.onLoadDataStaff();
    } else {
      // .pipe(debounceTime(400), distinctUntilChanged())
      this.listStaff = this.listStaff.filter((res: any) => {
        let nameSearch = this.commonService.cleanTextToSearch(this.keywordSearch);
        let nameResponse = this.commonService.cleanTextToSearch(res?.account?.fullName);
        return nameResponse.toLowerCase().match(nameSearch.toLowerCase());
      })
    }
  }

  showListStaffWasDeleted() {
    let ref = document.getElementById('openModalListDeleted');
    ref?.click();
    this.onLoadDataStaffWasDeleted();
  }

  /**
   * 
   */
  onLoadDataStaffWasDeleted(): void {
    this.spinner.show();
    this.apiService.selectAllByWhat('', this.W605_FIND_ALL_DATA_STAFF_WAS_DELETED).subscribe({
      next: data => {
        console.log(data?.data);
        if (data?.status) {
          this.listStaffWasDeleted = data?.data;
          this.pageLengthDeleted = data?.data.length;
          this.historyDelete = data?.data.length;
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

  /**
   * 
   * @param event 
   */
  onOptionsDeletedSelected(event: any) {
    const value = event.target.value;
    this.pageSizeDeleted = value;
    this.onLoadDataStaffWasDeleted();
  }

  restoreStaffDataById(id: any) {
    console.log(id);
    Swal.fire({
      title: 'Cảnh báo',
      text: 'Bạn chắc chắn muốn khôi phục nhân viên này?',
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Vâng, Tôi chắc chắn!',
      cancelButtonText: 'Không, giữ lại'
    }).then((result) => {
      if (result.value) {
        this.apiService.selectAllByWhat('', this.W606_RESTORE_DATA_STAFF_BY_ID, id).subscribe({
          next: data => {
            if (data?.status == true) {
              this.onLoadDataStaffWasDeleted();
            }
          },
          error: error => {
            console.log(error);
          },
          complete: () => {

            // Swal.fire(
            //   'Thông báo!',
            //   'Bạn đã khôi phục nhân viên này thành công!',
            //   'success'
            // )
            Swal.fire({
              title: 'Thành công',
              text: 'Bạn có muốn tiếp tục không?',
              icon: 'success',
              showCancelButton: true,
              confirmButtonText: 'Vâng, Tôi muốn!',
              cancelButtonText: 'Thoát'
            }).then((result) => {
              if (result.isDenied) {
                let ref = document.getElementById("closeListDeleted");
                ref?.click();
              }
              if (result.isDismissed) {
                let ref = document.getElementById("closeListDeleted");
                ref?.click();
              }
            })
          }
        })
      }
    })
  }

  restoreMultiDataStaff() {
    if (this.listCheckboxStaff.length == 0) {
      Swal.fire('Cảnh báo', 'Vui lòng chọn những hàng mà bạn cần xóa ở cột đầu tiên trong bảng!', 'warning');
    } else {
      Swal.fire({
        title: 'Thông báo',
        text: 'Bạn có muốn xóa những nhân viên này?',
        icon: 'error',
        showCancelButton: true,
        confirmButtonText: 'Vâng, Tôi muốn!',
        cancelButtonText: 'Thoát'
      }).then((result) => {
        if (result.isConfirmed) {
          // this.listCheckboxStaff.map(i => {
          //   console.log(i);
          // });
          console.log(JSON.stringify(this.listCheckboxStaff));
          this.apiService.selectAllByWhat('', this.listCheckboxStaff, this.W607_RESTORE_DATA_STAFF_MULTI_ID).subscribe({
            next: data => {
              if (data?.status == true) {
                this.onLoadDataStaffWasDeleted();
              }
            },
            error: error => {
              console.log(error);
            },
            complete: () => {
              Swal.fire({
                title: 'Thành công',
                text: 'Bạn có muốn tiếp tục không?',
                icon: 'success',
                showCancelButton: true,
                confirmButtonText: 'Vâng, Tôi muốn!',
                cancelButtonText: 'Thoát'
              }).then((result) => {
                if (result.isDenied) {
                  let ref = document.getElementById("closeListDeleted");
                  ref?.click();
                }
                if (result.isDismissed) {
                  let ref = document.getElementById("closeListDeleted");
                  ref?.click();
                }
              })
            }
          })
        }
        if (result.isDenied) {
          let ref = document.getElementById("closeListDeleted");
          ref?.click();
        }
        if (result.isDismissed) {
          let ref = document.getElementById("closeListDeleted");
          ref?.click();
        }
      })
    }
  }
}
