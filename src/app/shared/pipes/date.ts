// truncate.ts
import { Pipe, PipeTransform } from "@angular/core";
/*
 * Formats Date Value
 * Takes:
 *  Date string (from rails)
 * Usage:
 *   value | date
 * Example:
 *   {{ '2017-01-10T14:30:12.917Z' |  date }}
 *   formats to: this 10/01/2017 09:30:12 AM.
*/
@Pipe({
  name: 'date'
})
export class DatePipe implements PipeTransform {
  transform(value: string) : string {
    let date = new Date(value);

    let d = '' + ('0' + date.getDate()).slice(-2) + '/';
    d += ('0' + (date.getMonth() + 1)).slice(-2) + '/';
    d += date.getFullYear() + ' ';

    let h = date.getHours();
    d += ('0' + (h <= 12 ? h : h - 12)).slice(-2) + ':';

    d += ('0' + date.getMinutes()).slice(-2) + ':';
    d += ('0' + date.getSeconds()).slice(-2) + ' ';
    d += h < 12 ? 'AM.' : 'PM.';

    return d;
  }
}
