import { RegisterOptions } from "react-hook-form";
import { ContactFormFields, ErrorsMessages } from "./types";

export const errorsMessages: ErrorsMessages = {
  name: {
    required: "Name is required",
    minLength: "Must be at least two characters long.",
  },
  email: {
    required: "Email is required",
    pattern: "Must include an '@' symbol and a dot.",
  },
  message: {
    required: "Message is required",
    minLength: "Must be at least ten characters long.",
  },
};

export const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

export const labels: ContactFormFields = {
  name: "What is your name?",
  email: "What is your email?",
  message: "Your message",
};

export const emailRegisterOptions: RegisterOptions = {
  required: {
    value: true,
    message: errorsMessages.email.required,
  },
  pattern: {
    value: emailRegex,
    message: errorsMessages.email.pattern,
  },
};
export const nameRegisterOptions: RegisterOptions = {
  required: {
    value: true,
    message: errorsMessages.name.required,
  },
  minLength: {
    message: errorsMessages.name.minLength,
    value: 2,
  },
};
export const messageRegisterOptions: RegisterOptions ={
  required: {
    value: true,
    message: errorsMessages.message.required,
  },
  minLength: {
    value: 10,
    message: errorsMessages.message.minLength,
  },
};