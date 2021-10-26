import { pipe } from 'rxjs';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/services/api-service/api.service';
import { CommonService } from 'src/app/services/common-service/common.service';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import { ValidateService } from 'src/app/services/validate-service/validate.service';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-c13-brand',
  templateUrl: './c13-brand.component.html',
  styleUrls: ['./c13-brand.component.css']
})
export class C13BrandComponent implements OnInit {

  // list data
  listBrands: any = [];
  listProducts: any = [];
  listCheckboxBrand: any[] = [];

  // update pagination
  page: any = 1;
  pageIndex: number = 1;
  pageLength = 0;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 20, 50, 100];
  totalPage: number = 0;

  // sort filter
  fieldToSort: string = "id";
  fieldDirToSort: string = "desc";

  // form data
  formData = this.formBuilder.group({
    name: ['', [Validators.required, this.validate.brandNameValidate]],
    code: [''],
  });

  formDetail = this.formBuilder.group({
    id: [''],
    name: [''],
    code: [''],
    createdDate: [''],
    createdBy: [''],
    modifiedDate: [''],
    modifiedBy: ['']
  });

  formUpdate = this.formBuilder.group({
    id: [''],
    name: ['', [Validators.required, this.validate.brandNameValidate]],
    code: ['', Validators.required]
  });

  regexPattern = /\-?\d*\.?\d{1,2}/;
  formGoToPage = this.formBuilder.group({
    numberPage: [1, [Validators.pattern(this.regexPattern)]]
  })

  // number what
  W200_SELECT_ALL_BRAND: number = 200;
  W201_DELETE_DATA_BRAND: number = 201;
  W202_INSERT_DATA_BRAND: number = 202;
  W203_CHECK_EXISTS_BRAND: number = 203;
  W204_DELETE_DATA_BY_ID: number = 204;
  W205_DETAIL_DATA_BY_CODE: number = 205;
  W206_UPDATE_DATA_BRAND: number = 206;
  W207_GET_DATA_BY_ID: number = 207;
  W208_SELECT_ALL_DATA_BRAND_PAGING = 208;

  W301_FIND_ALL_DATA_BY_BRAND_ID: number = 301;

  constructor(
    private apiService: ApiService,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private validate: ValidateService
  ) { }

  ngOnInit(): void {
    this.onLoadDataBrand(this.page, this.pageSize, this.fieldToSort, this.fieldDirToSort);
  }

  onPageChange(event: any) {
    let pageNumber = event;
    this.page = pageNumber;
    this.onLoadDataBrand(this.page, this.pageSize, this.fieldToSort, this.fieldDirToSort);
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
          this.onLoadDataBrand(this.page, this.pageSize, this.fieldToSort, this.fieldDirToSort);
        }
      })
    } else {
      this.page = this.formGoToPage.controls["numberPage"].value;
      this.onLoadDataBrand(this.page, this.pageSize, this.fieldToSort, this.fieldDirToSort);
    }
  }
  /**
   * TODO: this function is refresh data 
   */
  refreshAllData(): void {
    this.fieldToSort = "id";
    this.fieldDirToSort = "desc";
    this.onLoadDataBrand(this.page, this.pageSize, this.fieldToSort, this.fieldDirToSort);
    this.listCheckboxBrand = [];
  }

  /**
   * TODO: this function is load data product by category id
   * *Load data is success
   * @param id 
   */
  onLoadDataProduct(id: any): void {
    this.apiService.selectAllByWhat('', this.W301_FIND_ALL_DATA_BY_BRAND_ID, id)
      .subscribe({
        next: data => {
          this.listProducts = data?.data;
        },
        error: error => {
          console.log(error);
        },
        complete: () => {

        }
      })
  }

  /**
   * TODO: this function is load data to table 
   * !error: none
   * *Load data is success
   */
  onLoadDataBrand(offset: number, limit: number, sortField: string, sortDir: string): void {
    this.spinner.show();
    let objectNew = {
      "offset": offset - 1,
      "limit": limit,
      "sortField": sortField,
      "sortDir": sortDir
    };
    this.apiService.selectAllByWhat(JSON.stringify(objectNew), this.W208_SELECT_ALL_DATA_BRAND_PAGING)
      .subscribe({
        next: data => {
          if (data?.status == true) {
            // console.log(data?.status);
            console.log(data?.data?.results);
            console.log(data?.data?.totalPage);
            this.listBrands = data?.data?.results;
            this.pageLength = data?.data?.totalPage;
          }
        },
        error: error => {
          if (error?.error?.message.includes('Page index must not be less than zero')) {
            this.spinner.hide();
            Swal.fire('Thông báo', 'Trang không được nhỏ hơn hoặc bằng 0!', 'warning');
          }
        },
        complete: () => {
          setTimeout(() => {
            this.spinner.hide();
          }, 500);
          let focusSearch = document.getElementById('keywordSearch');
          focusSearch?.focus();
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
    this.onLoadDataBrand(this.page, this.pageSize, this.fieldToSort, this.fieldDirToSort);
  }

  /**
  * TODO: this function is get all data is checked from checkbox on table
  * 
  * @param e event when click delete button
  * @param id id pass from Angular form
  */
  getCheckedOnList(e: any, id: any) {
    if (e.target.checked) {
      this.listCheckboxBrand.push(id);
    } else {
      this.listCheckboxBrand = this.listCheckboxBrand.filter(m => m != id)
    }
  }

  /**
   * TODO: this function is delete data from table with list checkbox to checked
   * !small error: not show alert when delete success
   * *Delete data category success
   */
  brandName: string = '';
  brandId: any;
  deleteStatus: boolean = false;
  deleteDataBrand(): void {
    if (this.listCheckboxBrand.length > 1) {
      Swal.fire('Cảnh báo', 'Vì là thông tin quan trọng vui lòng chọn một thương hiệu để thao tác và xóa!', 'warning');
    }
    if (this.listCheckboxBrand.length < 1) {
      Swal.fire('Cảnh báo', 'Vui lòng chọn những hàng mà bạn cần xóa ở cột đầu tiên trong bảng!', 'warning');
    }
    if (this.listCheckboxBrand.length == 1) {
      this.listCheckboxBrand.map(i => {
        Swal.fire({
          title: 'Cảnh báo',
          text: 'Khi xóa thương hiệu này, các sản phẩm quan trọng thuộc thương hiệu này sẽ bị xóa bạn vẫn muốn tiếp tục?',
          icon: 'error',
          showCancelButton: true,
          confirmButtonText: 'Vâng, Tôi sẽ xóa nó!',
          cancelButtonText: 'Không, giữ lại'
        }).then((result) => {
          if (result.value) {
            // get data brand to show confirm delete
            this.getDataBrandById(i);
          }
        })
      });
    }
  }

  /**
   * TODO: this function is get data brand by id
   * 
   * @param id 
   */
  getDataBrandById(id: any): void {
    this.apiService.selectAllByWhat('', this.W207_GET_DATA_BY_ID, id).subscribe({
      next: data => {
        // binding data is delete status is false: show data
        if (data?.status == true && data?.data?.deleteStatus == false) {
          this.brandName = data?.data?.name;
          this.brandId = data?.data?.id;
          this.deleteStatus = data?.data?.deleteStatus;
          // else delete status is true: was deleted
        } else {
          this.deleteStatus = data?.data?.deleteStatus;
        }
      },
      error: error => {
        if (error?.error?.message.includes('Unable to find') || error?.error?.message.includes('with id')) {
          this.itemWasDeletedByOtherUserAlert();
        } else {
          console.log(error);
        }
      },
      complete: () => {
        // delete status == true: was deleted show alert 
        if (this.deleteStatus == true) {
          this.itemWasDeletedByOtherUserAlert();
          // delete status == false: show data product by category id
        } else {
          this.onLoadDataProduct(id);
          // show popup delete 
          let ref = document.getElementById('openModalButton');
          ref?.click();
        }
      },
    })
  }

  /**
   * TODO: this function is push alert when check id was deleted by other people and id not exists
   */
  itemWasDeletedByOtherUserAlert() {
    Swal.fire({
      title: 'Cảnh báo',
      text: 'Thương hiệu này đã được xóa bởi một người khác, vui lòng nhấn bất kỳ để làm mới!',
      icon: 'warning',
      confirmButtonText: 'OK!',
    }).then((result) => {
      if (result.value) {
        this.onLoadDataBrand(this.page, this.pageSize, this.fieldToSort, this.fieldDirToSort);
        this.listCheckboxBrand = [];
      }
      if (result.dismiss) {
        this.onLoadDataBrand(this.page, this.pageSize, this.fieldToSort, this.fieldDirToSort);
        this.listCheckboxBrand = [];
      }
    });
  }

  /**
   * TODO: this function is continue delete data when show 'openModalButton' and click delete
   * 
   * @param id : id brand
   */
  continueDeleteData(id: any) {
    this.apiService.selectAllByWhat('', this.W204_DELETE_DATA_BY_ID, id)
      .subscribe({
        next: data => {
          this.onLoadDataBrand(this.page, this.pageSize, this.fieldToSort, this.fieldDirToSort);
        },
        error: error => {
          // handle error
          console.log(error.message);
        },
        complete: () => {
          this.spinner.show();

          setTimeout(() => {
            this.listCheckboxBrand = [];
            // close popup confirm delete data
            let cancelDelete = document.getElementById('cancelDelete');
            cancelDelete?.click();
            this.spinner.hide();
          }, 500);

          Swal.fire(
            'Thông báo!',
            'Bạn đã xóa danh mục này thành công!',
            'success'
          )
        }
      })
  }



  /**
   * TODO: this function is used to when user input data render code (SeoURL) for insert
   */
  renderForCodeSEO() {
    this.formData.controls['code'].setValue(this.commonService.cleanAccents(this.formData.value.name));
  }

  openModalAddBrand() {
    let open = document.getElementById('openModalAdd');
    open?.click();
    setTimeout(() => {
      document.getElementById('nameAddBrand')?.focus()
    }, 600);
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

  /**
   * TODO: This function is validate all form field 
   * 
   * @param formGroup 
   */
  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  /**
   * TODO: this function is submit data from Angular form to insert data
   * !error: none 
   * *Insert data still success
   */
  submitDataCategory(): void {
    if (!this.formData.valid) {
      this.validateAllFormFields(this.formData);
    } else {
      this.spinner.show();
      this.apiService.selectAllByWhat(JSON.stringify(this.formData.value), this.W203_CHECK_EXISTS_BRAND)
        .subscribe({
          next: data => {
            if (data?.status == true && data?.data == true) {
              this.spinner.hide();
              Swal.fire('Thông báo', 'Thương hiệu này đã tồn tại!', 'warning');
            } else {
              this.apiService.selectAllByWhat(JSON.stringify(this.formData.value), this.W202_INSERT_DATA_BRAND)
                .pipe()
                .subscribe({
                  next: data => {
                    if (data?.status == true) {
                      this.onLoadDataBrand(this.page, this.pageSize, this.fieldToSort, this.fieldDirToSort);
                    }
                  },
                  error: error => {
                    //handle error
                    console.log(error);
                  },
                  complete: () => {

                    // this.formData.controls['name'].setValue('');
                    // this.formData.controls['code'].setValue('');
                    // close popup submit data
                    // let ref = document.getElementById('cancelSubmit');
                    // ref?.click();



                    // show toast check add continue
                    Swal.fire({
                      title: 'Thông báo',
                      text: 'Bạn đã thêm thương hiệu thành công, bạn có muốn thêm tiếp!',
                      icon: 'success',
                      showCancelButton: true,
                      confirmButtonText: 'Thêm tiếp!',
                      cancelButtonText: 'Thoát'
                    }).then((result) => {
                      // press any out screen
                      if (result.dismiss) {
                        // reset form click cancel
                        this.formData.controls['name'].setValue('');
                        this.formData.controls['code'].setValue('');
                        let ref = document.getElementById('cancelSubmit');
                        ref?.click();
                      }
                      if (result.isDenied) {
                        // reset form click cancel
                        this.formData.controls['name'].setValue('');
                        this.formData.controls['code'].setValue('');
                        let ref = document.getElementById('cancelSubmit');
                        ref?.click();
                      }
                      if (result.value) {
                        this.formData.controls['name'].setValue('');
                        this.formData.controls['code'].setValue('');
                        setTimeout(() => {
                          this.spinner.hide();
                        }, 500);
                      }
                      let name = document.getElementById('nameAddBrand');
                      name?.focus();
                    })
                  }
                });
            }
          },
          error: error => {
            console.log(error.message);
          }
        })
    }
  }

  /**
   * TODO: this function is delete brand data when click icon button delete in row on table
   * 
   * @param id : id of brand
   */
  deleteBrandDataById(id: any) {
    Swal.fire({
      title: 'Cảnh báo',
      text: 'Khi xóa thương hiệu này, các sản phẩm quan trọng thuộc thương hiệu này sẽ bị xóa bạn vẫn muốn tiếp tục?',
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Vâng, Tôi sẽ xóa nó!',
      cancelButtonText: 'Không, giữ lại'
    }).then((result) => {
      if (result.value) {
        // get data brand by id to confirm delete
        this.getDataBrandById(id);
      }
    })
  }

  closeModalDetail() {
    let ref = document.getElementById('cancelDetail');
    ref?.click();
  }

  /**
   * TODO: this function is show detail data from category code
   * 
   * @param code code pass from Angular form
   */
  brandNameDetail: string = '';
  showDetailData(code: any): void {
    this.apiService.selectAllByWhat('', this.W205_DETAIL_DATA_BY_CODE, code)
      .pipe()
      .subscribe({
        next: data => {
          // binding data to detail data
          if (data?.status == true && data?.data?.deleteStatus == false) {
            this.brandNameDetail = data?.data?.name;
            // binding data from response data server to form detail
            this.formDetail.controls['id'].setValue(data?.data?.id);
            this.formDetail.controls['name'].setValue(data?.data?.name);
            this.formDetail.controls['code'].setValue(data?.data?.code);
            this.formDetail.controls['createdDate'].setValue(moment(data?.data?.createdDate).format('DD-MM-YYYY HH:mm'));
            this.formDetail.controls['createdBy'].setValue(data?.data?.createdBy);
            if (data?.data?.modifiedDate == data?.data?.createdDate) {
              this.formDetail.controls['modifiedDate'].setValue('Chưa được cập nhật');
              this.formDetail.controls['modifiedBy'].setValue('Chưa được cập nhật');
            } else {
              this.formDetail.controls['modifiedDate'].setValue(moment(data?.data?.modifiedDate).format('DD-MM-YYYY HH:mm'));
              this.formDetail.controls['modifiedBy'].setValue(data?.data?.modifiedBy);
            }
            // delete status is false
            this.deleteStatus = data?.data?.deleteStatus;
          } else {
            // delete status is true
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
          // delete status is true then show alert was deleted
          if (this.deleteStatus == true) {
            this.itemWasDeletedByOtherUserAlert();
            // delete status is false then show data product by id brand
          } else {
            this.onLoadDataProduct(this.formDetail.value.id);
            // open modal detail
            let ref = document.getElementById('openModalDetail');
            ref?.click();
          }
        }
      })
  }

  /**
   * TODO: this function is pass data value for form data 
   * 
   * @param code code pass from Angular form
   */
  updateBrandData(code: any): void {
    this.apiService.selectAllByWhat('', this.W205_DETAIL_DATA_BY_CODE, code)
      .pipe()
      .subscribe({
        next: data => {
          // binding data from response data server to update modal
          if (data?.status == true && data?.data?.deleteStatus == false) {
            this.formUpdate.controls['name'].setValue(data?.data?.name);
            this.formUpdate.controls['code'].setValue(data?.data?.code);
            this.formUpdate.controls['id'].setValue(data?.data?.id);
            this.deleteStatus = data?.data?.deleteStatus;
          } else {
            this.deleteStatus = data?.data?.deleteStatus;
          }
        },
        error: error => {
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
   * TODO: this function is used to when user input data render code (SeoURL) for update
   */
  renderForCodeSEOUpdate() {
    this.formUpdate.controls['code'].setValue(this.commonService.cleanAccents(this.formUpdate.value.name));
  }

  /**
   * TODO: this function is submit when user click button Update (chinh sua)
   * !error: none
   * *Update data is success 
   */
  saveUpdateDataBrand(): void {
    this.spinner.show();
    this.apiService.selectAllByWhat(JSON.stringify(this.formUpdate.value), this.W203_CHECK_EXISTS_BRAND)
      .subscribe({
        next: data => {
          if (data?.status == true && data?.data == true) {
            this.spinner.hide();
            Swal.fire('Thông báo', 'Thương hiệu này đã tồn tại!', 'warning');
          } else {
            this.apiService.selectAllByWhat(JSON.stringify(this.formUpdate.value), this.W206_UPDATE_DATA_BRAND)
              .pipe()
              .subscribe({
                next: data => {
                  if (data?.status == true) {
                    this.onLoadDataBrand(this.page, this.pageSize, this.fieldToSort, this.fieldDirToSort);
                  }
                },
                error: error => {
                  //handle error
                },
                complete: () => {
                  this.formUpdate.controls['id'].setValue('');
                  this.formUpdate.controls['name'].setValue('');
                  this.formUpdate.controls['code'].setValue('');
                  let ref = document.getElementById('cancelUpdate');
                  ref?.click();
                  // this.spinner.show();

                  setTimeout(() => {
                    this.spinner.hide();
                  }, 500);

                  Swal.fire(
                    'Thông báo!',
                    'Bạn đã chỉnh sửa danh mục này thành công!',
                    'success'
                  )
                }
              });
          }
        },
        error: error => {
          console.log(error.message);
        }
      })

  }

  /**
   * TODO: sort default option data
   */
  sortDefaultOption() {
    this.fieldToSort = "id";
    this.fieldDirToSort = "desc";
    this.onLoadDataBrand(this.page, this.pageSize, this.fieldToSort, this.fieldDirToSort);
    this.listCheckboxBrand = [];
  }

  /**
   * TODO: this function is sort brand name based on alphabet 
   */
  sortAlphabetBrandName() {
    this.spinner.show();
    this.fieldToSort = "name";
    this.fieldDirToSort = "asc";
    this.onLoadDataBrand(this.page, this.pageSize, this.fieldToSort, this.fieldDirToSort)
    setTimeout(() => {
      this.spinner.hide();
    }, 500);
    let focusSearch = document.getElementById('keywordSearch');
    focusSearch?.focus();
  }

  /**
   * TODO: this function is sort brand name based on alphabet but reverse 
   */
  sortAlphabetBrandNameReverse() {
    this.spinner.show();
    this.fieldToSort = "name";
    this.fieldDirToSort = "asc";
    this.onLoadDataBrand(this.page, this.pageSize, this.fieldToSort, this.fieldDirToSort)
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
    let focusSearch = document.getElementById('keywordSearch');
    focusSearch?.focus();
  }

  /**
   * TODO: then click option sort created date in dropdown
   */
  sortCreatedDateOption() {
    this.spinner.show();
    this.fieldToSort = "created_date";
    this.fieldDirToSort = "desc";
    this.onLoadDataBrand(this.page, this.pageSize, this.fieldToSort, this.fieldDirToSort);
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
    let focusSearch = document.getElementById('keywordSearch');
    focusSearch?.focus();
  }

  /**
   * TODO: then click option sort updated date in dropdown
   */
  sortUpdatedDateOption() {
    this.spinner.show();
    this.fieldToSort = "modified_date";
    this.fieldDirToSort = "desc";
    this.onLoadDataBrand(this.page, this.pageSize, this.fieldToSort, this.fieldDirToSort);
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }

  /**
   * TODO: search data category
   */
  keywordSearch: any;
  searchDataCatalogue() {
    if (this.keywordSearch == "") {
      // ngModelChange
      this.onLoadDataBrand(this.page, this.pageSize, this.fieldToSort, this.fieldDirToSort);
    } else {
      this.listBrands = this.listBrands.filter((res: { name: string; }) => {
        let nameSearch = this.commonService.cleanTextToSearch(this.keywordSearch);
        let nameResponse = this.commonService.cleanTextToSearch(res.name);
        return nameResponse.toLowerCase().match(nameSearch.toLowerCase());
      })
    }
  }

  /**
   * TODO: sort alphabet in column table
   */
  isReverse: boolean = false;
  sortAlphabetColumn() {
    this.isReverse = !this.isReverse;
    if (this.isReverse) {
      this.fieldToSort = "code";
      this.fieldDirToSort = "desc";
      this.onLoadDataBrand(this.page, this.pageSize, this.fieldToSort, this.fieldDirToSort);
    } else {
      this.fieldToSort = "code";
      this.fieldDirToSort = "asc";
      this.onLoadDataBrand(this.page, this.pageSize, this.fieldToSort, this.fieldDirToSort)
    }
  }

  /**
   * TODO: 
   */
  sortDateColumn() {
    this.isReverse = !this.isReverse;
    if (this.isReverse) {
      this.fieldToSort = "created_date";
      this.fieldDirToSort = "desc";
      this.onLoadDataBrand(this.page, this.pageSize, this.fieldToSort, this.fieldDirToSort);
    } else {
      this.fieldToSort = "created_date";
      this.fieldDirToSort = "asc";
      this.onLoadDataBrand(this.page, this.pageSize, this.fieldToSort, this.fieldDirToSort);
    }
  }

  /**
   * TODO: this function is confirm before close add data
   */
  confirmBeforeCloseAddBrand(): void {
    if (this.formData.controls['name'].value == '') {
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
          this.formData.controls['name'].setValue('');
          this.formData.controls['code'].setValue('');
          let ref = document.getElementById('cancelSubmit');
          ref?.click();
        }
      })
    }
  }
}
