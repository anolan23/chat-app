export interface User {
  id?: number;
  photo?: string;
  name?: string;
  bio?: string;
  phone?: string;
  email?: string;
  isSignedIn?: boolean;
}

export interface Credentials {
  email: string;
  password: string;
}
