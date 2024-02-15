export interface UserObjectInterface {
  uid?: string;
  email?: string;
  emailService?: boolean;
}

export interface JwtToken {
  access: string;
  refresh: string;
}


