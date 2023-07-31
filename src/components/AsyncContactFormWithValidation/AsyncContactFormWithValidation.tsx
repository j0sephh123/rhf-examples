import clsx from "clsx";
import { useForm } from "react-hook-form";
import { ContactFormFields } from "./types";
import { emailRegex, errorsMessages, labels } from "./constants";
import { mockSubmit } from "./mockApi";
import FormControl from "../form/FormControl";

// function useRegister() {

// }

export default function AsyncContactFormWithValidation() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormFields>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  const onSubmit = async (contactFormFields: ContactFormFields) => {
    await mockSubmit(contactFormFields);

    reset();
  };

  const registerEmail = register("email", {
    required: {
      value: true,
      message: errorsMessages.email.required,
    },
    pattern: {
      value: emailRegex,
      message: errorsMessages.email.pattern,
    },
  });
  const registerName = register("name", {
    required: {
      value: true,
      message: errorsMessages.name.required,
    },
    minLength: {
      message: errorsMessages.name.minLength,
      value: 2,
    },
  });
  const registerMessage = register("message", {
    required: {
      value: true,
      message: errorsMessages.message.required,
    },
    minLength: {
      value: 10,
      message: errorsMessages.message.minLength,
    },
  });

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
      <button
        type="submit"
        className={clsx(
          "mt-4 btn-neutral btn btn-block",
          isSubmitting && "btn-disabled"
        )}
      >
        {isSubmitting ? "Loading..." : "Submit"}
      </button>
    </form>
  );
}
