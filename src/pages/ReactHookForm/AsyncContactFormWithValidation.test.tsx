import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi, describe, it } from "vitest";
import ReactHookForm from "./ReactHookForm";
import { labels } from "./constants";
import * as mockApi from "../../api";

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
    const { asFragment } = render(<ReactHookForm />);
    const { btn, emailInput, messageTextarea, nameInput } = getDOMElements();

    assertButtonInitialState(btn);

    expect(screen.getByText(labels.name)).toBeInTheDocument();
    expect(screen.getByText(labels.email)).toBeInTheDocument();
    expect(screen.getByText(labels.message)).toBeInTheDocument();

    expect(() => screen.getByText("Name is required")).toThrow();
    expect(() =>
      screen.getByText("Must be at least two characters long.")
    ).toThrow();
    expect(() => screen.getByText("Email is required")).toThrow();
    expect(() =>
      screen.getByText("Must include an '@' symbol and a dot.")
    ).toThrow();
    expect(() => screen.getByText("Message is required")).toThrow();
    expect(() =>
      screen.getByText("Must be at least ten characters long.")
    ).toThrow();

    expect(nameInput).not.toHaveClass("input-error");
    expect(emailInput).not.toHaveClass("input-error");
    expect(messageTextarea).not.toHaveClass("textarea-error");

    assertFieldsAreEmpty([nameInput, emailInput, messageTextarea]);

    expect(asFragment()).toMatchSnapshot();
  });
  it("2. should correcty submit", async () => {
    // TODO try again with vi.fakeTimers at some point
    const mockSubmit = vi
      .spyOn(mockApi, "mockSubmit")
      .mockResolvedValue(undefined);
    const user = userEvent.setup();

    const validName = "a valid name";
    const validEmail = "email@gmail.com";
    const validMessage = "a valid message";

    const { asFragment } = render(<ReactHookForm />);
    const { btn, emailInput, messageTextarea, nameInput } = getDOMElements();

    await user.type(nameInput, validName);
    expect(nameInput).toHaveValue(validName);
    await user.type(emailInput, validEmail);
    expect(emailInput).toHaveValue(validEmail);
    await user.type(messageTextarea, validMessage);
    expect(messageTextarea).toHaveValue(validMessage);

    await user.click(btn);

    expect(mockSubmit).toHaveBeenCalledWith({
      email: validEmail,
      message: validMessage,
      name: validName,
    });

    assertFieldsAreEmpty([emailInput, nameInput, messageTextarea]);
    expect(asFragment()).toMatchSnapshot();
  });
  it("3. should correctly validate required fields", async () => {
    const user = userEvent.setup();
    const { asFragment } = render(<ReactHookForm />);

    const { btn, emailInput, messageTextarea, nameInput } = getDOMElements();

    await user.click(btn);

    expect(screen.getByText("Name is required")).toBeInTheDocument();
    expect(() =>
      screen.getByText("Must be at least two characters long.")
    ).toThrow();
    expect(screen.getByText("Email is required")).toBeInTheDocument();
    expect(() =>
      screen.getByText("Must include an '@' symbol and a dot.")
    ).toThrow();
    expect(screen.getByText("Message is required")).toBeInTheDocument();
    expect(() =>
      screen.getByText("Must be at least ten characters long.")
    ).toThrow();

    expect(nameInput).toHaveClass("input-error");
    expect(emailInput).toHaveClass("input-error");
    expect(messageTextarea).toHaveClass("textarea-error");

    expect(asFragment()).toMatchSnapshot();
  });
  it("4. should correctly validate custom validations", async () => {
    const user = userEvent.setup();
    const { asFragment } = render(<ReactHookForm />);

    const { btn, emailInput, messageTextarea, nameInput } = getDOMElements();

    await user.type(nameInput, "1");
    await user.type(emailInput, "invalid mail");
    await user.type(messageTextarea, "short");

    await user.click(btn);

    expect(() => screen.getByText("Name is required")).toThrow();
    expect(
      screen.getByText("Must be at least two characters long.")
    ).toBeInTheDocument();
    expect(() => screen.getByText("Email is required")).toThrow();
    expect(
      screen.getByText("Must include an '@' symbol and a dot.")
    ).toBeInTheDocument();
    expect(() => screen.getByText("Message is required")).toThrow();
    expect(
      screen.getByText("Must be at least ten characters long.")
    ).toBeInTheDocument();

    expect(nameInput).toHaveClass("input-error");
    expect(emailInput).toHaveClass("input-error");
    expect(messageTextarea).toHaveClass("textarea-error");

    expect(asFragment()).toMatchSnapshot();
  });
});
