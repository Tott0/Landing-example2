// truncate.ts
import { Pipe, PipeTransform } from "@angular/core";
import { MultaCode } from "../shared.model";
/*
 * Truncates MultaCode Value
 * Takes:
 *  multaCodeObject
 * Usage:
 *   multaCode | multaCode
 * Example:
 *   {{ 'this is a long text' |  truncate : 5 : ..}}
 *   formats to: this | A1: No transitar por la derecha de la vía.
*/
@Pipe({
  name: 'multaCode'
})
export class MultaCodePipe implements PipeTransform {
  transform(value: MultaCode) : string {
    return value.type_multa.replace('.', '') + ': ' + value.description;
  }
}
