import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/services/api-service/api.service';
import { CommonService } from 'src/app/services/common-service/common.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-c1-product',
  templateUrl: './c1-product.component.html',
  styleUrls: ['./c1-product.component.css']
})
export class C1ProductComponent implements OnInit {

  // list data
  listProduct: any = [];
  listCheckboxProduct: any[] = [];

  listCategories: any = [];
  listBrands: any = [];
  listSupplier: any = [];
  listStatus: any = [
    { "id": "1", "value": "Hàng mới nhập" },
    { "id": "2", "value": "Trong kho" },
    { "id": "3", "value": "Đang bán" },
    { "id": "4", "value": "Đang chờ nhập" }
  ]

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

  // local variable
  stringImageURL: string = '';
  sizeImageUpload: number = 0;

  deleteStatus: boolean = false;

  quantityModel: number = 0;

  public descriptionProduct = `<p> The Editor enables users to create rich textual content. </p>`;

  // form insert data product
  formData = this.formBuilder.group({
    productName: ['',
      [
        Validators.required,
      ]
    ],
    thumbnail: [''],
    code: [''],
    quantity: ['',
      [
        Validators.required,
      ]
    ],
    price: [''],
    oldPrice: ['',
      [
        Validators.required,
      ]
    ],
    discount: [''],
    description: [''],
    status: [''],
    brandId: ['',
      [
        Validators.required,
      ]
    ],
    categoryId: ['',
      [
        Validators.required,
      ]
    ],
    supplierId: ['',
      [
        Validators.required,
      ]
    ],
    importDate: [''],
    confirmDate: [''],
    totalFirstPrice: [''],
    totalDiscountPrice: ['']
  })

  regexPattern = /\-?\d*\.?\d{1,2}/;
  formGoToPage = this.formBuilder.group({
    numberPage: [1, [Validators.pattern(this.regexPattern)]]
  })

  // number what
  W303_SELECT_ALL_PRODUCT_PAGING: number = 303;
  W304_INSERT_DATA_PRODUCT: number = 304;

  W106_SELECT_ALL_DATA_CATEGORY: number = 106;

  W200_SELECT_ALL_DATA_BRAND: number = 200;

  W900_SELECT_ALL_DATA_SUPPLIER: number = 900;
  W902_SELECT_ALL_DATA_SUPPLIER_BY_ID: number = 902;

  W0_UPLOAD_FILE_IMAGE: number = 0;

  constructor(
    private apiService: ApiService,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private router: Router
  ) {
    // var time = new Date();
    // var currentDate = new Date().toJSON().slice(0, 10);
    // var from = new Date(time.toLocaleDateString());
    // var to = new Date(time.toLocaleDateString());
    // var check = new Date(currentDate);

    // var checkFromTime = from.getDay() + '-' + from.getMonth();
    // var checkFromTime = from.getDay() + '-' + from.getMonth();
    // console.log(checkFromTime );

    // const getStringImage = "FPT_product_1634138964649_513_may-lam-mat-khong-khi-kangaroo-kg50f62-20-300x300.jpg".split("_", 5);
    // console.log(getStringImage[4]);
  }

  ngOnInit(): void {
    this.onLoadDataProduct(this.page, this.pageSize, this.fieldToSort, this.fieldDirToSort);
    this.onLoadDataCategory();
    this.onLoadDataBrand();
    this.onLoadDataSupplier();
  }

  /**
   * 
   * @param offset 
   * @param limit 
   * @param sortField 
   * @param sortDir 
   */
  onLoadDataProduct(offset: number, limit: number, sortField: string, sortDir: string): void {
    this.spinner.show();
    let objectNew = {
      "offset": offset,
      "limit": limit,
      "sortField": sortField,
      "sortDir": sortDir
    };
    this.apiService.selectAllByWhat(JSON.stringify(objectNew), this.W303_SELECT_ALL_PRODUCT_PAGING)
      .subscribe({
        next: data => {
          console.log(data);
          this.listProduct = data?.data?.results;
          this.pageLength = data?.data?.totalPage;
        },
        error: error => {
          console.log(error);
          console.log(error.message);
          if (error?.error?.message.includes('Page index must not be less than zero')) {
            this.spinner.hide();
            Swal.fire('Thông báo', 'Trang không được nhỏ hơn hoặc bằng 0!', 'warning');
          }
          if (error?.error?.message.includes('Unauthorized')) {
            this.router.navigate(['/login']);
          }
        },
        complete: () => {
          setTimeout(() => {
            this.spinner.hide();
          }, 500);
          let ref = document.getElementById('keywordSearch');
          ref?.focus();
        }
      })
  }

