import { Renter } from '@shared/models/renter.model';

export enum UserType {
  RENTER = 3,
  CLIENT = 2,
  ADMIN = 1
}

export enum PersonType {
  NATURAL,
  JURIDICA,
}

export class User {
  email?: string;
  person?: Person;
  company?: Company;
  renter?: Renter;
  typeUser: UserType;

  constructor(user?: Partial<User>) {
    user = user || {};
    Object.assign(this, user);
    if (user.person) {
      this.person = new Person(user.person);
    }
    if (user.company) {
      this.company = new Company(user.company);
    }
    if (user.renter) {
      this.renter = new Renter(user.renter);
    }
  }
}

export class WhOwner {
  id: number;
}

export class WhClient {
  id: number;
}

export class Person {
  id?: number;
  name?: String;
  lastName?: String;
  identification?: String;
  phoneNumber?: String;

  get fullName() { return this.name + ' ' + this.lastName; }

  constructor(person?: Partial<Person>) {
    Object.assign(this, person);
  }
}
export class Company {
  id: number;
  name: String;
  nit: String;
  phoneNumber: String;

  constructor(company?: Partial<Company>) {
    Object.assign(this, company);
    company = company || {};
  }
}
