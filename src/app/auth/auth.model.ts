import { UserType, User } from '../shared/models/user.model';

export class Person {
    id: number;
}

export class Company {
    id: number;
}

export class Renter {
    id: number;
}

export class Auth {
    token: string;
    user: User;
    unread_nots?: number;
    role: UserType;
}

