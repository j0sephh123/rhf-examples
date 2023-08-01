import clsx from "clsx";
import { useForm } from "react-hook-form";
import { ContactFormFields } from "./types";
import {
  emailRegisterOptions,
  labels,
  messageRegisterOptions,
  nameRegisterOptions,
} from "./constants";
import { mockSubmit } from "./mockApi";
import FormControl from "../form/FormControl";
import Button from "../form/Button";

function useTypedForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormFields>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  const registerEmail = register("email", emailRegisterOptions);
  const registerName = register("name", nameRegisterOptions);
  const registerMessage = register("message", messageRegisterOptions);

  return {
    errors,
    handleSubmit,
    reset,
    isSubmitting,
    registerMessage,
    registerEmail,
    registerName,
  };
}

export default function AsyncContactFormWithValidation() {
  const {
    errors,
    registerEmail,
    registerMessage,
    registerName,
    handleSubmit,
    isSubmitting,
    reset,
  } = useTypedForm();

  const onSubmit = async (contactFormFields: ContactFormFields) => {
    await mockSubmit(contactFormFields);

    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl
        htmlFor="name"
        text={labels.name}
        errorMessage={errors.name?.message}
      >
        <input
          id="name"
          type="text"
          placeholder="Type here"
          className={clsx("input input-bordered", errors.name && "input-error")}
          {...registerName}
        />
      </FormControl>
      <FormControl
        htmlFor="email"
        text={labels.email}
        errorMessage={errors.email?.message}
      >
        <input
          id="email"
          type="text"
          placeholder="Type here"
          className={clsx(
            "input input-bordered w-full ",
            errors.email && "input-error"
          )}
          {...registerEmail}
        />
      </FormControl>
      <FormControl
        htmlFor="message"
        text={labels.message}
        errorMessage={errors.message?.message}
      >
        <textarea
          id="message"
          className={clsx(
            "textarea textarea-bordered h-24",
            errors.message && "textarea-error"
          )}
          placeholder="Bio"
          {...registerMessage}
        ></textarea>
      </FormControl>
      <Button isLoading={isSubmitting} />
    </form>
  );
}
