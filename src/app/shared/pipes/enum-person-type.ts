import { Pipe, PipeTransform } from '@angular/core';
import { PersonType } from '../enums/person-type.enum';
/*
 * replaces PersonType enum to string
*/
@Pipe({
  name: 'personType'
})
export class EnumPersonTypePipe implements PipeTransform {
  transform(value: PersonType, what = 'text'): string {
    switch (what) {
      case 'text':
        switch (value) {
          case PersonType.NATURAL:
            return 'Persona Natural';
          case PersonType.JURIDICA:
            return 'Persona Jurídica';
          case PersonType.ABOGADO:
            return 'Usuario Abogado';
          case PersonType.ADMIN:
            return 'Usuario Administrador';
        }
        break;
      case 'icon':
        switch (value) {
          case PersonType.NATURAL:
            return 'person';
          case PersonType.JURIDICA:
            return 'business';
          case PersonType.ABOGADO:
            return 'person';
          case PersonType.ADMIN:
            return 'person';
        }
        break;
    }
  }
}
