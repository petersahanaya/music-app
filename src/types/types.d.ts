import { Session } from "next-auth";

type ReactChild = {
  children: React.ReactNode;
};

type ReactClassName = {
  className?: string;
} & ReactChild;

type SessionProps = {
  session : Session
}