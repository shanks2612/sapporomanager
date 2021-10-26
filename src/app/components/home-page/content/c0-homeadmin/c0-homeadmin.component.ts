import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/services/api-service/api.service';
import { CommonService } from 'src/app/services/common-service/common.service';

@Component({
  selector: 'app-c0-homeadmin',
  templateUrl: './c0-homeadmin.component.html',
  styleUrls: ['./c0-homeadmin.component.css']
})
export class C0HomeadminComponent implements OnInit {

  // local variable
  totalDataProductActive: number = 0;

  // number what
  W306_TOTAL_DATA_PRODUCT_ACTIVE = 306;

  constructor(
    public apiService: ApiService,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.onLoadTotalDataProductActive();
  }

  onLoadTotalDataProductActive() {
    this.apiService.selectAllByWhat('', this.W306_TOTAL_DATA_PRODUCT_ACTIVE)
      .subscribe({
        next: data => {
          console.log(data);
          this.totalDataProductActive = data?.data;
        },
        error: error => {
          console.log(error);
          console.log(error.message);
        },
        complete: () => {
        }
      })
  }

}
