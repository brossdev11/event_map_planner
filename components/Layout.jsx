import Head from "next/head";
import React, { useEffect } from "react";
import { useUser } from "../lib/hooks";

export default function Layout({ children }) {
  const [user] = useUser();
  return (
    <>
      <Head>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
      </Head>
      <div className="bg-[#F8F8F8] w-screen h-screen">
        {children}
      </div>
    </>
  );
}
