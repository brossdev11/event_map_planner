import Head from "next/head";
import React from "react";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
        {/* <script
          type="text/javascript"
          src="https://maps.googleapis.com/maps/api/js?key=AIzaSyClOqjqUPJnQEQJ3BNxaV30_UudHYAUAPM&libraries=geometry,drawing,places"
        ></script> */}
         <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyClOqjqUPJnQEQJ3BNxaV30_UudHYAUAPM&signed_in=true&libraries=drawing,geometry,places"></script>
      </Head>
      <div className="bg-[#F8F8F8] w-screen h-screen">{children}</div>
    </>
  );
}
