import React from 'react'
import Login from '@/components/Login/Login'
import { LoginProps } from '@/helpers/types/loginrops'

const page: React.FC<LoginProps> = ({token, setToken}: LoginProps) => {
  return (
    <>
    <Login token={token} setToken={setToken}/>
    </>
  )
}

export default page