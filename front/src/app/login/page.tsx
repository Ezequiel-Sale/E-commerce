import React from "react";
import Login from "@/components/Login/Login";

const page = ({ token, setToken }: any) => {
  return (
    <>
      <Login token={token} setToken={setToken} />
    </>
  );
};

export default page;
