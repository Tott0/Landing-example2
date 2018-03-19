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
