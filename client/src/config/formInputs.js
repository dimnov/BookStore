export const formLoginInputs = [
  {
    id: 1,
    name: "email",
    type: "email",
    placeholder: "Email...",
    required: true,
  },
  {
    id: 2,
    name: "password",
    type: "password",
    placeholder: "Password...",
    required: true,
  },
];

export const formRegisterInputs = [
  {
    id: 1,
    name: "email",
    type: "email",
    placeholder: "Email...",
    errorMessage: "Email is not valid",
    required: true,
  },
  {
    id: 2,
    name: "password",
    type: "password",
    placeholder: "Password...",
    errorMessage: "Password must be at least 6 characters long",
    pattern: "^.{6,}$",
    required: true,
  },
  {
    id: 3,
    name: "repeatPassword",
    type: "password",
    placeholder: "Repeat password...",
    errorMessage: "Passwords do not match",
    required: true,
  },
];