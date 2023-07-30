export type ContactFormFields = {
  name: string;
  email: string;
  message: string;
};

type NameErrorMessages = { required: string; minLength: string };
type EmailErrorMessages = { required: string; pattern: string };
type MessageErrorMessages = { required: string; minLength: string };

export type ErrorsMessages = {
  name: NameErrorMessages;
  email: EmailErrorMessages;
  message: MessageErrorMessages;
};
