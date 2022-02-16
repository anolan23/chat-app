export interface UserData {
  id?: number;
  photo?: string;
  name?: string;
  bio?: string;
  phone?: string;
  email?: string;
  isSignedIn?: boolean;
}

export interface User {
  data: UserData;
  setUser: React.Dispatch<React.SetStateAction<UserData>>;
  signup: (credentials: Credentials) => Promise<UserData>;
  login: (credentials: Credentials) => Promise<UserData>;
  logout: () => Promise<void>;
}

export interface Credentials {
  email: string;
  password: string;
}
