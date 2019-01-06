import { Renter } from '@shared/models/renter.model';

export enum UserType {
  RENTER = 3,
  CLIENT = 2,
  ADMIN = 1
}

export enum PersonType {
  NATURAL = 'Person',
  JURIDICA = 'Company',
}

export class User {
  email?: string;
  person?: Person;
  company?: Company;
  renter?: Renter;
  typeUser: UserType;

  profile: Person | Company;
  profileType: PersonType;

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
    if (user.profile) {
      this.profile = user.profileType === PersonType.NATURAL ? new Person(user.profile) : new Company(user.profile);
    } else {
      this.profile = this.person || this.company;
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
  cellPhone?: String;

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
