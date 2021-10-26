import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class RegexService {

  constructor() { }
  
  REGEX_EMAIL: string = '';

  REGEX_PHONE: any = Validators.pattern(/^(1\s|1|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/);

  REGEX_FULLNAME: string = '';

  REGEX_USERNAME: string = '';

  REGEX_PASSWORD: string = '';

  REGEX_WEBSITE: string = '';
  
}

