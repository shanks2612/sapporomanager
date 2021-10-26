import { Pipe, PipeTransform } from '@angular/core';

const PADDING = '000000';

@Pipe({ name: 'vnCurrency' })
export class VnCurrencyPipe implements PipeTransform {

    private DECIMAL_SEPARATOR: string;
    private THOUSANDS_SEPARATOR: string;
    private CURRENCY_UNIT: string;

    constructor() {
        // TODO comes from configuration settings
        this.DECIMAL_SEPARATOR = '.';
        this.THOUSANDS_SEPARATOR = ',';
        this.CURRENCY_UNIT = ' đ';
    }

    transform(value: number | string, fractionSize: number = 0): string {
        if (!value) { return '0' + this.CURRENCY_UNIT; }
        if (isNaN(+value)) { return value.toString(); }

        let [integer, fraction = ''] = (+value).toString()
            .split(this.DECIMAL_SEPARATOR);

        if (value < 0.01) {
            return '0';
        }

        if (+(fraction + PADDING)[fractionSize] > 4) {
            integer = (+integer + 1).toString();
        }

        integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, this.THOUSANDS_SEPARATOR);


        return integer + (integer && this.CURRENCY_UNIT);
    }

    parse(value: string, fractionSize: number = 0): number {
        if (!isNaN(+value)) { return +value; }

        let integer = (value || '').replace(this.CURRENCY_UNIT, '');

        integer = integer.split(this.THOUSANDS_SEPARATOR).join('');

        return +integer;
    }

}
