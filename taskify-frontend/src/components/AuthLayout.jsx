import React from "react";
import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className=" items-center h-screen">
      <Outlet />
    </div>
  );
}

export default AuthLayout;
