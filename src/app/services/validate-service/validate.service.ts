import { Injectable } from '@angular/core';
import { AbstractControl, ControlContainer } from '@angular/forms';
import { CommonService } from '../common-service/common.service';
import { RegexService } from './regex.service';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor(
    private regex: RegexService,
    private commonService: CommonService
  ) { }

  /**
   * 
   * @param control 
   * @returns 
   */
  checkValidatePhone(control: AbstractControl): { [key: string]: boolean } | null {
    const isPhone = /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/.test(control.value);
    if (control.value.length < 9 && control.value.length > 0) {
      return { 'minPhone': true };
    }
    if (control.value.length >= 12) {
      return { 'maxPhone': true };
    }
    if (isPhone == false && control.value != '') {
      return { 'wrongPhone': true };
    }
    return null;
  }

  checkValidateEmail(control: AbstractControl): { [key: string]: boolean } | null {
    if(control.value.length > 0 && control.value.length <= 15) {
      return { 'minLength': true };
    } else if(control.value.length >= 49) {
      return { 'maxLength': true };
    }
    return null;
  }

  /**
   * TODO: this function is check validate name of category(catalogue) 
   * @param control 
   * @returns 
   */
   brandNameValidate(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.value.length > 30) {
      return { 'largeName': true };
    }
    // else if (control.value.length < 5 && control.value.length > 0) {
    //   return { 'smallName': true };
    // }
    return null;
  }
}
