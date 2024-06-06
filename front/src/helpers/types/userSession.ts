import { IUser } from ".";
import { Product } from "./Product";

export interface UserSession {
  token: string;
  userData: {
    id: number;
    name: string;
    email: string;
    address: string;
    phone: string;
    role: string;
    orders: [];
  };
}

enum Role {
  ADMIN = "admin",
  USER = "user",
}

export interface ICredential {
  id: number;
  password: string;
}

export interface IOrder {
  id: number;
  status: string;
  date: Date;
  user: IUser;
  products: Product[];
}
