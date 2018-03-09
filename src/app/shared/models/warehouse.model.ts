
import { Ciudad } from './shared.model';
import { WhOwner } from './user.model';

export class Warehouse {
  whOwner?: WhOwner; // FIXME this is obligatory
  name: string;
  lat: number;
  lng: number;
  city: Ciudad;
  address: string;

  //
  positions: Position[];

  // all characteristics of warehouse are grouped here
  parameters: Parameter[] | number[];

  has_rack?(): boolean { return this.positions.some(p => p.type === PositionType.RACK); }
  has_floor_closed?(): boolean { return this.positions.some(p => p.type === PositionType.FLOOR_CLOSED); }
  has_floor_open?(): boolean { return this.positions.some(p => p.type === PositionType.FLOOR_OPEN); }

  constructor(wh: Warehouse) {
    this.whOwner = wh.whOwner;
    this.name = wh.name;
    this.lat = wh.lat;
    this.lng = wh.lng;
    this.city = wh.city;
    this.address = wh.address;
    this.positions = wh.positions;
    this.parameters = wh.parameters;
  }
}

export enum ParameterType {
  ACCEPTED_PRODUCTS,
  SECURITY,
  CERTIFICATIONS,
  EXTRA_SERVICES
}
export class Parameter {
  id: number;
  description: string;
  type: ParameterType;
  cost_per_unit?: number;
}

export enum PositionType {
  RACK,
  FLOOR_OPEN,
  FLOOR_CLOSED
}
export enum MeasureType {
  M2,
  PALLET
}
export class Position {
  id: number;
  type: PositionType;
  measure: MeasureType;
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
}
