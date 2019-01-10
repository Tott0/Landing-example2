
import { Ciudad, DocumentFile } from './shared.model';
import { User } from '@shared/models/user.model';

export interface WarehouseApi {
  warehouses: Warehouse[];
  total_count: number;
}

interface Attachment {
  id: number;
  image: DocumentFile;
}

export class Warehouse {
  user?: User; //
  name?: String;
  lat?: number;
  lng?: number;
  city?: Ciudad;
  address?: String;
  description?: String;
  images?: DocumentFile[];
  attachments?: Attachment[];

  workingDays?: boolean[]; // aca esta wea es un vector de 7 lunes-domingo (o domingo-sabado) true si trabaja
  // workingTime?: number[]; // podemos hacer un foirmato en numero con este tengo una idea, 
  // en la pagina esta dividida la hora en unidades de 15 minutos por lo que podria ser
  // [6*4, 18*4] = 6:00am. - 6:00pm
  serviceTime: number;
  serviceEndTime: number;
  dockTime: number;
  dockEndTime: number;
  sameDayTime: number;

  //
  positions?: Position[];  // los espacios, se quito una vez mas el tipo CAJA, solo queda Piso cubierto, 
  // descubierto, rack (creo que todavia falta para saber si es doble stack o triple stack)

  // all characteristics of warehouse are grouped here
  parameters?: Parameter[];
  extraServices: ServiceParameter[];

  // certificado libertad y Tradición
  certificadoLibertadTradicion: DocumentFile; // el documento que se paso del usuario, este cambio ya lo hice
  matInmobiliaria: string; // No. documento que era de usuario

  areaSize: number;
  inboundResponseTime: string;
  outboundResponseTime: string;
  customerAccess: string; // 0: no acceso / 1: Si acceso
  schedulingWindowTime: string;
  contactName: string;
  contactLastName: string;
  contactPhone: string;
  contactEmail: string;
  spaceHandlingPrice: number;
  caseHandlingPrice: number;
  itemHandlingPrice: number;

  has_rack?(): boolean { return this.positions.some(p => p.typePosition === PositionType.RACK); }
  has_floor_closed?(): boolean { return this.positions.some(p => p.typePosition === PositionType.FLOOR_CLOSED); }
  has_floor_open?(): boolean { return this.positions.some(p => p.typePosition === PositionType.FLOOR_OPEN); }

  constructor(wh?: Partial<Warehouse>) {
    Object.assign(this, wh);
    this.images = this.images || [];
    if (!this.workingDays) {
      this.workingDays = new Array(7).fill(true);
    }
    if (!this.serviceTime) {
      this.serviceTime = 6 * 4;
    }
    if (!this.serviceEndTime) {
      this.serviceEndTime = 18 * 4;
    }
    if (!this.dockTime) {
      this.dockTime = 6 * 4;
    }
    if (!this.dockEndTime) {
      this.dockEndTime = 18 * 4;
    }
    if (!this.sameDayTime) {
      this.sameDayTime = 6 * 4;
    }
    if (!this.customerAccess) {
      this.customerAccess = '0';
    }
  }
}

export enum ParameterType {
  ACCEPTED_PRODUCTS = '1',
  SECURITY = '2',
  CERTIFICATIONS = '3',
  EXTRA_SERVICES = '4'
}
export enum ServiceType {
  BASIC = 1,
  ADDITIONAL = 2,
}

export class Parameter {
  id: number;
  description: string;
  typeParameter: ParameterType;
  checked?: boolean;
}

export class ServiceParameter {
  id: number;
  description: string;
  typeService: ServiceType;
  price?: number;
  checked?: boolean;
}

export enum PositionType {
  RACK,
  FLOOR_OPEN,
  FLOOR_CLOSED,
  BOX
}
export enum MeasureType {
  M2,
  PALLET
}
export class Position {
  id?: number;
  typePosition: PositionType;
  measure?: MeasureType;
  amount: number; // available spaces for this type of position in warehouse
  price_per_unit: number;
  // measurements, default for floor type is 1m2
  width: number;
  length: number;
  max_height: number;
  max_weight: number;
  //
  refrigerated?: boolean;
  dangerous?: boolean;

  constructor(position?: Partial<Position>) {
    position = position || {};
    Object.assign(this, position);
    this.refrigerated = false;
    this.dangerous = false;
  }
}

export const mockWarehouse: Partial<Warehouse> = {
  name: 'Bodega Test',
  city: {
    id: 1,
    name: 'Barranquilla',
    department: {
      id: 1,
      name: 'Atlántico'
    }
  },
  lat: 10.9838119,
  lng: -74.8180175,
  address: 'Calle falsa #123',
  description: 'Una Descripción para la bódega',

  matInmobiliaria: '1234567899',

  areaSize: 100000,
  inboundResponseTime: '0',
  outboundResponseTime: '0',
  customerAccess: '0',
  schedulingWindowTime: '0',
  contactName: 'Nombre Contacto',
  contactLastName: 'Apellido Contacto',
  contactPhone: '3022155487',
  contactEmail: 'email@email.com',
};

