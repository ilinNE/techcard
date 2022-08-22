export interface IReferenceProps {
  textDescription: string;
  textLink: string;
  path: LinkVariant;
}

export enum LinkVariant {
  toRegister = "/signup",
  toLogin = "/signin",
  toFeedback = "/#about",
}
