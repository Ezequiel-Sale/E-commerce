"use client";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button } from "@material-tailwind/react";
import { ILogin } from "../../helpers/types/loginType";
import Link from 'next/link';
import { validacionesLogin } from "../../helpers/validateLogin";
import { LoginProps } from "@/helpers/types/loginrops";
import { useRouter } from "next/navigation";
import { loginUser } from "@/helpers/petitions";
import Swal from "sweetalert2";


const Login: React.FC<LoginProps> = ({token, setToken}) => {
  const router = useRouter()
  return (
    <div className="w-80 p-6 flex flex-col bg-gray-200 rounded-s mt-24 m-[auto] mb-4">
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
            const {token, user} = json
            localStorage.setItem("userSession", JSON.stringify({token: token, userData: user}))
            document.cookie = `userSession=${token}; path=/; max-age=86400; SameSite=Strict;`;
            setToken(token)
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Usuario logeado con exito!",
              showConfirmButton: false,
              timer: 1500
            });
            resetForm()
            router.push("/")
          })
          .catch((err) => {
            Swal.fire({
              title: {
                text: err.response.data.message,},
              icon: "error",
            });
          });
        }}
      >
        <Form className="flex flex-col items-center gap-2">
          <h2 className="text-2xl font-extrabold">Ingresar</h2>
            <p className="text-xs flex flex-col">Aun no tienes una cuenta? <Link href="/register" className="text-blue-500 text-xs">Click aqui para registrarte</Link></p>
          <div className="flex flex-col items-center">
            <label className="font-bold">Correo electronico</label>
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
          <div className="flex flex-col items-center">
            <label className="font-bold">Contraseña</label>
            <Field
              type="password"
              name="password"
              placeholder="********"
              className="w-60 pl-2"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>
          <div className="mr-24">
            <Link href={"*"}>
              <span className="text-blue-500 text-xs">Olvidaste tu contraseña?</span>
            </Link>
          </div>
          <Button type="submit" className="bg-black w-16 h-6 cursor-pointer">
            Enviar
          </Button>
        </Form>
      </Formik>
    </div>
  );
};

export default Login;


 // fetch(`${apiUrl}/users/login`, {
          //   method: "POST",
          //   headers: {
          //     "Content-Type": "application/json",
          //   },
          //   body: JSON.stringify(valores),
          // })