import { UserType } from '../shared/models/user.model';

export class User {
    id?: number;
    email?: string;
    name?: string;
    identification?: string;
    address?: string;
    contact_phone?: string;
}

export class Auth {
    token: string;
    user: User;
    unread_nots?: number;
    role: UserType;
}

