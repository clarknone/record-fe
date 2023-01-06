export interface AuthUser {
  email: string;
  token: string;
  type: number;
}

export interface AuthLogin {
  email: string;
  password: string;
}

export interface AuthRegister {
  email: string;
  phone: string;
  full_name: string;
  password: string;
}
