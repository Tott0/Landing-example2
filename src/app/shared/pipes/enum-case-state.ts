import { Pipe, PipeTransform } from '@angular/core';
import { CaseState } from '../enums/case-state.enum';
/*
 * replaces CaseState enum to string
*/
@Pipe({
  name: 'caseState'
})
export class EnumCaseStatePipe implements PipeTransform {
  transform(value: CaseState, what = 'text', paid = false): string {
    switch (what) {
      case 'text':
        switch (value) {
          case CaseState.REVISION:
            return 'En Revisión';
          case CaseState.ESPERANDO_PAGO:
            return paid ? 'Pagado' : 'Esperando Pago';
          case CaseState.PENDIENTE:
            return 'Pendiente';
          case CaseState.RADICADO:
            return 'Radicado';
          case CaseState.AUDIENCIA:
            return 'En Audiencia';
          case CaseState.RECHAZADO:
            return 'Rechazado';
          case CaseState.RESUELTO:
            return 'Resuelto';
        }
        break;
      case 'class':
        switch (value) {
          case CaseState.REVISION:
            return 'revision';
          case CaseState.ESPERANDO_PAGO:
            return 'esperando';
          case CaseState.PENDIENTE:
            return 'pendiente';
          case CaseState.RADICADO:
            return 'radicado';
          case CaseState.AUDIENCIA:
            return 'audiencia';
          case CaseState.RECHAZADO:
            return 'rechazado';
          case CaseState.RESUELTO:
            return 'resolucion';
        }
        break;
      case 'icon':
        switch (value) {
          case CaseState.REVISION:
            return 'assignment';
          case CaseState.ESPERANDO_PAGO:
            return 'hourglass_empty';
          case CaseState.PENDIENTE:
            return 'access_time';
          case CaseState.RADICADO:
            return 'next_week';
          case CaseState.AUDIENCIA:
            return 'gavel';
          case CaseState.RECHAZADO:
            return 'unarchive';
          case CaseState.RESUELTO:
            return 'assignment_turned_in';
        }
        break;
    }
  }
}
