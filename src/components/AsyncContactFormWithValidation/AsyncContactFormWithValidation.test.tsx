import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi, describe, it } from "vitest";
import AsyncContactFormWithValidation from "./AsyncContactFormWithValidation";
import { errorsMessages, labels } from "./constants";
import * as mockApi from "./mockApi";

/**
  1. should render correct initial state
    a. button has "Submit" text and does not have "btn-disabled" class
    b. labels have default texts
    c. error paragraphs not rendering `errors.{ContactFormFields}`
    d. input and text area don't have error classes 
    e. fields are empty
  2. should correcty submit
    a. before
      i. enter correct values
      ii. click on submit button
    b. during
      i. button should be disabled, have loading class and loading text
      ii. api should get called with correct field values
    c. after
      i. button should have normal state
      ii. fields should be empty
  3. should correctly validate required fields
    a. before
      i. leave all fields empty, i.e do nothing
    b. after click submit
      i. validate that api is not called
      ii. validate that errors messages appear with correct text
    c. start typing once again
      i. enter correct values
      ii. re-use the logic from 2. to validate that it worked
  4. should correctly validate custom validations
    a. before clicking submit
      i. enter invalid fields for all 3, should not be empty
    b. after clicking submit
      i. check for all custom validation messages
      ii. re-use the logic from 2. to validate that it worked
 */

describe("AsyncContactFormWithValidation", () => {
  const getDOMElements = () => {
    const btn = screen.getByRole("button");
    const nameInput = screen.getByLabelText(labels.name);
    const emailInput = screen.getByLabelText(labels.email);
    const messageTextarea = screen.getByLabelText(labels.message);

    return {
      btn,
      nameInput,
      emailInput,
      messageTextarea,
    };
  };

  const assertButtonInitialState = (btn: HTMLElement) => {
    expect(btn).toHaveTextContent("Submit");
    expect(btn).not.toHaveClass("btn-disabled");
  };

  const assertButtonLoadingState = (btn: HTMLElement) => {
    expect(btn).toHaveClass("btn-disabled");
    expect(btn).toHaveTextContent("Loading...");
  };

  const assertFieldsAreEmpty = (fields: HTMLElement[]) => {
    fields.forEach((field) => expect(field).toHaveValue(""));
  };

  it("1. should render correct initial state", async () => {
    const { asFragment } = render(<AsyncContactFormWithValidation />);
    const { btn, emailInput, messageTextarea, nameInput } = getDOMElements();

    assertButtonInitialState(btn);

    expect(screen.getByText(labels.name)).toBeInTheDocument();
    expect(screen.getByText(labels.email)).toBeInTheDocument();
    expect(screen.getByText(labels.message)).toBeInTheDocument();

    expect(() => screen.getByText(errorsMessages.name.required)).toThrow();
    expect(() => screen.getByText(errorsMessages.name.minLength)).toThrow();
    expect(() => screen.getByText(errorsMessages.email.required)).toThrow();
    expect(() => screen.getByText(errorsMessages.email.pattern)).toThrow();
    expect(() => screen.getByText(errorsMessages.message.required)).toThrow();
    expect(() => screen.getByText(errorsMessages.message.minLength)).toThrow();

    expect(nameInput).not.toHaveClass("input-error");
    expect(emailInput).not.toHaveClass("input-error");
    expect(messageTextarea).not.toHaveClass("textarea-error");

    assertFieldsAreEmpty([nameInput, emailInput, messageTextarea]);

    expect(asFragment()).toMatchSnapshot();
  });
  it("2. should correcty submit", async () => {
    // TODO try again with vi.fakeTimers at some point
    const spy = vi.spyOn(mockApi, "mockSubmit");
    const user = userEvent.setup();

    const validName = "a valid name";
    const validEmail = "email@gmail.com";
    const validMessage = "a valid message";

    const { asFragment } = render(<AsyncContactFormWithValidation />);
    const { btn, emailInput, messageTextarea, nameInput } = getDOMElements();

    await user.type(nameInput, validName);
    expect(nameInput).toHaveValue(validName);
    await user.type(emailInput, validEmail);
    expect(emailInput).toHaveValue(validEmail);
    await user.type(messageTextarea, validMessage);
    expect(messageTextarea).toHaveValue(validMessage);

    await user.click(btn);

    expect(spy).toHaveBeenCalledWith({
      email: validEmail,
      message: validMessage,
      name: validName,
    });

    assertButtonLoadingState(btn);

    await waitFor(() => {
      assertButtonInitialState(btn);
    });

    assertFieldsAreEmpty([emailInput, nameInput, messageTextarea]);

    expect(asFragment()).toMatchSnapshot();
  });
  it("3. should correctly validate required fields", async () => {
    const user = userEvent.setup();
    const { asFragment } = render(<AsyncContactFormWithValidation />);

    const { btn, emailInput, messageTextarea, nameInput } = getDOMElements();

    await user.click(btn);

    expect(screen.getByText(errorsMessages.name.required)).toBeInTheDocument();
    expect(() => screen.getByText(errorsMessages.name.minLength)).toThrow();
    expect(screen.getByText(errorsMessages.email.required)).toBeInTheDocument();
    expect(() => screen.getByText(errorsMessages.email.pattern)).toThrow();
    expect(
      screen.getByText(errorsMessages.message.required)
    ).toBeInTheDocument();
    expect(() => screen.getByText(errorsMessages.message.minLength)).toThrow();

    expect(nameInput).toHaveClass("input-error");
    expect(emailInput).toHaveClass("input-error");
    expect(messageTextarea).toHaveClass("textarea-error");

    expect(asFragment()).toMatchSnapshot();
  });
  it("4. should correctly validate custom validations", async () => {
    const user = userEvent.setup();
    const { asFragment } = render(<AsyncContactFormWithValidation />);

    const { btn, emailInput, messageTextarea, nameInput } = getDOMElements();

    await user.type(nameInput, "1");
    await user.type(emailInput, "invalid mail");
    await user.type(messageTextarea, "short");

    await user.click(btn);

    expect(() => screen.getByText(errorsMessages.name.required)).toThrow();
    expect(screen.getByText(errorsMessages.name.minLength)).toBeInTheDocument();
    expect(() => screen.getByText(errorsMessages.email.required)).toThrow();
    expect(screen.getByText(errorsMessages.email.pattern)).toBeInTheDocument();
    expect(() => screen.getByText(errorsMessages.message.required)).toThrow();
    expect(
      screen.getByText(errorsMessages.message.minLength)
    ).toBeInTheDocument();

    expect(nameInput).toHaveClass("input-error");
    expect(emailInput).toHaveClass("input-error");
    expect(messageTextarea).toHaveClass("textarea-error");

    expect(asFragment()).toMatchSnapshot();
  });
});
