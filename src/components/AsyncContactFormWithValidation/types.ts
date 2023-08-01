import { RegisterOptions } from "react-hook-form";

export type ContactFormFields = {
  name: string;
  email: string;
  message: string;
};

export type ContactFormKeys = keyof ContactFormFields;

type NameErrorMessages = { required: string; minLength: string };
type EmailErrorMessages = { required: string; pattern: string };
type MessageErrorMessages = { required: string; minLength: string };

export type ErrorsMessages = {
  [K in ContactFormKeys]: K extends "name"
    ? NameErrorMessages
    : K extends "email"
    ? EmailErrorMessages
    : K extends "message"
    ? MessageErrorMessages
    : never;
};

export type RegisterKeysAndOptions = {
  key: ContactFormKeys;
  registerOptions: RegisterOptions;
};
