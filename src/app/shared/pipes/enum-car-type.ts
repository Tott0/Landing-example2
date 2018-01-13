import { Pipe, PipeTransform } from '@angular/core';
import { CarType } from '../enums/car-type.enum';
/*
 * replaces CarType enum to string
*/
@Pipe({
  name: 'carType'
})
export class EnumCarTypePipe implements PipeTransform {
  transform(value: CarType): string {
    switch (value) {
      case CarType.PARTICULAR: {
        return 'Particular';
      }
      case CarType.PUBLICO: {
        return 'Público';
      }
    }
  }
}
