import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api-service/api.service';
import { CommonService } from 'src/app/services/common-service/common.service';

@Component({
  selector: 'app-c0-home',
  templateUrl: './c0-home.component.html',
  styleUrls: ['./c0-home.component.css']
})
export class C0HomeComponent implements OnInit {

  // list data
  listProductTrending: any = [];

  // number what
  W305_GET_DATA_PRODUCT_TRENDING: number = 305;

  W1_GET_DATA_IMAGE_PRODUCT: number = 1;

  constructor(
    public apiService: ApiService,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.onLoadDataProductTrending();
  }

  onLoadDataProductTrending() {
    this.apiService.selectAllByWhat('', this.W305_GET_DATA_PRODUCT_TRENDING)
      .subscribe({
        next: data => {
          console.log(data);
          this.listProductTrending = data?.data;
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
