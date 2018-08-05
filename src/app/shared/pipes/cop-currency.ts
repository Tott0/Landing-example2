// truncate.ts
import { Pipe, PipeTransform } from '@angular/core';
/*
 * Formats Currency Value (COP)
 * Takes:
 *  Numeric Value
 * Usage:
 *   value | copCurrency : true
 * Example:
 *   {{ 1350789 |  copCurrency }}
 *   formats to: $ 1.350.789
*/
@Pipe({
  name: 'copCurrency'
})
export class CopCurrencyPipe implements PipeTransform {
  transform(value: number, showSymbol: boolean = true): string {
    let isNeg = false;
    const val = '' + value;
    if (value < 0) {
      val.substring(1);
      isNeg = true;
    }
    let cop = '';
    const times = Math.floor((val.length - 1) / 3);
    for (let i = 0; i < times; i++) {
      cop = '.' + (val + '.').slice(-4 - 3 * i, -1 - 3 * i) + cop;
    }
    return (showSymbol ? '$ ' : '') + (isNeg ? '-' : '') + val.slice(0, val.length - 3 * times) + cop;
  }
}
