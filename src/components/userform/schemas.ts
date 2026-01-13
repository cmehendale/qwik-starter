import {
  type InferInput,
  maxLength,
  maxValue,
  minLength,
  minValue,
  nonEmpty,
  number,
  object,
  picklist,
  pipe,
  string,
} from "valibot";

export const UserFormSchema = object({
  name: pipe(
    string(),
    nonEmpty("Please enter your name."),
    minLength(2, "Name must be at least 2 characters."),
    maxLength(50, "Name must be at most 50 characters.")
  ),
  age: pipe(
    number("Age must be a number."),
    minValue(1, "Age must be at least 1."),
    maxValue(150, "Age must be at most 150.")
  ),
  gender: pipe(
    string(),
    nonEmpty("Please select a gender."),
    picklist(["M", "F", "O"], "Please select a valid gender option.")
  ),
});

export type UserFormInput = InferInput<typeof UserFormSchema>;
export type UserFormData = UserFormInput;

export const GENDER_OPTIONS = [
  { value: "M", label: "Male" },
  { value: "F", label: "Female" },
  { value: "O", label: "Other" },
];
