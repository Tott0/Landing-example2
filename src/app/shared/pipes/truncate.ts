// truncate.ts
import { Pipe, PipeTransform } from '@angular/core';
/*
 * Truncates String Value
 * Takes:
 *  length of truncated string default 10
 *  truncate trail default '...'
 * Usage:
 *   value | truncate:length:trail
 * Example:
 *   {{ 'this is a long text' |  truncate : 5 : ..}}
 *   formats to: this ..
*/
@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit: number = 10, trail: string = '...') : string {
    return value ? value.length > limit ? value.substring(0, limit) + trail : value : '';
  }
}