  /**
   * 
   */
  onLoadDataCategory() {
    this.apiService.selectAllByWhat('', this.W106_SELECT_ALL_DATA_CATEGORY).subscribe({
      next: data => {
        if (data?.status) {
          this.listCategories = data?.data;
        }
      },
      error: error => {
        console.log(error);
        if (error?.error?.message.includes('Unauthorized')) {
          this.router.navigate(['/login']);
        }
      },
      complete: () => {
      }
    })
  }

  /**
   * 
   */
  onLoadDataBrand() {
    this.apiService.selectAllByWhat('', this.W200_SELECT_ALL_DATA_BRAND).subscribe({
      next: data => {
        if (data?.status) {
          this.listBrands = data?.data;
        }
      },
      error: error => {
        console.log(error);
        if (error?.error?.message.includes('Unauthorized')) {
          this.router.navigate(['/login']);
        }
      },
      complete: () => {
      }
    })
  }

  /**
   * 
   */
  onLoadDataSupplier() {
    this.apiService.selectAllByWhat('', this.W900_SELECT_ALL_DATA_SUPPLIER).subscribe({
      next: data => {
        if (data?.status) {
          this.listSupplier = data?.data;
        }
      },
      error: error => {
        console.log(error);
        if (error?.error?.message.includes('Unauthorized')) {
          this.router.navigate(['/login']);
        }
      },
      complete: () => {
      }
    })
  }

  /**
   * 
   * @param event 
   */
  onPageChange(event: any) {
    let pageNumber = event;
    this.page = pageNumber;
    this.onLoadDataProduct(this.page, this.pageSize, this.fieldToSort, this.fieldDirToSort);
  }

