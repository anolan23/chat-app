import {
  autoLogin,
  login as apiLogin,
  logout as apiLogout,
  signup as apiSignup,
} from '../api';
import { Credentials } from '../types/user';

export interface UserProps {
  id?: number;
  photo?: string;
  name?: string;
  bio?: string;
  phone?: string;
  email?: string;
  isSignedIn?: boolean;
}

export class User {
  data: UserProps = {};

  set(update: UserProps): void {
    Object.assign(this.data, update);
  }

  async autoLogin() {
    try {
      const user = await autoLogin();
      this.set({ ...user, isSignedIn: true });
    } catch (error) {
      this.set({ isSignedIn: false });
      throw error;
    }
  }

  async signup(credentials: Credentials): Promise<UserProps> {
    try {
      const { email, password } = credentials;
      const user = await apiSignup({ email, password });
      this.set({ ...user, isSignedIn: true });
      return user;
    } catch (error) {
      throw error;
    }
  }

  async login(credentials: Credentials): Promise<UserProps> {
    try {
      const { email, password } = credentials;
      const user = await apiLogin({ email, password });
      this.set({ ...user, isSignedIn: true });
      return user;
    } catch (error) {
      this.set({ isSignedIn: false });
      throw error;
    }
  }

  async logout() {
    try {
      await apiLogout();
      this.set({ isSignedIn: false });
    } catch (error) {
      throw error;
    }
  }
}

export const user = new User();
