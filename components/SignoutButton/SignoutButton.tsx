"use client";
import { signOut } from "next-auth/react";
import React, { useCallback } from "react";

const SignoutButton = () => {
  const signoutHandler = useCallback(() => {
    signOut();
  }, []);
  return (
    <button onClick={signoutHandler} className="text-sm text-red-500">
      خروج
    </button>
  );
};

export default SignoutButton;
