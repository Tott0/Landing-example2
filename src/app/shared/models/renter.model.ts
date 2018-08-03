import { User } from '@shared/models/user.model';
import { DocumentFile } from '@shared/models/shared.model';

export interface RenterApi {
  renters: Renter[];
  total_count: number;
}
export class Renter {
  id: number;
  user: User;
  matriculaInmobiliaria: string;
  rut: DocumentFile;
  certificadoLibertadTradicion: DocumentFile;
  bankReference: DocumentFile;

  constructor(renter?: Partial<Renter>) {
    Object.assign(this, renter);
    renter = renter || {};
  }
}
