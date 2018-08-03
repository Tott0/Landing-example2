import { Injectable } from '@angular/core';

import { MatPaginatorIntl } from '@angular/material';

import { Subject } from 'rxjs/Subject';

@Injectable()
export class CustomMatPaginatorIntl extends MatPaginatorIntl {
  itemsPerPageLabel = 'Items por página';
  nextPageLabel = 'Siguiente página';
  previousPageLabel = 'Página anterior';
  getRangeLabel = (page, pageSize, length) => {
    let i = page * pageSize + 1;
    let f = (page + 1) * pageSize;
    if (f > length) {
      f = length;
    }
    if (i > f) {
      i = f;
    }
    return `${i} - ${f} de ${length}`;
  }

}
