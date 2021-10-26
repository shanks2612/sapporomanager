import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/services/api-service/api.service';
import { CommonService } from 'src/app/services/common-service/common.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-c22-supplier',
  templateUrl: './c22-supplier.component.html',
  styleUrls: ['./c22-supplier.component.css']
})
export class C22SupplierComponent implements OnInit {

  // list data
  listSupplier: any = [];
  listCheckboxSupplier: any[] = [];
  listDistrict: any = [];
  listProvince: any = [];
  listGender: any = [{ "id": 1, "value": "Nam" }, { "id": 0, "value": "Nữ" }]

  deleteStatus: boolean = false;
  supplierName: string = '';
  supplierId: any;

  reg: string = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

  // update pagination
  page: any = 1;
  pageIndex: number = 1;
  pageLength = 0;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 20, 50, 100];
  totalPage: number = 0;

  // form data
  formDetail = this.formBuilder.group({
    id: [''],
    accountId: [''],
    address: [''],
    businessLine: [''],
    companyName: [''],
    status: [''],
    supplierName: [''],
    taxCode: [''],
    website: [''],
    provinceId: [''],
    districtId: [''],
    description: [''],
    email: [''],
    fullName: [''],
    phone: [''],
    username: [''],
    roleId: [''],
    createdDate: [''],
    modifiedDate: [''],
    createdBy: [''],
    modifiedBy: ['']
  });

  formUpdate = this.formBuilder.group({
    id: [''],
    accountId: [''],
    address: ['',
      [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(10),
      ]
    ],
    businessLine: ['',
      [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(10),
      ]
    ],
    companyName: ['',
      [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(10),
      ]
    ],
    description: [''],
    districtId: ['',
      [
        Validators.required
      ]
    ],
    provinceId: ['',
      [
        Validators.required
      ]
    ],
    status: [''],
    supplierName: ['',
      [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(10),
      ]
    ],
    taxCode: ['',
      [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(10),
      ]
    ],
    website: ['',
      [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(10),
        Validators.pattern(this.reg)
      ]
    ]
  })

  // number what
  W403_DELETE_ACCOUNT_BY_ID: number = 403;

  W701_FIND_DATA_DISTRICT_BY_PROVINCE_ID: number = 701;

  W800_FIND_ALL_DATA_PROVINCE: number = 800;

  W900_FIND_ALL_DATA_SUPPLIER: number = 900;
  W902_FIND_ALL_DATA_SUPPLIER_BY_ID: number = 902;
  W903_DELETE_DATA_SUPPLIER_BY_ID: number = 903;
  W904_UPDATE_DATA_SUPPLIER: number = 904;

  constructor(
    private apiService: ApiService,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private element: ElementRef,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.onLoadDataSupplier();
    this.onLoadDataProvince();
  }

  /**
   * TODO: when press button refresh all data 
   */
  refreshAllData(): void {
    this.onLoadDataSupplier();
    this.listCheckboxSupplier = [];
  }

  /**
   * TODO: this function is load data to table 
   * !error: none
   * *Load data is success
   */
  onLoadDataSupplier(): void {
    this.spinner.show();
    this.apiService.selectAllByWhat('', this.W900_FIND_ALL_DATA_SUPPLIER).subscribe({
      next: data => {
        console.log(data);
        if (data?.status) {
          this.listSupplier = data?.data;
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
      }
    })
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
   * TODO: this function is get all data is checked from checkbox on table
   * 
   * @param e event when click delete button
   * @param id id pass from Angular form
   */
  getCheckedOnList(e: any, id: any) {
    if (e.target.checked) {
      this.listCheckboxSupplier.push(id);
    } else {
      this.listCheckboxSupplier = this.listCheckboxSupplier.filter(m => m != id)
    }
  }

  /**
   * TODO: this function is select option to show list data 5 record, 10 record,...
   * @param event 
   */
  onOptionsSelected(event: any) {
    const value = event.target.value;
    this.pageSize = value;
    this.onLoadDataSupplier();
  }

  addDataSupplier() {
    Swal.fire({
      title: 'Cảnh báo',
      text: 'Vui lòng tạo tài khoản chọn quyền nhà cung cấp, hệ thống sẽ điều hướng bạn về lại trang để chỉnh sửa?',
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

  deleteDataSupplier() {
    console.log(this.listCheckboxSupplier);
    if (this.listCheckboxSupplier.length > 1) {
      Swal.fire('Cảnh báo', 'Vì là thông tin quan trọng vui lòng chọn một tài khoản để thao tác và xóa!', 'warning');
    }
    if (this.listCheckboxSupplier.length < 1) {
      Swal.fire('Cảnh báo', 'Vui lòng chọn những hàng mà bạn cần xóa ở cột đầu tiên trong bảng!', 'warning');
    }
    if (this.listCheckboxSupplier.length == 1) {
      this.listCheckboxSupplier.map(i => {
        // console.log(i);
        Swal.fire({
          title: 'Cảnh báo',
          text: 'Khi xóa nhà cung cấp này, tài khoản chứa nhà cung cấp này sẽ bị xóa bạn vẫn muốn tiếp tục?',
          icon: 'error',
          showCancelButton: true,
          confirmButtonText: 'Vâng, Tôi sẽ xóa nó!',
          cancelButtonText: 'Không, giữ lại'
        }).then((result) => {
          if (result.value) {
            // console.log('day la lay danh sach cac list check box de kiem tra');
            this.getDataSupplierById(i);
          }
        })
      });
    }
  }

  getDataSupplierById(id: any): void {
    this.apiService.selectAllByWhat('', this.W902_FIND_ALL_DATA_SUPPLIER_BY_ID, id).subscribe({
      next: data => {
        console.log(data);
        if (data?.status == true && data?.data?.deleteStatus == false) {
          this.formDetail.controls['id'].setValue(id);
          this.bindingDataOnFormDetail(data, this.formDetail);
          this.supplierName = data?.data?.name;
          this.supplierId = data?.data?.id;
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

  itemWasDeletedByOtherUserAlert() {
    Swal.fire({
      title: 'Cảnh báo',
      text: 'Nhà cung cấp này đã được xóa bởi một người khác, vui lòng nhấn bất kỳ để làm mới!',
      icon: 'warning',
      // showCancelButton: true,
      confirmButtonText: 'OK!',
      // cancelButtonText: 'Không, giữ lại'
    }).then((result) => {
      if (result.value) {
        this.onLoadDataSupplier();
        this.listCheckboxSupplier = [];
      }
      if (result.dismiss) {
        this.onLoadDataSupplier();
        this.listCheckboxSupplier = [];
      }
    });
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

  changeProvince(e: any) {
    let province = e.target.value;
    console.log(province);
    this.formDetail.controls['provinceId'].setValue(province, {
      onlySelf: true
    });
    this.changeDistrictByProvinceId(province);
  }


  changeDistrict(e: any) {
    let district = e.target.value;
    this.formDetail.controls['districtId'].setValue(district, {
      onlySelf: true
    });
  }

  detailDataSupplier(id: any) {
    this.apiService.selectAllByWhat('', this.W902_FIND_ALL_DATA_SUPPLIER_BY_ID, id).subscribe({
      next: data => {
        console.log(data);
        if (data?.status == true && data?.data?.deleteStatus == false) {
          this.formDetail.controls['id'].setValue(id);
          this.bindingDataOnFormDetail(data, this.formDetail);
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
          let ref = document.getElementById('openModalDetail');
          ref?.click();
        }
      }
    })
  }

  bindingDataOnFormDetail(data: any, form: any) {
    form.controls['accountId'].setValue(data?.data?.accountId);
    form.controls['address'].setValue(data?.data?.address);
    form.controls['businessLine'].setValue(data?.data?.businessLine);
    form.controls['companyName'].setValue(data?.data?.companyName);
    form.controls['status'].setValue(data?.data?.status);
    form.controls['supplierName'].setValue(data?.data?.supplierName);
    form.controls['taxCode'].setValue(data?.data?.taxCode);
    form.controls['website'].setValue(data?.data?.website);
    form.controls['provinceId'].setValue(data?.data?.provinceId);
    form.controls['districtId'].setValue(data?.data?.districtId);
    form.controls['description'].setValue(data?.data?.description);
    form.controls['email'].setValue(data?.data?.account?.email);
    form.controls['fullName'].setValue(data?.data?.account?.fullName);
    form.controls['phone'].setValue(data?.data?.account?.phone);
    form.controls['username'].setValue(data?.data?.account?.username);
    form.controls['roleId'].setValue(data?.data?.account?.roleId);
    form.controls['createdDate'].setValue(data?.data?.account?.createdDate == null ? 'Dữ liệu trống' : moment(data?.data?.account?.createdDate).format('DD/MM/YYYY HH:mm'));
    form.controls['createdBy'].setValue(data?.data?.account?.createdBy ?? 'Dữ liệu trống');
    form.controls['modifiedDate'].setValue(data?.data?.account?.modifiedDate == null ? 'Chưa được chỉnh sửa' : moment(data?.data?.account?.modifiedDate).format('DD/MM/YYYY HH:mm'));
    form.controls['modifiedBy'].setValue(data?.data?.account?.modifiedBy ?? 'Chưa được chỉnh sửa');
  }

  continueDeleteData(supplierId: any) {
    // console.log('delete', staffId);
    let accountId = 0;
    this.apiService.selectAllByWhat('', this.W903_DELETE_DATA_SUPPLIER_BY_ID, supplierId)
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

  continueDeleteAccount(id: any) {
    this.apiService.selectAllByWhat('', this.W403_DELETE_ACCOUNT_BY_ID, id)
      .subscribe({
        next: data => {
          console.log(data);
          this.onLoadDataSupplier();
        },
        error: error => {
          // handle error
          console.log(error.message);
        },
        complete: () => {
          this.spinner.show();

          setTimeout(() => {
            this.listCheckboxSupplier = [];
            let cancelDelete = document.getElementById('cancelDelete');
            cancelDelete?.click();
            // this.spinner.hide();
            // this.onLoadDataStaffWasDeleted();
          }, 1500);

          Swal.fire(
            'Thông báo!',
            'Bạn đã xóa nhà cung cấp này thành công!',
            'success'
          )
        }
      })
  }

  deleteSupplierDataById(id: any) {
    Swal.fire({
      title: 'Cảnh báo',
      text: 'Khi xóa nhà cung cấp này, tài khoản chứa nhà cung cấp này sẽ bị xóa bạn vẫn muốn tiếp tục?',
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Vâng, Tôi sẽ xóa nó!',
      cancelButtonText: 'Không, giữ lại'
    }).then((result) => {
      if (result.value) {
        this.getDataSupplierById(id);
      }
    })
  }

  isSelectFullNameAccount: boolean = false;
  updateSupplierData(id: any): void {
    this.apiService.selectAllByWhat('', this.W902_FIND_ALL_DATA_SUPPLIER_BY_ID, id).subscribe({
      next: data => {
        console.log(data);
        if (data?.status == true && data?.data?.deleteStatus == false) {
          this.formUpdate.controls['id'].setValue(id);
          this.formUpdate.controls['accountId'].setValue(data?.data?.accountId);
          this.formUpdate.controls['address'].setValue(data?.data?.address);
          this.formUpdate.controls['businessLine'].setValue(data?.data?.businessLine);
          this.formUpdate.controls['companyName'].setValue(data?.data?.companyName);
          if (this.isSelectFullNameAccount) {
            this.formUpdate.controls['supplierName'].setValue(data?.data?.account?.fullName);
          } else {
            this.formUpdate.controls['supplierName'].setValue(data?.data?.supplierName);
          }
          // this.formUpdate.controls['supplierName'].setValue(data?.data?.supplierName);
          this.formUpdate.controls['provinceId'].setValue(data?.data?.provinceId);
          this.formUpdate.controls['districtId'].setValue(data?.data?.districtId);
          this.formUpdate.controls['description'].setValue(data?.data?.description);
          this.formUpdate.controls['taxCode'].setValue(data?.data?.taxCode);
          this.formUpdate.controls['website'].setValue(data?.data?.website);
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

  submitUpdateDataSupplier() {
    if (!this.formUpdate.valid) {
      console.log('form dang loi nhap dang hoang di')
    } else {
      console.log(this.formUpdate.value);
      const param = {
        "id": this.formUpdate.controls['id'].value,
        "accountId": this.formUpdate.controls['accountId'].value,
        "address": this.formUpdate.controls['address'].value,
        "businessLine": this.formUpdate.controls['businessLine'].value,
        "companyName": this.formUpdate.controls['companyName'].value,
        "supplierName": this.formUpdate.controls['supplierName'].value,
        "provinceId": this.formUpdate.controls['provinceId'].value,
        "districtId": this.formUpdate.controls['districtId'].value,
        "description": this.formUpdate.controls['description'].value,
        "taxCode": this.formUpdate.controls['taxCode'].value,
        "website": this.formUpdate.controls['website'].value,
        "status": 2
      }
      this.apiService.selectAllByWhat(JSON.stringify(param), this.W904_UPDATE_DATA_SUPPLIER).subscribe({
        next: data => {
          if (data?.status == true) {
            this.onLoadDataSupplier();
          }
        },
        error: error => {
          console.log(error);
        },
        complete: () => {
          // this.onLoadDataProvince();
          this.changeDistrictByProvinceId(this.formUpdate.controls['provinceId'].value);
          let ref = document.getElementById('closeUpdate');
          ref?.click();
          this.spinner.show();
  
          setTimeout(() => {
            this.spinner.hide();
          }, 1500);
  
          Swal.fire(
            'Thông báo!',
            'Bạn đã chỉnh sửa nhà cung cấp này thành công!',
            'success'
          )
        }
      })
    }
  }
}
