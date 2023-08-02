export const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

export const labels: ContactFormFields = {
  name: "What is your name?",
  email: "What is your email?",
  message: "Your message",
};

type ErrorOptions = Partial<{
  required: string;
  minLength: string;
  pattern: string;
}>;

export type ContactFormFields = {
  name: string;
  email: string;
  message: string;
};

export type ContactFormKeys = keyof ContactFormFields;

type FieldInfo = {
  label: string;
  errors: ErrorOptions;
};

export const contactFormInfo: Record<ContactFormKeys, FieldInfo> = {
  name: {
    label: "What is your name?",
    errors: {
      required: "Name is required",
      minLength: "Must be at least two characters long.",
    },
  },
  email: {
    label: "What is your email?",
    errors: {
      required: "Email is required",
      pattern: "Must include an '@' symbol and a dot.",
    },
  },
  message: {
    label: "Your message",
    errors: {
      required: "Message is required",
      minLength: "Must be at least ten characters long.",
    },
  },
};
