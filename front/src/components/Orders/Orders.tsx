"use client";
import { getOrders } from "@/helpers/petitions";
import { IOrder } from "@/helpers/types";
import { UserSession } from "@/helpers/types/userSession";
import React, { useEffect, useState } from "react";
import Button from "../Button/Button";
import Link from "next/link";

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<IOrder[]>([])
  const [userData, setUserData] = useState<UserSession>();
console.log(orders)
  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const userData = localStorage.getItem("userSession");
      setUserData(JSON.parse(userData!));
    }

  }, []);

    useEffect(() => {
      const fetchData = async () => {
          const orderResponse = await getOrders(userData?.token!);
          setOrders(orderResponse);
        };
       userData?.token && fetchData();
  }, [userData?.token]);

  return (
    <div className="flex flex-wrap mt-4">
      {
        orders?.length > 0 ? (
          orders?.map((order) => (
            <div key={order.id} className="flex flex-col justify-center items-center bg-black text-white w-[auto] ml-4 p-1 mb-4 rounded-md hover:scale-110">
              <p className="text-xl">ID de la orden:</p>
              <p className='text-center text-red-400'>{order.id}</p>
              <p className="text-xl">Estado de la orden: </p>
              <p className='text-center text-green-500'>{order.status}</p>
              <p className="text-xl">Fecha de la orden: </p>
              <p className='text-center text-red-400'>{new Date(order.date).toLocaleDateString()}</p>
              <p className="text-xl">Productos:</p>
              <p className='text-center text-red-400'>{order.products.map((product, index) => <p key={index}>{product.name}</p> )}</p>
              <p className='text-center text-white'>Total: <span className="text-red-400">${order.products.reduce((acc, product) => acc + product.price, 0)}</span></p>
            </div>
          ))
        ):(
          <div className="flex flex-col justify-center items-center mt-4">
            <p className="text-2xl font-semibold mb-4">No realizaste ninguna ornen, aún!</p>
            <Link href={"/"}>
            <Button className="bg-red-500 w-28">Comprar ahora</Button>
            </Link>

          </div>
        )
      }
    </div>
  
  )
}

export default Orders;
