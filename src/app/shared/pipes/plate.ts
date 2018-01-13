// truncate.ts
import { Pipe, PipeTransform } from "@angular/core";
/*
 * Truncates String Value
 * Takes:
 *  car plate
 * Usage:
 *   plate | plate
 * Example:
 *   {{ ASD123 |  plate }}
 *   formats to: this ASD 123
*/
@Pipe({
  name: 'plate'
})
export class PlatePipe implements PipeTransform {
  transform(value: string) : string {
    let val = ''
    val = value.substr(0, 3) + ' ' + value.substring(3);
    return val;
  }
}
