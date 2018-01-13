// truncate.ts
import { Pipe, PipeTransform } from "@angular/core";
/*
 * Forces Decimal values
 * Takes:
 *  number
 *  number or digits
 * Usage:
 *   value | decimal:digits
 * Example:
 *   {{ 600 |  decimal : 5 }}
 *   formats to: this 600.00000
*/
@Pipe({
  name: 'decimal'
})
export class DecimalPipe implements PipeTransform {
  transform(value: number, digits = 1) : string {
    return Number(value).toFixed(digits);
  }
}
