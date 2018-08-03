// truncate.ts
import { Pipe, PipeTransform } from '@angular/core';
import { StaticMethods } from '@core/static-methods';
/*
 * Truncates Seconds to minutes|hours
 * Takes:
 *  number of seconds
 * Usage:
 *   value | duration
 * Example:
 *   {{ 600 |  duration }}
 *   formats to: this 10 min
 *   {{ 60000 |  duration }}
 *   formats to: this 10 min
*/
@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {
  transform(value: number): string {
    let time = '';
    const minutes = Math.ceil(value / 60);
    if (minutes >= 60) {
      const hours = StaticMethods.round(minutes / 60, 1);
      return hours + ' h'
    } else {
      return ('0' + minutes).slice(-2) + 'min'
    }
  }
}
