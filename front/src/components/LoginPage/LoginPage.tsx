"use client"
import Login from "@/components/Login/Login";
import React, { useState } from 'react'

const LoginPage: React.FC = () => {
  const [token, setToken] = useState<string | null>(localStorage.getItem("userSession") ?? null);
  
  return (
    <Login token={token} setToken={setToken}/>
  )
}

export default LoginPage;