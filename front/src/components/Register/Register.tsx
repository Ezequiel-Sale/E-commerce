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
    <div className="w-80 p-6 flex flex-col bg-gray-200 rounded-s mt-24 m-[auto] mb-4">
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
                title: err,
                icon: "error",
              });
            })
        }}
      >
        {() => {
          return (
            <Form className="flex flex-col items-center gap-2">
              <h2 className="text-2xl font-extrabold">
                Formulario de registro
              </h2>
              <p className="text-xs">
                Ya tienes una cuenta?{" "}
                <Link href="/login" className="text-blue-500 text-xs">
                  Click aqui para loguearte
                </Link>
              </p>
              <div className="flex flex-col items-center">
                <label className="font-bold">Nombre</label>
                <Field
                  type="text"
                  name="name"
                  placeholder="Ingrese su nombre completo"
                  className="w-60 pl-2"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="flex flex-col items-center">
                <label className="font-bold">Correo electronico</label>
                <Field
                  type="text"
                  name="email"
                  placeholder="example@mail.com"
                  className="w-60 pl-2"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="flex flex-col items-center">
                <label className="font-bold">Numero de telefono</label>
                <Field
                  type="number"
                  name="phone"
                  placeholder="Ingrese su numero de telefono"
                  className="w-60 pl-2 text-sm"
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="flex flex-col items-center">
                <label className="font-bold">Direccion</label>
                <Field
                  type="text"
                  name="address"
                  placeholder="Ingrese su direccion"
                  className="w-60 pl-2"
                />
                <ErrorMessage
                  name="address"
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
                  className="w-60 pl-2 "
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <button
                type="submit"
                className="bg-black w-16 text-white rounded-md h-6 cursor-pointer"
              >
                Enviar
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Register;
