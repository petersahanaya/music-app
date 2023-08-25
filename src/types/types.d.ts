import { Session } from "next-auth";

type ReactChild = {
  children: React.ReactNode;
};

type ReactClass = {
  className?: string;
};

type ReactClassName = {
  className?: string;
} & ReactChild;

type SessionProps = {
  session: Session;
};

type UnArray<T> = T extends Array<infer J> ? J : T;
