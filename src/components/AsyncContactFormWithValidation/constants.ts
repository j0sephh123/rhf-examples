export const errorsMessages = {
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

export const labels = {
  name: "What is your name?",
  email: "What is your email?",
  message: "Your message",
};
