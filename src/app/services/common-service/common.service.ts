import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    private toaster: ToastrService,
    public httpClient: HttpClient
  ) { }

  public cleanAccents(str: string): string {
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    //Xóa các ký tự đặt biệt
    str = str.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '');
    //Đổi khoảng trắng thành ký tự gạch ngang
    str = str.replace(/ /gi, "-");
    //Đổi nhiều ký tự gạch ngang liên tiếp thành 1 ký tự gạch ngang
    //Phòng trường hợp người nhập vào quá nhiều ký tự trắng
    str = str.replace(/\-\-\-\-\-/gi, '-');
    str = str.replace(/\-\-\-\-/gi, '-');
    str = str.replace(/\-\-\-/gi, '-');
    str = str.replace(/\-\-/gi, '-');
    //Xóa các ký tự gạch ngang ở đầu và cuối
    str = '@' + str + '@';
    str = str.replace(/\@\-|\-\@|\@/gi, '');
    //In pathSEO ra textbox có id “createdBy”
    // document.getElementById('code').value = code;
    return str;
  }

  showSuccess(mess: string, title: string) {
    this.toaster.success(title, mess, {
      timeOut: 1500,
      progressBar: true,
      toastClass: "toast border-red",
      positionClass: 'top-right'
    });
  }

  /**
  *
  * @param date
  */
  public formatDate(date: Date): string {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return (
      // date.getFullYear() +
      // '-' +
      // (month > 9 ? month : '0' + month) +
      // '-' +
      // (day > 9 ? day : '0' + day)
      date.getFullYear() +
      "-" +
      (date.getMonth() + 1 > 9
        ? date.getMonth() + 1
        : "0" + (date.getMonth() + 1)) +
      "-" +
      (date.getDate() > 9
        ? date.getDate()
        : "0" + date.getDate())
      + '\x20' +
      (date.getHours() > 9
        ? date.getHours()
        : "0" + date.getHours()) +
      ":" +
      (date.getMinutes() > 9
        ? date.getMinutes()
        : "0" + date.getMinutes()) +
      ":" +
      (date.getSeconds() > 9
        ? date.getSeconds()
        : "0" + date.getSeconds())
    )
  }

  /**
     * 
     * @param date 
     */
  public formatDateTime(date: Date): string {
    return (
      date.getFullYear() +
      "-" +
      (date.getMonth() + 1 > 9
        ? date.getMonth() + 1
        : "0" + (date.getMonth() + 1)) +
      "-" +
      (date.getDate() > 9
        ? date.getDate()
        : "0" + date.getDate())
      + '\x20' +
      (date.getHours() > 9
        ? date.getHours()
        : "0" + date.getHours()) +
      ":" +
      (date.getMinutes() > 9
        ? date.getMinutes()
        : "0" + date.getMinutes()) +
      ":" +
      (date.getSeconds() > 9
        ? date.getSeconds()
        : "0" + date.getSeconds())
    )
  }

  public cleanTextToSearch(str: string): string {
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    //Xóa các ký tự đặt biệt
    str = str.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '');
    return str;
  }

  public formatDateTimeData(date: any) {
    var d = new Date(Date.parse(date));
    return d.getDate() + "-" + d.getUTCMonth() + "-" + d.getFullYear()
      + " " + d.getHours() + ":" + d.getMinutes();
  }

  public toTimestamp(strDate: any) {
    var datum = Date.parse(strDate);
    return datum / 1000;
  }

  public formatPhoneDisplay(phone: string) {
    let newVal = phone.replace(/\D/g, '');
    if (phone.length === 0) {
      newVal = '';
    } else if (newVal.length <= 3) {
      newVal = newVal.replace(/^(\d{0,3})/, '($1)');
    } else if (newVal.length <= 6) {
      newVal = newVal.replace(/^(\d{0,3})(\d{0,3})/, '($1) $2');
    } else if (newVal.length <= 10) {
      newVal = newVal.replace(/(\d\d\d)(\d\d\d)(\d\d\d\d)/, '$1-$2-$3');
    } else {
      newVal = newVal.substring(0, 10);
      newVal = newVal.replace(/^(\d{0,3})(\d{0,3})(\d{0,4})/, '($1) $2-$3');
    }
    return newVal;
  }

  
}
