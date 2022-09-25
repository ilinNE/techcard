import { ReactNode } from "react";

export interface IPlanProps {
  planColor: string;
  buttonText: string;
  title: string;
  redTape: boolean;
  children: ReactNode;
}
