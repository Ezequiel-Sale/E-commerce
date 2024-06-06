"use client";
import React, { useEffect, useState } from "react";
import Button from "../Button/Button";
import Image from "next/image";
import Link from "next/link";
import { UserSession } from "@/helpers/types/userSession";
import { usePathname, useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { IProduct } from "@/helpers/types";

const NavBar: React.FC = () => {
  const [userData, setUserData] = useState<UserSession>();
  const [order, setOrder] = useState<IProduct[]>([]);
  const [dropdown, setDropdown] = useState(false);
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("userSession");
      const product: IProduct[] = JSON.parse(localStorage.getItem("cart")!);
      setOrder(product);
      setUserData(JSON.parse(userData!));
    }
  }, [pathName]);

  const logOut = () => {
    Swal.fire({
      title: "Deseas cerrar sesión?",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Volver atras",
      confirmButtonText: "Cerrar sesion",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("userSession");
        document.cookie = "userSession=; path=/; max-age=0;";
        setUserData(undefined);
        Swal.fire({
          title: "Cerraste sesion con exito!",
          icon: "success",
        });
        router.push("/login");
      }
    });
  };

  const handleDropdown = () => {
    setDropdown(!dropdown);
  };

  return (
    <div className="flex justify-between bg-black h-20 items-center fixed top-0 left-0 w-full z-50">
      <div>
        <Link href="/">
          <Image
            src="/logo2.png"
            alt="logo"
            width={50}
            height={30}
            className="ml-10 rounded-sm"
          />
        </Link>
      </div>
      <div className="relative lg:hidden">
        <button
          id="dropdownDefaultButton"
          data-dropdown-toggle="dropdown"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="button"
          onClick={handleDropdown}
        >
          Dropdown button
          <svg
            className="w-2.5 h-2.5 ml-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>
        {dropdown && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="py-1">
              <Link href="/">
                <Button className="block bg-red-500 w-full h-8">Productos</Button>
              </Link>
              <Link href="/categories">
                <Button className="block bg-red-500 w-full h-8">Categorias</Button>
              </Link>
              <Button className="block bg-red-500 w-full h-8">Sobre Nosotros</Button>
              <Button className="block bg-red-500 w-full h-8">Contactanos</Button>
              {!userData?.token ? (
                <>
                  <Link href={"/login"}>
                    <Button className="block bg-red-500 w-full h-8">Ingresar</Button>
                  </Link>
                  <Link href={"/register"}>
                    <Button className="block bg-red-500 w-full h-8">Registrarse</Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link href={"/dashboard"}>
                    <Button className="block bg-red-500 w-full h-8">Perfil</Button>
                  </Link>
                  <Button className="block bg-red-500 w-full h-8" onClick={logOut}>
                    Cerrar Sesión
                  </Button>
                  <div className="flex items-center justify-between w-full px-4 py-2 text-sm text-gray-700">
                    <Link href="/cart">
                      <Button className="">&#128722;</Button>
                    </Link>
                    <span className="text-white rounded-full bg-red-500 w-[12px] h-[12px] flex justify-center items-center text-xs mr-2">
                      {order.length}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="hidden lg:flex items-center">
        <div className="flex gap-1 lg:mr-32">
          <Link href="/">
            <Button className="block bg-red-500 w-24 h-8">Productos</Button>
          </Link>
          <Link href="/categories">
            <Button className="block bg-red-500 w-24 h-8">Categorias</Button>
          </Link>
          <Button className="block bg-red-500 w-36 h-8">Sobre Nosotros</Button>
          <Button className="block bg-red-500 w-28 h-8">Contactanos</Button>
        </div>
        {!userData?.token ? (
          <div className="flex gap-1 mr-6 items-center">
            <Link href={"/login"}>
              <Button className="block bg-red-500 w-24 h-8">Ingresar</Button>
            </Link>
            <Link href={"/register"}>
              <Button className="block bg-red-500 w-24 h-8">Registrarse</Button>
            </Link>
          </div>
        ) : (
          <div className="flex gap-1 items-center">
            <Link href={"/dashboard"}>
              <Button className="block bg-red-500 w-24 h-8">Perfil</Button>
            </Link>
            <Button className="block bg-red-500 w-32 h-8 mr-1.5" onClick={logOut}>
              Cerrar Sesión
            </Button>
            <div className="flex items-center">
              <Link href="/cart">
                <Button className="">&#128722;</Button>
              </Link>
              <span className="text-white rounded-full bg-red-500 w-[12px] h-[12px] flex justify-center items-center text-xs mr-2">
                {order.length}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
