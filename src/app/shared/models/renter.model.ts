import { User } from '@shared/models/user.model';
import { DocumentFile } from '@shared/models/shared.model';

export interface RenterApi {
  renters: Renter[];
  total_count: number;
  matriculaInmobiliaria: string;
  rut: DocumentFile;
  certificadoLibertadTradicion: DocumentFile;
  bankReference: DocumentFile;
}
export class Renter {
  id: number;
  user: User;

  constructor(renter?: Partial<Renter>) {
    Object.assign(this, renter);
    renter = renter || {};
  }
}
