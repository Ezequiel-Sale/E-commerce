"use client";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { IFormValues } from "../../helpers/types/formType";
import Link from "next/link";
import { validaciones } from "../../helpers/validateRegister";
import { useRouter } from "next/navigation";
import { registerUser } from "@/helpers/petitions";
import Swal from "sweetalert2";


const Register: React.FC = () => {
  const router = useRouter()
  return (
    <div className="w-80 h-[auto] -z-10 p-6 flex flex-col items-center mt-24 m-[auto] mb-4">
      <Formik<IFormValues>
        initialValues={{
          name: "",
          email: "",
          phone: "",
          address: "",
          password: "",
        }}
        validateOnChange
        validate={validaciones}
        onSubmit={(values, { resetForm }) => {
          registerUser(values)
            .then((response) => {
              console.log(response)
                Swal.fire({
                  title: "Usuario creado con exito",
                  icon: "success",
                });
                resetForm()
                setTimeout(() => {
                  router.push("/login");
                }, 2000);
            })  
            .catch((err) => {
              Swal.fire({
                title: "Un usuario ya existe con esos datos",
                icon: "error",
              });
            })
        }}
      >
        {() => {
          return (
            <div className="box group z-0 flex justify-center items-center w-[350px] h-[auto]">
            <Form className="flex group mt-4 z-50 flex-col items-center gap-3">
              <h2 className="text-2xl font-sans text font-extrabold text-white">
                Formulario de registro
              </h2>
              <p className="text-xs text-white">
                Ya tienes una cuenta?{" "}
                <Link href="/login" className="text-blue-500 text-xs">
                  Click aqui para loguearte
                </Link>
              </p>
              <div className="flex flex-col items-center text-white">
                <label className="font-bold">Nombre y Apellido</label>
                <Field
                  type="text"
                  name="name"
                  placeholder="Ingrese su nombre completo"
                  className="w-60 pl-2 text-black"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="flex flex-col items-center text-white">
                <label className="font-bold">Correo electronico</label>
                <Field
                  type="text"
                  name="email"
                  placeholder="example@mail.com"
                  className="w-60 pl-2 text-black"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="flex flex-col items-center text-white">
                <label className="font-bold">Numero de telefono</label>
                <Field
                  type="number"
                  name="phone"
                  placeholder="Ingrese su numero de telefono"
                  className="w-60 pl-2 text-sm text-black"
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="flex flex-col items-center text-white">
                <label className="font-bold">Direccion</label>
                <Field
                  type="text"
                  name="address"
                  placeholder="Ingrese su direccion"
                  className="w-60 pl-2 text-black"
                />
                <ErrorMessage
                  name="address"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="flex flex-col items-center text-white">
                <label className="font-bold">Contraseña</label>
                <Field
                  type="password"
                  name="password"
                  placeholder="********"
                  className="w-60 pl-2 text-black"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm text-center"
                />
              </div>
              <div className="flex flex-col items-center text-white">
                <label className="font-bold">Repita su contraseña</label>
                <Field
                  type="password"
                  name="repitePassword"
                  placeholder="********"
                  className="w-60 pl-2 text-black"
                />
                <ErrorMessage
                  name="repitePassword"
                  component="div"
                  className="text-red-500 text-sm text-center"
                />
              </div>
              <button
                type="submit"
                className="bg-black w-16 text-white mb-4 rounded-md h-6 cursor-pointer hover:bg-white hover:text-black"
              >
                Enviar
              </button>
            </Form>
            </div>
          );
        }}
      </Formik>
    </div>
  );
};

export default Register;
