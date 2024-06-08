import React from "react";
import Login from "@/components/Login/Login";

const page = ({ token, setToken }: { token: string | null; setToken: (token: string) => void }) => {
  return (
    <>
      <Login token={token} setToken={setToken} />
    </>
  );
};

export default page;
