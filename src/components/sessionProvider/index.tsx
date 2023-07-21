"use client";
import {SessionProvider} from "next-auth/react"

const SessionProviders = ({ children }: ReactChild) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default SessionProviders;
