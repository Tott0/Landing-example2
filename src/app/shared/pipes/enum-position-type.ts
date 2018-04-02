import { Pipe, PipeTransform } from '@angular/core';
import { PositionType } from '../models/warehouse.model';
/*
 * replaces PositionType enum to string
*/
@Pipe({
  name: 't0tPositionType'
})
export class EnumPositionTypePipe implements PipeTransform {
  transform(value: PositionType, what = 'text'): string {
    switch (what) {
      case 'text':
        switch (value) {
          case PositionType.BOX:
            return 'Caja';
          case PositionType.FLOOR_CLOSED:
            return 'Piso Cubierto';
          case PositionType.FLOOR_OPEN:
            return 'Piso Exterior';
          case PositionType.RACK:
            return 'Estantería';
        }
        break;
      case 'icon':
        switch (value) {
        }
        break;
    }
  }
}
