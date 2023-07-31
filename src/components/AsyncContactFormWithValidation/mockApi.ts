import { ContactFormFields } from "./types";

export const mockSubmit = async (contactFormFields: ContactFormFields) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (
        contactFormFields.email &&
        contactFormFields.message &&
        contactFormFields.name
      ) {
        resolve(undefined);
      } else {
        reject("somethig went wrong");
      }
    }, 50);
  });
};
