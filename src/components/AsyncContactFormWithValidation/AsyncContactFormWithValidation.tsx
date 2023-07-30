import clsx from "clsx";
import { useForm } from "react-hook-form";
import { ContactFormFields } from "./types";
import { emailRegex, errorsMessages, labels } from "./constants";
import { mockSubmit } from "./mockApi";

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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-control w-full max-w-xs">
        <label htmlFor="name" className="label">
          <span className="label-text">{labels.name}</span>
        </label>
        <input
          id="name"
          type="text"
          placeholder="Type here"
          className={clsx(
            "input input-bordered w-full max-w-xs",
            errors.name && "input-error"
          )}
          {...register("name", {
            required: {
              value: true,
              message: errorsMessages.name.required,
            },
            minLength: {
              message: errorsMessages.name.minLength,
              value: 2,
            },
          })}
        />
        {errors.name && (
          <p className="text-error text-sm mt-1">{errors.name.message}</p>
        )}
      </div>
      <div className="form-control w-full max-w-xs">
        <label htmlFor="email" className="label">
          <span className="label-text">{labels.email}</span>
        </label>
        <input
          id="email"
          type="text"
          placeholder="Type here"
          className={clsx(
            "input input-bordered w-full max-w-xs",
            errors.email && "input-error"
          )}
          {...register("email", {
            required: {
              value: true,
              message: errorsMessages.email.required,
            },
            pattern: {
              value: emailRegex,
              message: errorsMessages.email.pattern,
            },
          })}
        />
        {errors.email && (
          <p className="text-error text-sm mt-1">{errors.email.message}</p>
        )}
      </div>
      <div className="form-control">
        <label htmlFor="message" className="label">
          <span className="label-text">{labels.message}</span>
        </label>
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
              message: errorsMessages.message.required,
            },
            minLength: {
              value: 10,
              message: errorsMessages.message.minLength,
            },
          })}
        ></textarea>
        {errors.message && (
          <p className="text-error text-sm mt-1">{errors.message.message}</p>
        )}
      </div>
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
