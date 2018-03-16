export enum UserType {
  CLIENT,
  ADMIN
}

export enum PersonType {
  NATURAL,
  JURIDICA,
}

export class User {
  email: string;
  person?: Person;
  company?: Company;
  renter?: Renter;
}

export class WhOwner {
  id: number;
}

export class WhClient {
  id: number;
}

export class Person {
  id: number;
  name: String;
  lastName: String;
  identification: String;
  phoneNumber: String;
}
export class Company {
  id: number;
  name: String;
  nit: String;
  phoneNumber: String;
}
export class Renter {
  id: number;
}