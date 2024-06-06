export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  categoryId: number;
}
export interface ICategory {
  id: number;
  name: string;
}

export interface IOrder {
  id: number;
  status: string;
  date: Date;
  user: IUser;
  products: IProduct[];
}

enum Role {
  ADMIN = "admin",
  USER = "user",
}
export interface IUser {
  id: number;
  name: string;
  email: string;
  address: string;
  phone: string;
  role: Role;
  credential: ICredential;
  orders: IOrder[];
}

export interface ICredential {
  id: number;
  password: string;
}


