import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const NotFound = () => {
  return (
    <div className='flex mt-24 justify-center items-center'>
        <p>Haga clic aqui para regresar al Home&#129146;</p>
        <Link href={"/"}>
          <Image src={"/404.gif"} alt="404" width={450} height={450} className='mb-4' unoptimized/>
        </Link>
        <p>&#129144;Haga clic aqui para regresar al Home</p>
    </div>
  )
}

export default NotFound