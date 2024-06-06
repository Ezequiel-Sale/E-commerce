"use client";
import Button from "@/components/Button/Button";
import { IProduct } from "@/helpers/types";
import { UserSession } from "@/helpers/types/userSession";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Image from "next/image";
import { redirect } from "next/navigation";
import { createOrder } from "@/helpers/petitions";
import Link from "next/link";

const Cart: React.FC<IProduct> = () => {
  const [userData, setUserData] = useState<UserSession>();
  const [order, setOrder] = useState<IProduct[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const userData: UserSession = JSON.parse(
        localStorage.getItem("userSession")!
      );
      const product: IProduct[] = JSON.parse(localStorage.getItem("cart")!);
      setUserData(userData!);
      setOrder(product!);
      !userData?.token && redirect("/login");
    }
  }, []);

  const handleButton = async () => {
    const productId = new Set(order.map((product) => product.id));
    Swal.fire({
      title: 'Pulsa "Comprar" para finalizar la compra',
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Volver atras",
      confirmButtonText: "Comprar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await createOrder(Array.from(productId), userData?.token!);
        setOrder([]);
        localStorage.setItem("cart", "[]");
        Swal.fire({
          title: "Compra realizada con éxito!",
          icon: "success",
        });
      }
    });
  };

  const deleteProduct = (e: React.MouseEvent<HTMLButtonElement>) => {
    const productId = e.currentTarget.id;
    Swal.fire({
      title: "Estas seguro de querer eliminar este producto del carrito?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "No, cancelar!",
      confirmButtonText: "Si, eliminar!"
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedOrder = order.filter((product) => product.id.toString() !== productId);
        setOrder(updatedOrder);
        localStorage.setItem("cart", JSON.stringify(updatedOrder));
        Swal.fire({
          title: "Producto eliminado del carrito!",
          icon: "success"
        });
      }
    });
    
  };

  return (
    <>
      <h1 className="text-2xl text-center font-extrabold mt-24 m-2 md:flex">Carrito de Compras</h1>
      <div className="flex flex-col items-center mt-4 mb-8 md:flex md:flex-row md:justify-between md:items-start">
        <div className="flex flex-wrap w-[70vw] gap-1 mb-16 justify-center md:flex md:justify-start md:flex-wrap md:ml-6 md:gap-3">
          {order?.length > 0 ? (
            order.map((orden: IProduct, indexCart) => {
              return (
                <div
                  key={indexCart}
                  className="flex flex-col relative w-[200px] h-[300px] mt-4 bg-red-500 p-4 rounded-md text-red-200 bg-opacity-95 transition-transform hover:scale-110 drop-shadow-xl group z-0"
                >
                  <p className="font-bold text-white">{orden.name}<button id={orden.id.toString()} type="button" onClick={deleteProduct} className="absolute top-0.5 right-0.5 flex justify-center items-center cursor-pointer rounded-full w-4 bg-red-500 text-white  text-xs border border-black">x</button></p>
                  <p className="text-white ">${orden.price}</p>
                  <div className="flex justify-center items-center h-36 mb-2 mt-2">
                    <Image
                      src={orden.image}
                      alt={orden.name}
                      width={150}
                      height={150}
                      className="object-contain"
                    />
                  </div>
                  <div className="absolute bottom-2 left-2 flex gap-2 items-center">
                    <p className="text-white text-[12px]">
                      Stock: {orden.stock}
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="mb-8 flex flex-col items-center">
              <p className="text-3xl font-semibold mt-24">
                No hay productos en el carrito!
              </p>
              <Link href={"/"}>
              <Button className="bg-black mt-6 w-40 h-8">Volver a productos</Button>
              </Link>
            </div>
          )}
        </div>
        <div className="flex flex-col md:mr-28 md:mt-6">
          <h2 className="text-3xl text-center font-extrabold">Total</h2>
          <p className="text-2xl text-center mt-8 font-semibold text-blue-600">
            ${order?.reduce((acc, curr) => acc + curr.price, 0)}
          </p>
          <Button className="bg-black mt-14 w-24 h-8" onClick={handleButton}>
            Comprar
          </Button>
        </div>
      </div>
    </>
  );
};

export default Cart;
