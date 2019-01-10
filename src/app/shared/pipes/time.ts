// truncate.ts
import { Pipe, PipeTransform } from '@angular/core';
/*
 * Truncates Number Value
 * Takes:
 *  number of seconds
 * Usage:
 *   value | time
 * Example:
 *   {{ 600 |  time }}
 *   formats to: this 00:10:00
*/
@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {
  transform(value: number, onlyMins = false): string {
    let time = '';
    if (!onlyMins) {
      time = time + ('0' + Math.floor(value / 3600)).slice(-2) + ':';
      value = value % 3600;
    }
    time = time + ('0' + Math.floor(value / 60)).slice(-2) + ':';
    value = value % 60;
    time = time + ('0' + value).slice(-2);
    return time;
  }
}
