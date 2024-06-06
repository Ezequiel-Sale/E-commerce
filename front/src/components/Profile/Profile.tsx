"use client"
import { UserSession } from '@/helpers/types/userSession';
import React, { useEffect, useState } from 'react'
import Orders from '../Orders/Orders';

const Profile: React.FC = () => {
    const [userData, setUserData] = useState<UserSession>()


  useEffect(() => {
    if(typeof window !== "undefined" && window.localStorage){
    const userData = localStorage.getItem("userSession")
    setUserData(JSON.parse(userData!))
    } }, []);

     
  return (
    <div className='mt-24 mb-6 h-[100%] flex flex-wrap justify-center md:flex md:justify-around'>
        <div className='flex flex-col gap-3 bg-black text-white w-64 h-96 rounded-md mb-4'>
            <h1 className='text-3xl font-bold text-center mt-4'>Perfil de usuario</h1>
            <h3 className='text-xl font-semibold text-center'>Nombre</h3>
            <p className='text-center text-red-400'>{userData?.userData?.name}</p>
            <h3 className='text-xl font-semibold text-center'>Email</h3>
            <p className='text-center text-red-400'>{userData?.userData?.email}</p>
            <h3 className='text-xl font-semibold text-center'>Direccion</h3>
            <p className='text-center text-red-400'>{userData?.userData?.address}</p>
            <h3 className='text-xl font-semibold text-center'>Telefono</h3>
            <p className='text-center text-red-400'>{userData?.userData?.phone}</p>
        </div>
        <div className='flex flex-col'>
            <h1 className='text-xl font-bold text-center md:text-3xl md:font-bold '>Ordenes de compra</h1>
            <Orders/>
        </div>
    </div>
  )
}

export default Profile