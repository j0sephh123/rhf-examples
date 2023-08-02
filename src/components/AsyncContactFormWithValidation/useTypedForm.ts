import { RegisterOptions, useForm } from "react-hook-form";
import { ContactFormFields, ContactFormKeys } from "./types";
import { contactFormInfo, emailRegex } from "./constants";

type UseTypedFormOptions = {
  keys: ContactFormKeys[];
};

export default function useTypedForm({ keys }: UseTypedFormOptions) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormFields>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  const registerFields = keys.map((key) => {
    const fieldInfo = contactFormInfo[key];
    const registerOptions: RegisterOptions = {};
  
    if (fieldInfo.errors.required) {
      registerOptions.required = {
        value: true,
        message: fieldInfo.errors.required,
      };
    }
  
    if (fieldInfo.errors.minLength) {
      registerOptions.minLength = {
        value: key === "message" ? 10 : 2,
        message: fieldInfo.errors.minLength,
      };
    }
  
    if (key === "email" && fieldInfo.errors.pattern) {
      registerOptions.pattern = {
        value: emailRegex,
        message: fieldInfo.errors.pattern,
      };
    }
  
    return { key, registerOptions };
  });
  

  const registerRefs = registerFields.map(({ key, registerOptions }) =>
    register(key, registerOptions)
  );

  return {
    errors,
    handleSubmit,
    reset,
    isSubmitting,
    registerRefs, // This is an array of refs for each field
  };
}
