export enum UserType {
  OWNER,
  CLIENT,
  ADMIN
}

export class User {
  username: string;
}

export class WhOwner {
  id: number;
}

export class WhClient {
  id: number;
}
