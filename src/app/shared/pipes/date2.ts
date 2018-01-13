// truncate.ts
import { Pipe, PipeTransform } from "@angular/core";
/*
 * Formats Date Value
 * Takes:
 *  Date string (from rails)
 * Usage:
 *   value | date2
 * Example:
 *   {{ '2017-01-10T14:30:12.917Z' |  date2 }}
 *   formats to: this 10.01.17
*/
@Pipe({
  name: 'date2'
})
export class Date2Pipe implements PipeTransform {
  transform(value: string, showTime = false) : string {
    let date = new Date(value);

    let d = '' + ('0' + date.getDate()).slice(-2) + '.';
    d += ('0' + (date.getMonth() + 1)).slice(-2) + '.';
    d += date.getFullYear();

    if(showTime){
      let h = date.getHours();
      d += ' ' + ('0' + (h <= 12 ? h : h - 12)).slice(-2) + ':';
  
      d += ('0' + date.getMinutes()).slice(-2) + ' ';
      d += h < 12 ? 'am' : 'pm';
    }

    return d;
  }
}
