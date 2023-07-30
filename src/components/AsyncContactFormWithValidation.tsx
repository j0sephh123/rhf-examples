import clsx from "clsx";
import { useForm } from "react-hook-form";

const mockApi = async (contactFormFields: ContactFormFields) => {
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
    }, 500);
  });
};

const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

const errorsMessages = {
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

type ContactFormFields = { name: string; email: string; message: string };

export default function AsyncContactFormWithValidation() {
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading, isSubmitting },
    reset,
  } = useForm<ContactFormFields>({
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  console.log({ isLoading, isSubmitting });

  const onSubmit = async (contactFormFields: ContactFormFields) => {
    await mockApi(contactFormFields);

    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">What is your name?</span>
        </label>
        <input
          type="text"
          placeholder="Type here"
          className={clsx(
            "input input-bordered w-full max-w-xs",
            errors.name && "input-error"
          )}
          {...register("name", {
            required: {
              value: true,
              message: "name is required",
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
        <label className="label">
          <span className="label-text">What is your email?</span>
        </label>
        <input
          type="text"
          placeholder="Type here"
          className={clsx(
            "input input-bordered w-full max-w-xs",
            errors.email && "input-error"
          )}
          {...register("email", {
            required: {
              value: true,
              message: "Email is required",
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
        <label className="label">
          <span className="label-text">Your message</span>
        </label>
        <textarea
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
