import { Subject } from 'rxjs/Subject';

export class Ciudad {
  id: number;
  name: string;
  departamento: Departamento;
}

export class Departamento {
  id: number;
  name: string;
}

export class GoogleAddress {
  address?: String;
  lat?: number;
  lng?: number;
  place_id?: String;
}

export interface DocumentFile {
  name?: string;
  file?: File;
  url: string;
}

export class FilterSubject {
  value: any;
  change: Subject<any> = new Subject();
}
