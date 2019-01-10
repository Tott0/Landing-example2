import { Subject } from 'rxjs';

export interface CiudadApi {
  cities: Ciudad[];
  total_count: number;
}

export class Ciudad {
  id: number;
  name: string;
  department: Departamento;
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

export class FilterSubject<T> {
  value: T;
  change: Subject<T> = new Subject();
}
