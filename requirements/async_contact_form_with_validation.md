# Async Contact Form with Validation

## Objective:

Create a contact form using react-hook-form with basic field validations and asynchronous submission. Validation is triggered only after clicking the submit button. Errors are removed as the user starts typing in an invalid field, and the button displays a loading state while awaiting the response from a fake API.

## Requirements:

### Fields & Validations:

- **Name**: Text input. Required, must be at least two characters.
- **Email**: Email input. Required, must match pattern `const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;`. Pattern Message: "Must include an '@' symbol and a dot."
- **Message**: Text area. Required, must be at least ten characters.
- Validation messages are provided in the `errorsMessages` object:

```javascript
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
```

### Error Handling & Removal:

- Display error messages from `errorsMessages` below each invalid field.
- Remove error state upon typing in an invalid field.

### Submit Button (Loading State):

- Enabled, changes to "Loading..." and becomes disabled while awaiting API response.

### Submission Handling:

- Submit to a fake API returning a promise after 500ms.
- Display success message upon successful submission.

### Styling:

- Style the form and loading state as desired.

## Component Name:

`AsyncContactFormWithValidation`
