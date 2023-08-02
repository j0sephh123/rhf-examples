import { RegisterOptions } from "react-hook-form";

export type ContactFormFields = {
  name: string;
  email: string;
  message: string;
};

export type ContactFormKeys = keyof ContactFormFields;

export type RegisterKeysAndOptions = {
  key: ContactFormKeys;
  registerOptions: RegisterOptions;
};
