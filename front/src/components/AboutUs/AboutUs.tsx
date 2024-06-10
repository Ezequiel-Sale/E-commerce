import Image from "next/image";
import React from "react";

const AboutUs = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center group z-0 h-[100vh]">
        <h1 className="text-3xl font-bold text-center text-white">
          Acerca de nosotros
        </h1>
        <div className="flex flex-col justify-center md:flex md:flex-row items-center w-[75vw]">
          <div className="box my-8 flex flex-col rounded-full group relative justify-center md:flex md:justify-center md:items-center">
            <div className="image-wrapper p-[5px]">
              <Image
                src="/about.jpg"
                alt="aboutus"
                width={300}
                height={300}
                className="rounded-[15px]"
              />
            </div>
          </div>
          <p className="text-white m-4 text-sm w-[350px] text-wrap">
            Buenas! mi nombre es Ezequiel Alejandro Sale, tengo 32 años y vivo
            en Tucuman-Argentina. Mis hobbies son jugar al futbol, jugar al
            padel y programar. Actualmente estoy estudiando programacion web
            full stack en Henry, esta siendo un reto para mi pero lo tomo como
            una oportunidad para seguir mejorando en esto que me gusta mucho que
            es la programción.
          </p>
          </div>
      </div>
    </>
  );
};

export default AboutUs;
