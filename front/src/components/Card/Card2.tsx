"use client";
import { fetchProductsById } from "@/helpers/petitions";
import { IProduct } from "@/helpers/types";
import { UserSession } from "@/helpers/types/userSession";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Button from "../Button/Button";
import { categoriesToPreLoad } from "@/helpers/types/categories";
import Image from "next/image";
import Link from "next/link";

const Card2: React.FC<IProduct> = ({
  id,
  name,
  price,
  image,
  description,
  stock,
  categoryId,
}) => {
  const [userData, setUserData] = useState<UserSession | null>(null);
  const [productById, setProductById] = useState<IProduct | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const userData = localStorage.getItem("userSession");
      if (userData) {
        setUserData(JSON.parse(userData));
      }
    }
  }, []);

  

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!userData?.token) {
      Swal.fire({
        title: "Debes estar logueado para poder agregar productos al carrito!",
        icon: "warning",
      });
      router.push("/login");
      return;
    }

    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const productExist = cart.some((product: IProduct) => product.id === id);

    if (productExist) {
      Swal.fire({
        title: "El producto ya se encuentra en el carrito",
        icon: "info",
      });
    } else {
      cart.push(productById);
      localStorage.setItem("cart", JSON.stringify(cart));
      Swal.fire({
        title: "Producto agregado al carrito",
        icon: "success",
      });
      router.push("/cart");
    }
  };
  return (
    <div className="box mt-20">
      <div className="relative group z-50 flex flex-col justify-center items-center">
      <span className="absolute top-0 left-0 w-[195px] mt-[5px] h-64 bg-black rounded-md p-1 text-xs text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 ">
          {description}
          <Link href={`/detail/${id}`}>
            <Button className="absolute bottom-2 right-2 bg-red-500 cursor-pointer w-24 h-8">Detalle</Button>
          </Link>
        </span>
        <h4 className="font-bold text-white">IPhone 11</h4>
        <p className="text-white ">${price}</p>
        <div className="flex justify-center items-center h-36 mb-2 mt-2">
          <Image
            src="/front/public/smartphones.png"
            alt="iPhone 11"
            width={150}
            height={150}
            className="object-contain"
          />
        </div>
        <div className="absolute bottom-2 left-2 flex gap-2 items-center">
          {userData?.token && (
            <Button className="bg-gray-900 w-24 h-8" onClick={handleAddToCart}>
              Comprar
            </Button>
          )}
          <p className="text-white text-[12px]">Stock: {stock}</p>
        </div>
      </div>
    </div>
  );
};

export default Card2;
