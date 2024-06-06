import axios from "axios";
import { IProduct } from "./types";
import { IFormValues } from "./types/formType";
import { ILogin } from "./types/loginType";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
export const fetchProducts = async () => {
    try {
        const response = await fetch(`${apiUrl}/products/`, {
          headers: {'ngrok-skip-browser-warning': 'true'},
            next: { revalidate: 1000 },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: IProduct[] = await response.json();
        return data;
    } catch (error: any) {
        throw new Error(error);
    }
  };
export const fetchProductsById = async (id: string) => {
    try {
        const response = await fetchProducts()
        const product = response.find(product => product.id.toString() === id)
        if (!product) throw new Error('Product not found');
        return product;
    } catch (error: any) {
        throw new Error(error);
    }
  };

  

  export const registerUser = async (user: IFormValues) => {
    try {
      const response = await fetch(`${apiUrl}/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })
      if (response.ok) {
        return response.json();
      }else {
        throw new Error('El usuario ya existe con esos datos');
      }
    } catch (error: any) {
      throw new Error(error);
    }
}
  export const loginUser = async (user: ILogin) => {
    try {
      const response = await fetch(`${apiUrl}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })
      if (response.ok) {
        return response.json();
      }else {
        throw new Error('ingrese datos validos');
      }
    } catch (error: any) {
      throw new Error(error);
    }
}

export const getOrders = async (token : string) => {
    try {
        const response = await fetch(`${apiUrl}/users/orders`, {
            cache: 'no-cache',
            headers: {
              Authorization: token,
              'ngrok-skip-browser-warning': 'true',
            }
        });
        const orders = await response.json();
        return orders;
    } catch (error: any) {
        throw new Error(error);
    }
  };


export const createOrder = async (products: number[], token : string) => {
    try {
        const response = await fetch(`${apiUrl}/orders`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
              Authorization: token,
            },
            body: JSON.stringify({products}) 
        });
        const order = await response.json();
        return order;
    } catch (error: any) {
        throw new Error(error);
    }
}