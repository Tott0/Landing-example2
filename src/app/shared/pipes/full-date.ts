import { Pipe, PipeTransform } from '@angular/core';
import { AppConstants } from '../../app-constants';
/*
 * Formats Date Value
 * Takes:
 *  Date string (from rails)
 * Usage:
 *   value | full-date
 * Example:
 *   {{ '2017-01-10T14:30:12.917Z' |  date }}
 *   formats to: 10 de Enero del 2017, 09:30 AM.
*/
@Pipe({
  name: 'fullDate'
})
export class FullDatePipe implements PipeTransform {
  transform(value: string) : string {
    let date = new Date(value);

    let d = '' + ('0' + date.getDate()).slice(-2) + ' de ';
    d += AppConstants.dateTranslation.monthNames[date.getMonth()] + ', ';
    d += date.getFullYear() + ', ';

    let h = date.getHours();
    d += ('0' + (h <= 12 ? h : h - 12)).slice(-2) + ':';

    d += ('0' + date.getMinutes()).slice(-2) + ' ';
    d += h < 12 ? 'AM.' : 'PM.';

    return d;
  }
}
