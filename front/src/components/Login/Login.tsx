"use client";
import React, { useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { ILogin } from "../../helpers/types/loginType";
import Link from "next/link";
import { validacionesLogin } from "../../helpers/validateLogin";
import { LoginProps } from "@/helpers/types/loginrops";
import { useRouter } from "next/navigation";
import { loginUser } from "@/helpers/petitions";
import Swal from "sweetalert2";

const Login: React.FC<LoginProps> = () => {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
    if (passwordRef.current) {
      passwordRef.current.type = showPassword ? "password" : "text";
    }
  };
  return (
    <div className="w-80 h-[80vh] -z-10 p-6 flex flex-col items-center mt-24 m-[auto] mb-4">
      <Formik<ILogin>
        initialValues={{
          email: "",
          password: "",
        }}
        validateOnChange
        validate={validacionesLogin}
        onSubmit={(valores, { resetForm }) => {
          loginUser(valores)
            .then((json) => {
              const { token, user } = json;
              localStorage.setItem(
                "userSession",
                JSON.stringify({ token: token, userData: user })
              );
              document.cookie = `userSession=${token}; path=/; max-age=86400; SameSite=Strict;`;
              setToken(token);
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Usuario logeado con exito!",
                showConfirmButton: false,
                timer: 1500,
              });
              resetForm();
              router.push("/");
            })
            .catch((err) => {
              console.log(err);
              Swal.fire({
                title:
                  "Error al iniciar sesión, correo electronico o contraseña incorrecta",
                icon: "error",
              });
            });
        }}
      >
        <div className="box group z-0 flex justify-center items-center w-[350px] h-[400px] ">
          <Form className="top-8 z-50 flex flex-col items-center justify-center gap-4">
            <h2 className=" text-4xl font-extrabold text-white font-sans">
              Ingresar
            </h2>
            <p className="text-xs text-white flex flex-col">
              Aun no tienes una cuenta?{" "}
              <Link href="/register" className="text-blue-500 text-xs">
                Click aqui para registrarte
              </Link>
            </p>
            <div className="flex flex-col items-center gap-2">
              <label className="font-bold text-white">Correo electronico</label>
              <Field
                type="text"
                name="email"
                placeholder="Ingrese su Correo electronico"
                className="w-60 pl-2"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="flex flex-col items-center gap-2">
              <label className="font-bold text-white">Contraseña</label>
              <div className="relative">
                <Field
                  innerRef={passwordRef}
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="********"
                  className="w-60 pl-2 pr-8"
                />
                <button
                  type="button"
                  onClick={toggleShowPassword}
                  className="absolute right-1"
                >
                  {showPassword ? "🙉" : "🙈"}
                </button>
              </div>
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="mr-24">
              <Link href={"*"}>
                <span className="text-blue-500 text-xs">
                  Olvidaste tu contraseña?
                </span>
              </Link>
            </div>
            <button
              type="submit"
              className="bg-black w-16 h-6 mb-2 text-white rounded-md cursor-pointer hover:bg-white hover:text-black"
            >
              Enviar
            </button>
          </Form>
        </div>
      </Formik>
    </div>
  );
};

export default Login;
