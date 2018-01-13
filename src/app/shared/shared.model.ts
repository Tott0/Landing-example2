import { AttachmentType } from './enums/attachment-type.enum';
import { PersonType } from './enums/person-type.enum';
import { CarType } from './enums/car-type.enum';
import { CaseState } from './enums/case-state.enum';

export class MultaCode {
  id: number;
  description: string;
  short_description?: string;
  type_multa: string;
  cost: number;
}

export class Case {
  id?: number;
  codigo?: string;
  description?: string;
  latitud?: number;
  longitud?: number;
  address?: string;
  type_car?: CarType;
  code_value_multa?: MultaCode;
  date?: Date;

  audio?: Attachment;
  fotos_multa?: Attachment[];
  fotos_licencia?: Attachment[];
  fotos_cedula?: Attachment[];

  lawyer?: User;
  user?: User;

  cost_case?: number;

  assigned_case?: AssignedCase;
  state?: CaseState;
  esperando_pago?: ASD;
  pendiente?: ASD;
  radicacion?: ASD;
  radicacion2?: ASD;
  fallo?: Fallo;
  resolucion?: ASD;
}

export class AssignedCase {
  id: number;
}

export class Attachment {
  id?: number;
  url: string;
  file?: File;
  type_attachment?: AttachmentType;
}

export class ASD {
  fecha: Date;
}

export class Fallo {
  fecha: Date;
  motivo: string;
}

export class User {
  name: string;
  email: string;
  type_user: PersonType;
}

//

export class AbuseCase {
  id: number;
  title: string;
  video_id: string;
}

export class Formato {
  id: number;
  detail: string;
  file_url: string;
}

//

export class PicoYPlaca {
  ciudad: Ciudad;
  city_id?: number;
  date_in: Date;
  date_end: Date;

  days: PicoYPlacaDia[]; // 7 days
}

export class PicoYPlacaDia {
  date?: Date;
  intervals?: Jornada[];
}

export class Jornada {
  description?: string;
  descriptionA?: string[];
  pp_car?: string;
  pp_bike?: string;
  pp_taxi?: string;
}

export class Ciudad {
  id: number;
  detail: string;
  photo_url: string;
}
//

export class Notification {
  id?: number;
  description: string;
  date: Date;
}
