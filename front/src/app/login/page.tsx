"use client"
import Login from "@/components/Login/Login";
import React, { useState } from 'react'

const Page = () => {
  const [token, setToken] = useState<string | null>(localStorage.getItem("userToken") ?? null);

  return (
    <Login token={token} setToken={setToken}/>
  )
}

export default Page