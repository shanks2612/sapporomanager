import { HttpClient, HttpEvent, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private lang: string = 'vn';
  BASE_URL: string = 'http://localhost:8082';
  private SENTMAIL_URL = '';
  private IMAGE_UPLOAD_URL = this.BASE_URL + '/api/upload';
  IMAGE_SHOW_URL = this.BASE_URL + '/api/files';
  private FILE_UPLOAD_URL = this.BASE_URL + '/P5Upload/UploadFile.php';
  private BASE_URL_IMG: string = '';
  private TOKEN_STORAGE: any = '';

  // link select all by what 
  private link: string = `${environment.apiUrl}`;
  private catgoryLink: string = `${this.link}/api/category`;
  private brandLink: string = `${this.link}/api/brand`;
  private productLink: string = `${this.link}/api/product`;
  private accountLink: string = `${this.link}/api/account`;
  private roleLink: string = `${this.link}/api/role`;
  private staffLink: string = `${this.link}/api/staff`;
  private districtLink: string = `${this.link}/api/district`;
  private provinceLink: string = `${this.link}/api/province`;
  private supplierLink: string = `${this.link}/api/supplier`;
  private customerLink: string = `${this.link}/api/customer`;

  // authorize
  public accountSubject!: BehaviorSubject<any>;
  public account!: Observable<any>;
  public currentStaff!: Observable<any>;

  // public sysmemberSubject: BehaviorSubject<any>;
  // public currentSysMember: Observable<any>;
  // public accountSubject: BehaviorSubject<any>;
  // public currentAccount: Observable<any>;
  // public token: BehaviorSubject<any>;
  // public tokenCurent: Observable<any>;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }


  // httpOptionsJWT() {
  //   const headers = new HttpHeaders({
  //     "Content-Type": "application/json",
  //     "Authorization": "Bearer ".concat(this.TOKEN_STORAGE == null ? '' : JSON.parse(this.TOKEN_STORAGE))
  //   });
  //   return headers;
  // }

  /**
   * 
   * @param body 
   * @returns 
   */
  private optionsParam(body: any) {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Bearer ".concat(this.TOKEN_STORAGE == null ? '' : JSON.parse(this.TOKEN_STORAGE))
      }),
      body: body,
    };
  }

  optionJwtCommon() {
    console.log(this.TOKEN_STORAGE == null ? '' : JSON.parse(this.TOKEN_STORAGE), 'jwt commin');
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": "Bearer ".concat(this.TOKEN_STORAGE == null ? '' : JSON.parse(this.TOKEN_STORAGE))
    });
    return headers;
  }

  optionJwtCommonFile() {
    console.log(this.TOKEN_STORAGE == null ? '' : JSON.parse(this.TOKEN_STORAGE), 'jwt commin');
    const headers = new HttpHeaders({
      "Content-Type": "multipart/form-data",
      // "Accept": "application/json",
      "Authorization": "Bearer ".concat(this.TOKEN_STORAGE == null ? '' : JSON.parse(this.TOKEN_STORAGE))
    });
    return headers;
  }

  uploadImage(file: any): Observable<any> {
    let formData = new FormData();
    formData.append('file', file);

    // let params = new HttpParams();

    const headers = new HttpHeaders()
      // .set('Content-Type', 'multipart/form-data')
      .set('Authorization', 'Bearer '.concat(
        this.TOKEN_STORAGE == null
          ? ''
          : JSON.parse(this.TOKEN_STORAGE)));


    const options = {
      headers: headers,
      // params: params,
      reportProgress: true,
    };

    const req = new HttpRequest('POST', this.IMAGE_UPLOAD_URL, formData, options);
    return this.httpClient.request(req);
  }

  /**
   * 
   * @param param 
   * @param what 
   * @param args 
   * @returns 
   */
  selectAllByWhat(param: any, what: any, ...args: any): Observable<any> {
    // =================================== COMMON
    if (what >= 0 && what < 100) {
      switch (what) {
        // upload image
        case 0:
          let formData = new FormData();
          formData.append('file', param);

          // let params = new HttpParams();

          const headers = new HttpHeaders()
            // .set('Content-Type', 'multipart/form-data')
            .set('Authorization', 'Bearer '.concat(
              this.TOKEN_STORAGE == null
                ? ''
                : JSON.parse(this.TOKEN_STORAGE)));


          const options = {
            headers: headers,
            // params: params,
            reportProgress: true,
          };
          return this.httpClient.post<any>(this.IMAGE_UPLOAD_URL, formData, options);
        // return this.httpClient.post<any>(this.IMAGE_UPLOAD_URL, param, { headers: this.optionJwtCommonFile() });
        // find data image
        case 1:
          return this.httpClient.get<any>(this.IMAGE_SHOW_URL.concat("/" + args), { headers: this.optionJwtCommon() });
      }
    }
    // =================================== CATEGORY
    if (what >= 100 && what < 200) {
      switch (what) {
        // find all data category
        case 100:
          return this.httpClient.post<any>(this.catgoryLink.concat('/paging'), param, { headers: this.optionJwtCommon() });
        // insert data category
        case 101:
          return this.httpClient.post<any>(this.catgoryLink, param, { headers: this.optionJwtCommon() });
        // update data category
        case 102:
          return this.httpClient.put<any>(this.catgoryLink, param, { headers: this.optionJwtCommon() });
        // delete data multi id category
        case 103:
          return this.httpClient.delete<any>(this.catgoryLink, this.optionsParam(param));
        // get data by code
        case 104:
          return this.httpClient.get<any>(this.catgoryLink.concat('/code/' + args), { headers: this.optionJwtCommon() });
        // check exists data category
        case 105:
          return this.httpClient.post<any>(this.catgoryLink.concat('/check-exists'), param, { headers: this.optionJwtCommon() });
        // get all data category
        case 106:
          return this.httpClient.get<any>(this.catgoryLink, { headers: this.optionJwtCommon() });
        // delete for each data category by id
        case 107:
          return this.httpClient.put<any>(this.catgoryLink.concat(`/delete/${args}`), param, { headers: this.optionJwtCommon() });
        // return this.httpClient.put<any>(this.catgoryLink.concat(`/delete/${args}`), { headers: this.optionJwtCommon() });
        // get data by id
        case 108:
          return this.httpClient.get<any>(this.catgoryLink.concat('/id/' + args), { headers: this.optionJwtCommon() });

      }
    }
    // =================================== BRAND
    if (what >= 200 && what < 300) {
      switch (what) {
        // get all data brand
        case 200:
          return this.httpClient.get<any>(this.brandLink, { headers: this.optionJwtCommon() });
        // delete data brand
        case 201:
          return this.httpClient.delete<any>(this.brandLink, this.optionsParam(param));
        // insert data brand
        case 202:
          return this.httpClient.post<any>(this.brandLink, param, { headers: this.optionJwtCommon() });
        // check exists brand
        case 203:
          return this.httpClient.post<any>(this.brandLink.concat('/check-exists'), param, { headers: this.optionJwtCommon() });
        // delete data by id
        case 204:
          // return this.httpClient.put<any>(this.brandLink.concat(`/delete/${args}`), { headers: this.optionJwtCommon() });
          return this.httpClient.put<any>(this.brandLink.concat(`/delete/${args}`), param, { headers: this.optionJwtCommon() });
        // show detail data brand
        case 205:
          return this.httpClient.get<any>(this.brandLink.concat('/code/' + args), { headers: this.optionJwtCommon() });
        // update data brand
        case 206:
          return this.httpClient.put<any>(this.brandLink, param, { headers: this.optionJwtCommon() });
        // get data by id
        case 207:
          return this.httpClient.get<any>(this.brandLink.concat('/id/' + args), { headers: this.optionJwtCommon() });
        // find all data brand
        case 208:
          return this.httpClient.post<any>(this.brandLink.concat('/paging'), param, { headers: this.optionJwtCommon() });

      }
    }
    // =================================== PRODUCT
    if (what >= 300 && what < 400) {
      switch (what) {
        // find all data product by category id
        case 300:
          return this.httpClient.get<any>(this.productLink.concat('/categoryid/' + args), { headers: this.optionJwtCommon() });
        // find all data product by brand id
        case 301:
          return this.httpClient.get<any>(this.productLink.concat('/brandid/' + args), { headers: this.optionJwtCommon() });
        // find all data product
        case 302:
          return this.httpClient.get<any>(this.productLink, { headers: this.optionJwtCommon() });
        // find all data product paging
        case 303:
          return this.httpClient.post<any>(this.productLink.concat('/paging'), param, { headers: this.optionJwtCommon() });
        // insert data product
        case 304:
          return this.httpClient.post<any>(this.productLink, param, { headers: this.optionJwtCommon() });
        // get limit 8 product to show landing page
        case 305:
          return this.httpClient.get<any>(this.productLink.concat('/landing'), { headers: this.optionJwtCommon() });
        // total data product active
        case 306:
          return this.httpClient.get<any>(this.productLink.concat('/total'), { headers: this.optionJwtCommon() });
      }
    }
    // =================================== ACCOUNT
    if (what >= 400 && what < 500) {
      switch (what) {
        // find all data account
        case 400:
          return this.httpClient.get<any>(this.accountLink, { headers: this.optionJwtCommon() });
        // insert and register account
        case 401:
          return this.httpClient.post<any>(this.accountLink.concat('/register'), param, this.httpOptions);
        // check exists account: email, phone, username
        case 402:
          return this.httpClient.post<any>(this.accountLink.concat('/check-exists-account'), param, this.httpOptions);
        // delete data by id
        case 403:
          return this.httpClient.put<any>(this.accountLink.concat(`/delete/${args}`), param, { headers: this.optionJwtCommon() });
        // get data by id
        case 404:
          return this.httpClient.get<any>(this.accountLink.concat('/' + args), { headers: this.optionJwtCommon() });
        // login account
        case 405:
          return this.httpClient.post<any>(this.accountLink.concat('/login'), param, this.httpOptions);
        // update data account
        case 406:
          return this.httpClient.put<any>(this.accountLink, param, { headers: this.optionJwtCommon() });
        // filter account data by role
        case 407:
          return this.httpClient.post<any>(this.accountLink.concat('/role'), param, { headers: this.optionJwtCommon() });
        // find all data account paging
        case 408:
          return this.httpClient.post<any>(this.accountLink.concat('/paging'), param, { headers: this.optionJwtCommon() });
      }
    }
    // =================================== ROLE
    if (what >= 500 && what < 600) {
      switch (what) {
        // find all data role
        case 500:
          return this.httpClient.get<any>(this.roleLink, { headers: this.optionJwtCommon() });
      }
    }
    // =================================== STAFF
    if (what >= 600 && what < 700) {
      switch (what) {
        // find all data for staff
        case 600:
          return this.httpClient.get<any>(this.staffLink, { headers: this.optionJwtCommon() });
        // insert data staff
        case 601:
          return this.httpClient.post<any>(this.staffLink, param, { headers: this.optionJwtCommon() });
        // get data by id
        case 602:
          return this.httpClient.get<any>(this.staffLink.concat('/' + args), { headers: this.optionJwtCommon() });
        // update data staff
        case 603:
          return this.httpClient.put<any>(this.staffLink, param, { headers: this.optionJwtCommon() });
        // delete data by id
        case 604:
          return this.httpClient.put<any>(this.staffLink.concat(`/delete/${args}`), param, { headers: this.optionJwtCommon() });
        // list data staff was deleted
        case 605:
          return this.httpClient.get<any>(this.staffLink.concat('/deleted'), { headers: this.optionJwtCommon() });
        // backup data staff by id
        case 606:
          return this.httpClient.put<any>(this.staffLink.concat(`/restore/${args}`), param, { headers: this.optionJwtCommon() });
        // restore data multi id category
        case 607:
          // console.log(param);
          // return this.httpClient.delete<any>(this.catgoryLink, this.optionsParam(param));
          return this.httpClient.put<any>(this.staffLink.concat(`/restore`), param, { headers: this.optionJwtCommon() });
      }
    }
    // =================================== DISTRICT
    if (what >= 700 && what < 800) {
      switch (what) {
        // find all data for district
        case 700:
          return this.httpClient.get<any>(this.districtLink, { headers: this.optionJwtCommon() });
        // find all data for district by province id
        case 701:
          // console.log(this.districtLink.concat('/province/' + args));
          return this.httpClient.get<any>(this.districtLink.concat('/province/' + args), { headers: this.optionJwtCommon() });
      }
    }
    // =================================== PROVINCE
    if (what >= 800 && what < 900) {
      switch (what) {
        // find all data for province
        case 800:
          return this.httpClient.get<any>(this.provinceLink, { headers: this.optionJwtCommon() });
      }
    }
    // =================================== SUPPLIER
    if (what >= 900 && what < 1000) {
      switch (what) {
        // find all data for supplier
        case 900:
          return this.httpClient.get<any>(this.supplierLink, { headers: this.optionJwtCommon() });
        // insert data supplier
        case 901:
          return this.httpClient.post<any>(this.supplierLink, param, { headers: this.optionJwtCommon() });
        // find all data for supplier by id
        case 902:
          return this.httpClient.get<any>(this.supplierLink.concat('/id/' + args), { headers: this.optionJwtCommon() });
        // delete data by id
        case 903:
          return this.httpClient.put<any>(this.supplierLink.concat(`/delete/${args}`), param, { headers: this.optionJwtCommon() });
        // update data supplier
        case 904:
          return this.httpClient.put<any>(this.supplierLink, param, { headers: this.optionJwtCommon() });
      }
    }
    // =================================== CUSTOMER
    if (what >= 1000 && what < 1100) {
      switch (what) {
        // find all data for customer
        case 1000:
          return this.httpClient.get<any>(this.customerLink, { headers: this.optionJwtCommon() });
        // insert data customer
        case 1001:
          const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
          return this.httpClient.post(this.customerLink, JSON.stringify(param), { headers: headers })
      }
    }
    return this.httpClient.get<any>('');
  }

  /**
    * get Staff Value
    */
  public get getAccountValue(): any {
    // if (this.accountSubject.value == null) {
    //   this.accountSubject = new BehaviorSubject<any>(
    //     JSON.parse(localStorage.getItem('accountSubject') ?? '')
    //   );
    //   console.log(this.accountSubject);
    // }
    // console.log();
    return localStorage.getItem('accountSubject') || '';
  }


  constructor(
    private httpClient: HttpClient,
  ) {
    let token = localStorage.getItem('token');
    this.TOKEN_STORAGE = token;
  }

  /**
   * upload image Core
   */
  public uploadImageCore(inputFileAvatar: any): Observable<any> {

    const uploadFileFinish = new Observable((observer) => {
      let files: any = [];
      const fileUpload = inputFileAvatar.nativeElement;

      fileUpload.onchange = () => {
        for (let index = 0; index < fileUpload.files.length; index++) {
          const file = fileUpload.files[index];
          files.push({ data: file, inProgress: false, progress: 0 });
        }

        // upload file
        inputFileAvatar.nativeElement.value = '';
        files.forEach((file: any) => {
          // upload file image
          const formData = new FormData();
          formData.append('file', file.data);
          const current_datetime = new Date().toISOString();
          formData.append('current_datetime', current_datetime);
          file.inProgress = true;
          // this.spinner.show();
          // post image to server
          this.httpClient.post<any>(this.IMAGE_UPLOAD_URL, formData, {}).subscribe(data => { });

          observer.next(current_datetime + '-' + file.data.name);
        });
      };
      fileUpload.click();
    });

    return uploadFileFinish;
  }

  /**
   * upload File Core
   */
  public uploadFileCore(inputFileAvatar: any): Observable<any> {
    const uploadFileFinish = new Observable((observer) => {
      let files: any = [];
      const fileUpload = inputFileAvatar.nativeElement;

      fileUpload.onchange = () => {
        for (let index = 0; index < fileUpload.files.length; index++) {
          const file = fileUpload.files[index];
          files.push({ data: file, inProgress: false, progress: 0 });
        }

        // upload file
        inputFileAvatar.nativeElement.value = '';
        files.forEach((file: any) => {
          // upload file image
          const formData = new FormData();
          formData.append('file', file.data);
          const current_datetime = new Date().toISOString();
          formData.append('current_datetime', current_datetime);
          file.inProgress = true;
          // this.spinner.show();

          // post file to server
          this.httpClient.post<any>(this.FILE_UPLOAD_URL, formData, {}).subscribe(data => { });

          observer.next(current_datetime + '-' + file.data.name);
        });
      };
      fileUpload.click();
    });

    return uploadFileFinish;
  }

  /**
   * 
   */
  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("accountSubject");
  }

  /**
   * 
   * @param content 
   * @returns 
   */
  public formatHtmlTag(content: string) {
    let result: string;
    let dummyElem = document.createElement('DIV');
    dummyElem.innerHTML = content;
    document.body.appendChild(dummyElem);
    result = dummyElem.textContent || '';
    document.body.removeChild(dummyElem);
    return result;
  }
}