  /**
   * 
   */
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
          this.onLoadDataProduct(this.page, this.pageSize, this.fieldToSort, this.fieldDirToSort);
        }
      })
    } else {
      this.page = this.formGoToPage.controls["numberPage"].value;
      this.onLoadDataProduct(this.page, this.pageSize, this.fieldToSort, this.fieldDirToSort);
    }
  }

  /**
   * 
   * @param event 
   */
  onOptionsSelected(event: any) {
    const value = event.target.value;
    this.pageSize = value;
    this.onLoadDataProduct(this.page, this.pageSize, this.fieldToSort, this.fieldDirToSort);
  }

  /**
   * 
   */
  openModalAddProduct() {
    let open = document.getElementById('openModalAdd');
    open?.click();
    setTimeout(() => {
      document.getElementById('nameAddProduct')?.focus()
    }, 1000);
  }


  /**
   * 
   * @param event 
   */
  selectedFiles?: FileList;
  currentFile?: File;
  onFileChanged(event: any) {
    // event.preventDefault();
    const file = event.target.files;
    // const attachTime = new Date().getDay() + new Date().getMonth() + new Date().getFullYear() + new Date().getMilliseconds();
    this.currentFile = file.item(0);
    this.stringImageURL = 'FPT_product_' + file.item(0)?.lastModified + '_' + this.randomNumber(100, 999) + '_' + file.item(0)?.name;
  }

  /**
   * TODO: this function is is get random data from min to max
   * 
   * @param min 
   * @param max 
   * @returns 
   */
  randomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * TODO: this function is change data status combobox
   * 
   * @param event 
   */
  changeStatus(event: any) {
    let status = event.target.value;
    console.log(status);
    this.formData.controls['status'].setValue(status, {
      onlySelf: true
    });
  }

  /**
   * TODO: this function is change data category combobox
   * 
   * @param event 
   */
  changeCategory(event: any) {
    let category = event.target.value;
    console.log(category);
    this.formData.controls['categoryId'].setValue(category, {
      onlySelf: true
    });
  }

  /**
   * TODO: this function is change data brand combobox 
   * 
   * @param event 
   */
  changeBrand(event: any) {
    let brand = event.target.value;
    console.log(brand);
    this.formData.controls['brandId'].setValue(brand, {
      onlySelf: true
    });
  }

  /**
   * TODO: this function is change data supplier combobox
   * 
   * @param event 
   */
  companyName: string = ''; // render data company name on input
  businessLine: string = ''; // render data business line on input
  address: string = ''; // render data address on input
  changeSupplier(event: any) {
    let supplier = event.target.value;
    console.log(supplier);
    this.formData.controls['supplierId'].setValue(supplier, {
      onlySelf: true
    });
    this.apiService.selectAllByWhat('', this.W902_SELECT_ALL_DATA_SUPPLIER_BY_ID, supplier).subscribe({
      next: data => {
        if (data?.status == true && data?.data?.deleteStatus == false) {
          this.companyName = data?.data?.companyName;
          this.businessLine = data?.data?.businessLine;
          this.address = data?.data?.address;
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
        }
      },
    })
  }

  /**
   * 
   */
  renderForCodeSEO() {
    this.formData.controls['code'].setValue(this.commonService.cleanAccents(this.formData.value.productName));
  }

  /**
   * 
   */
  @ViewChild('input') input!: ElementRef;
  ngAfterViewInit() {
    this.input.nativeElement.focus();
  }

  /**
   * 
   * @param event 
   */
  onKey(event: any) {
    if (event.key === 'Tab') {
      this.input.nativeElement.focus();
    }
  }

  /**
   * 
   * @param formGroup 
   */
  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        setTimeout(() => {
          control.markAsTouched({ onlySelf: true });
        }, 500);
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  /**
   * 
   */
  renderDiscountPrice() {
    this.formData.controls['price'].setValue(this.formData.value.oldPrice);
    // render total price when not discount
    this.formData.controls['totalFirstPrice'].setValue(this.formData.value.oldPrice * this.formData.value.quantity);
  }

  /**
   * 
   */
  renderPriceWhenDiscount() {
    let importPrice = this.formData.value.oldPrice;
    let discountRate = this.formData.value.discount;
    let quantityPrice = this.formData.value.quantity;
    if (importPrice == 0 && discountRate == 0 || importPrice == '' && discountRate == '') {
      this.formData.controls['price'].setValue(0);
      this.formData.controls['totalDiscountPrice'].setValue(0);
    } else if (importPrice != 0 && discountRate == 0 || importPrice != '' && discountRate == '') {
      this.formData.controls['price'].setValue(importPrice);
      this.formData.controls['totalDiscountPrice'].setValue(0);
    } else if (importPrice != 0 && discountRate != 0) {
      let priceWhenDiscount = importPrice - ((importPrice * discountRate) / 100);
      this.formData.controls['price'].setValue(this.roundedNumber(priceWhenDiscount));
      this.formData.controls['totalDiscountPrice'].setValue(this.roundedNumber(priceWhenDiscount) * quantityPrice);
    }
  }

  /**
   * 
   * @param numb 
   * @returns 
   */
  roundedNumber(numb: number) {
    return Math.ceil(numb * 100) / 100;
  }

  /**
   * 
   */
  submitDataProduct() {
    this.spinner.show();
    if(this.formData.invalid) {
      this.spinner.hide();
      this.validateAllFormFields(this.formData);
    } else {
      let param = {
        "productName": this.formData.controls['productName'].value,
        "code": this.formData.controls['code'].value,
        "quantity": this.formData.controls['quantity'].value,
        "price": this.formData.controls['price'].value,
        "oldPrice": this.formData.controls['oldPrice'].value,
        "discount": this.formData.controls['discount'].value == '' ? 0 : this.formData.controls['discount'].value,
        "description": this.formData.controls['description'].value,
        "thumbnail": this.stringImageURL,
        "status": this.formData.controls['status'].value,
        // "importDate": moment(Date.now()).format('YYYY-MM-DD HH:m'),
        // "confirmDate": moment(Date.now()).format('YYYY-MM-DD HH:m'),
        "brandId": this.formData.controls['brandId'].value,
        "categoryId": this.formData.controls['categoryId'].value,
        "supplierId": this.formData.controls['supplierId'].value,
      }
  
      // cal api post add data product
      this.apiService.selectAllByWhat(JSON.stringify(param), this.W304_INSERT_DATA_PRODUCT)
        .pipe()
        .subscribe({
          next: data => {
            console.log(data);
          },
          error: error => {
            this.spinner.hide();
            console.log(error);
          },
          complete: () => {
            this.spinner.hide();
            // show toast check add continue
            this.saveDataProductWhenUploadImage();
            Swal.fire({
              title: 'Thông báo',
              text: 'Bạn đã thêm sản phẩm thành công, bạn có muốn thêm tiếp!',
              icon: 'success',
              showCancelButton: true,
              confirmButtonText: 'Thêm tiếp!',
              cancelButtonText: 'Thoát'
            }).then((result) => {
              // press any out screen
              if (result.dismiss) {
                // reset form click cancel
                this.resetDataProductWhenSubmit();
                // close modal
                this.onLoadDataProduct(this.page, this.pageSize, this.fieldToSort, this.fieldDirToSort);
                let ref = document.getElementById('cancelSubmit');
                ref?.click();
              }
              if (result.isDenied) {
                // reset form click cancel
                this.resetDataProductWhenSubmit();
                // close modal
                this.onLoadDataProduct(this.page, this.pageSize, this.fieldToSort, this.fieldDirToSort);
                let ref = document.getElementById('cancelSubmit');
                ref?.click();
              }
              if (result.value) {
                this.resetDataProductWhenSubmit();
                // set timeout to focus input
                setTimeout(() => {
                  this.spinner.hide();
                  let ref = document.getElementById('nameAddProduct');
                  ref?.focus();
                }, 500);
              }
              this.onLoadDataProduct(this.page, this.pageSize, this.fieldToSort, this.fieldDirToSort);
              let name = document.getElementById('nameAddProduct');
              name?.focus();
            })
          }
        });
    }
  }

  /**
   * 
   */
  saveDataProductWhenUploadImage() {
    this.apiService.selectAllByWhat(this.currentFile, this.W0_UPLOAD_FILE_IMAGE).subscribe({
      next: data => {
        console.log(data);
      },
      error: error => {
        console.log(error);
      },
      complete: () => {
        console.log('complete');
        // this.saveDataProductWhenUploadImage();
        window.onbeforeunload = function (event) {
          // do some stuff here, like reloading your current state
          //this would work only if the user chooses not to leave the page
          return 'why would you do that???';
        }
      }
    })
  }

  /**
   * 
   */
  resetDataProductWhenSubmit() {
    this.formData.controls['productName'].setValue('');
    this.formData.controls['thumbnail'].setValue('');
    this.formData.controls['code'].setValue('');
    this.formData.controls['quantity'].setValue('');
    this.formData.controls['price'].setValue('');
    this.formData.controls['oldPrice'].setValue('');
    this.formData.controls['discount'].setValue('');
    this.formData.controls['description'].setValue('');
    this.formData.controls['status'].setValue('');
    this.formData.controls['brandId'].setValue('');
    this.formData.controls['categoryId'].setValue('');
    this.formData.controls['supplierId'].setValue('');
    this.formData.controls['importDate'].setValue('');
    this.formData.controls['confirmDate'].setValue('');
    this.formData.controls['totalFirstPrice'].setValue('');
    this.formData.controls['totalDiscountPrice'].setValue('');
    this.companyName = '';
    this.businessLine = '';
    this.address = '';
    this.stringImageURL = '';
  }

  /**
   * 
   */
  itemWasDeletedByOtherUserAlert() {
    Swal.fire({
      title: 'Cảnh báo',
      text: 'Sản phẩm này đã được xóa bởi một người khác, vui lòng nhấn bất kỳ để làm mới!',
      icon: 'warning',
      // showCancelButton: true,
      confirmButtonText: 'OK!',
      // cancelButtonText: 'Không, giữ lại'
    }).then((result) => {
      if (result.value) {
        this.onLoadDataProduct(this.page, this.pageSize, this.fieldToSort, this.fieldDirToSort);
        this.listCheckboxProduct = [];
      }
      if (result.dismiss) {
        this.onLoadDataProduct(this.page, this.pageSize, this.fieldToSort, this.fieldDirToSort);
        this.listCheckboxProduct = [];
      }
    });
  }

  /**
   * TODO: this function is seperate link url data image to show image
   * 
   * @param url 
   * @returns root image link
   */
  seperateURLToGetImage(url: string): string {
    const getStringImage = url.split("_", 5);
    return getStringImage[4];
  }

  /**
   * 
   * @param id 
   */
  detailDataProduct(id: any) {
    console.log(id);
    let ref = document.getElementById('openModalDetail');
    ref?.click();
  }

  /**
   * 
   */
  confirmBeforeCloseAddProduct() {
    if (
      this.formData.controls['productName'].value == '' &&
      this.formData.controls['status'].value == '' &&
      this.formData.controls['brandId'].value == '' &&
      this.formData.controls['categoryId'].value == '' &&
      this.formData.controls['supplierId'].value == '' &&
      this.formData.controls['oldPrice'].value == '' &&
      this.formData.controls['quantity'].value == ''
    ) {
      this.resetDataProductWhenSubmit();
      let ref = document.getElementById('cancelSubmit');
      ref?.click();
      let search = document.getElementById('keywordSearch');
      search?.focus();
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
          this.resetDataProductWhenSubmit();
          // this.formData.reset();
          let ref = document.getElementById('cancelSubmit');
          ref?.click();
          let search = document.getElementById('keywordSearch');
          search?.focus();
        }
      })
    }
  }
}
