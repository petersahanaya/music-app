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
