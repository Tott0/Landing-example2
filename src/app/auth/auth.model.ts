import { PersonType } from '../../app/shared/enums/person-type.enum';

export class User {
    id?: number;
    email?: string;
    name?: string;
    identification?: string;
    address?: string;
    contact_phone?: string;
    type_user?: PersonType;
}

export class Auth {
    token: string;
    user: User;
    unread_nots?: number;
}

