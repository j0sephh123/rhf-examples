import clsx from "clsx";
import { ContactFormFields } from "./types";
import { labels } from "./constants";
import FormControl from "../form/FormControl";
import Button from "../form/Button";
import useTypedForm from "./useTypedForm";
import { mockSubmit } from "../../api";

export default function AsyncContactFormWithValidation() {
  const {
    errors,
    handleSubmit,
    reset,
    isSubmitting,
    registerRefs: [registerName, registerEmail, registerMessage],
  } = useTypedForm({
    keys: ["name", "email", "message"],
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
