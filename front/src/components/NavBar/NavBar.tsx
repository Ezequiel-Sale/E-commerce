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
          className="text-white bg-white hover:bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm mr-4 px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-gray-600 dark:focus:ring-red-800"
          type="button"
          onClick={handleDropdown}
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" focusable="false"><path d="M21 6H3V5h18v1zm0 5H3v1h18v-1zm0 6H3v1h18v-1z"></path></svg>
        </button>
        {dropdown && (
          <div className="absolute right-0 mt-2 w-40 bg-black bg-opacity-95 rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="py-1 flex flex-col justify-center items-center gap-1">
              <Link href="/">
                <button className="block btn">Productos</button>
              </Link>
              <Link href="/categories">
                <Button className="block btn">Categorias</Button>
              </Link>
              <Button className="block btn">Sobre Nosotros</Button>
              <Button className="block btn">Contactanos</Button>
              {!userData?.token ? (
                <>
                  <Link href={"/login"}>
                    <Button className="block btn">Ingresar</Button>
                  </Link>
                  <Link href={"/register"}>
                    <Button className="block btn">Registrarse</Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link href={"/dashboard"}>
                    <Button className="block btn">Perfil</Button>
                  </Link>
                  <Button className="block btn" onClick={logOut}>
                    Cerrar Sesión
                  </Button>
                  <div className="flex justify-center items-center w-full px-4 py-2 text-sm text-gray-700">
                    <Link href="/cart">
                      <Button className="">&#128722;</Button>
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="hidden lg:flex items-center">
        <div className="flex gap-1 lg:mr-40">
          <Link href="/">
            <Button className="block btn">Productos</Button>
          </Link>
          <Link href="/categories">
            <Button className="block btn">Categorias</Button>
          </Link>
          <Button className="block btn">Sobre Nosotros</Button>
          <Button className="block btn">Contactanos</Button>
        </div>
        {!userData?.token ? (
          <div className="flex gap-1 mr-6 items-center">
            <Link href={"/login"}>
              <Button className="block btn">Ingresar</Button>
            </Link>
            <Link href={"/register"}>
              <Button className="block btn">Registrarse</Button>
            </Link>
          </div>
        ) : (
          <div className="flex gap-1 items-center">
            <Link href={"/dashboard"}>
              <Button className="block btn">Perfil</Button>
            </Link>
            <Button className="block btn" onClick={logOut}>
              Cerrar Sesión
            </Button>
            <div className="flex items-center mr-2">
              <Link href="/cart">
                <Button className="">&#128722;</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
