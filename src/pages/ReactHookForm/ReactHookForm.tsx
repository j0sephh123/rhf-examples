import { useForm } from "react-hook-form";
import clsx from "clsx";
import { ContactFormFields } from "./types";
import { labels } from "./constants";
import { mockSubmit } from "../../api";
import Button from "./form/Button";
import FormControl from "./form/FormControl";

export default function ReactHookForm() {
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
          {...register("name", {
            required: {
              value: true,
              message: "Name is required",
            },
            minLength: {
              value: 2,
              message: "Must be at least two characters long.",
            },
          })}
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
          {...register("email", {
            required: {
              value: true,
              message: "Email is required",
            },
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
              message: "Must include an '@' symbol and a dot.",
            },
          })}
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
          {...register("message", {
            required: {
              value: true,
              message: "Message is required",
            },
            minLength: {
              value: 10,
              message: "Must be at least ten characters long.",
            },
          })}
        ></textarea>
      </FormControl>
      <Button isLoading={isSubmitting} />
    </form>
  );
}
