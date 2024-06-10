"use client";
import Button from "@/components/Button/Button";
import { fetchProductsById } from "@/helpers/petitions";
import { IProduct } from "@/helpers/types";
import { Product } from "@/helpers/types/Product";
import { UserSession } from "@/helpers/types/userSession";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const DetailProduct = ({ params }: { params: { id: string } }) => {
  const [userData, setUserData] = useState<UserSession | null>(null);
  const [productById, setProductById] = useState<Product | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const userData = localStorage.getItem("userSession");
      if (userData) {
        setUserData(JSON.parse(userData));
      }
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const product = await fetchProductsById(params.id);
      setProductById(product);
    };
    fetchData();
  }, [params.id]);

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
    const productExist = cart.some((product: IProduct) => product.id === productById?.id);

    if (productExist) {
      Swal.fire({
        title: "El producto ya se encuentra en el carrito",
        icon: "info",
      });
    } else {
      if (productById) {
        cart.push(productById);
        localStorage.setItem("cart", JSON.stringify(cart));
        Swal.fire({
          title: "Producto agregado al carrito",
          icon: "success",
        });
        router.push("/cart");
      }
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-4 mt-8 h-[100vh] md:flex md:flex-row md:justify-center md:m-[auto] md:items-center md:w-[50vw] md:h-[100vh]">
        {productById && (
          <>
            <Image
              src={productById.image!}
              alt={productById.name!}
              width={200}
              height={200}
            />
            <div className="flex flex-col ml-10 gap-2">
              <h1 className="font-bold text-2xl text-white">{productById.name}</h1>
              <p className="font-bold text-white">${productById.price}</p>
              <p className="font-medium mr-8 text-justify text-white bg-gray-400 bg-opacity-25 rounded-md p-1">
                {productById.description}
              </p>
              <Button
                id={productById.id?.toString()}
                onClick={handleAddToCart}
                className="bg-black w-[150px] h-8 hover:bg-white hover:text-black"
              >
                Add to cart &#128722;
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default DetailProduct;
