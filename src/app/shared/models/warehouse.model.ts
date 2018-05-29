
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

  workingDays?: boolean[];
  workingTime?: String[];

  //
  positions?: Position[];

  // all characteristics of warehouse are grouped here
  parameters?: Parameter[];

  has_rack?(): boolean { return this.positions.some(p => p.typePosition === PositionType.RACK); }
  has_floor_closed?(): boolean { return this.positions.some(p => p.typePosition === PositionType.FLOOR_CLOSED); }
  has_floor_open?(): boolean { return this.positions.some(p => p.typePosition === PositionType.FLOOR_OPEN); }

  constructor(wh?: Partial<Warehouse>) {
    Object.assign(this, wh);
    this.images = this.images || [];
    if (!this.workingDays) {
      this.workingDays = new Array(7).fill(false);
    }
    if (!this.workingTime) {
      this.workingTime = ['6', 'am', '6', 'pm', '00', '00'];
    }
  }
}

export enum ParameterType {
  ACCEPTED_PRODUCTS = '1',
  SECURITY = '2',
  CERTIFICATIONS = '3',
  EXTRA_SERVICES = '4'
}
export class Parameter {
  id: number;
  description: string;
  typeParameter: ParameterType;
  cost_per_unit?: number;
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
