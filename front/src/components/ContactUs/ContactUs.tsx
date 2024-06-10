"use client";
import React from "react";
import Swal from "sweetalert2";
import Button from "../Button/Button";

const ContactUs = () => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Mensaje enviado con exito!",
            showConfirmButton: false,
            timer: 1500,
          });
    };
  return (
    <>
      <div className="mt-14 md:mt-10 md:mb-4 flex flex-col justify-center items-center h-[100vh]">
        <h1 className="text-3xl font-bold text-center text-white mb-4">Contactanos!</h1>
        <div className="flex flex-col items-center justify-center w-[320px] md:flex md:flex-row md:justify-center md:items-center md:w-[770px] md:p-2 border-spacing-4 border-white border-2 rounded-lg gap-4 shadow-lg shadow-red-50">
          <form className="w-[300px] flex flex-col gap-3 items-center">
            <div className="flex flex-col w-[300px]">
              <label htmlFor="name" className="text-white font-medium">
                Nombre completo
              </label>
              <input type="text" placeholder="Nombre comptleto" />
            </div>
            <div className="flex flex-col w-[300px]">
              <label htmlFor="phone" className="text-white font-medium">
                Numero de telefono
              </label>
              <input type="number" placeholder="Numero de telefono" />
            </div>
            <div className="flex flex-col w-[300px]">
              <label htmlFor="msj" className="text-white font-medium">
                Ingrese un mensaje
              </label>
              <textarea
                name="msj"
                rows={8}
                cols={50}
                placeholder="Escriba su mensaje"
              ></textarea>
            </div>
            <Button onClick={handleSubmit} className="bg-red-500 text-white font-medium w-24 rounded-md">
              Enviar
            </Button>
          </form>
          <div>
            <iframe
              className="rounded-md md:w-[400px] md:h-[350px] mb-4"
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d33869.50098002289!2d-65.18440433719287!3d-26.837002286653192!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses-419!2sar!4v1718008142540!5m2!1ses-419!2sar"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
