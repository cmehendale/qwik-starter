import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import {
  formAction$,
  type InitialValues,
  useForm,
  valiForm$,
} from "@modular-forms/qwik";
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
import { Select } from "~/components/form/Select";
import { TextInput } from "~/components/form/TextInput";

const FormSchema = object({
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

type ExampleForm = InferInput<typeof FormSchema>;

export const useFormLoader = routeLoader$<InitialValues<ExampleForm>>(() => ({
  name: "",
  age: 18,
  gender: "",
}));

export const useFormAction = formAction$<ExampleForm>((values) => {
  // Server-side processing
  // Here you would typically save to database, send email, etc.
  return {
    status: "success",
    message: `Thank you, ${values.name}! Your form has been submitted.`,
  };
}, valiForm$(FormSchema));

export default component$(() => {
  const [form, { Form, Field }] = useForm<ExampleForm>({
    loader: useFormLoader(),
    action: useFormAction(),
    validate: valiForm$(FormSchema),
  });

  console.log("exampleForm", form);

  return (
    <div class="min-h-screen bg-base-200 px-4 py-12">
      <div class="mx-auto max-w-2xl">
        {/* Header */}
        <div class="mb-8 text-center">
          <h1 class="mb-2 font-bold text-4xl text-base-content">
            Example Form
          </h1>
          <p class="text-base-content/70">
            Built with Modular Forms, Qwik, and DaisyUI
          </p>
        </div>

        {/* Success Message */}
        {form?.response?.status === "success" && (
          <div class="alert alert-success mb-6">
            <svg
              aria-hidden="true"
              class="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Success</title>
              <path
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
              />
            </svg>
            <span>{form.response.message}</span>
          </div>
        )}

        {/* Form Card */}
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <Form>
              {/* Name Field */}
              <Field name="name">
                {(field, props) => (
                  <TextInput
                    {...props}
                    error={field.error}
                    label="Name"
                    required
                    type="text"
                    value={field.value}
                  />
                )}
              </Field>

              {/* Age Field */}
              <Field name="age" type="number">
                {(field, props) => (
                  <TextInput
                    {...props}
                    error={field.error}
                    label="Age"
                    required
                    type="number"
                    value={field.value}
                  />
                )}
              </Field>

              {/* Gender Field */}
              <Field name="gender">
                {(field, props) => (
                  <Select
                    {...props}
                    error={field.error}
                    label="Gender"
                    options={[
                      { value: "M", label: "Male" },
                      { value: "F", label: "Female" },
                      { value: "O", label: "Other" },
                    ]}
                    required
                    value={field.value}
                  />
                )}
              </Field>

              {/* Submit Button */}
              <div class="card-actions justify-end">
                <button
                  class="btn btn-ghost"
                  disabled={form.submitting}
                  type="reset"
                >
                  Reset
                </button>
                <button
                  class="btn btn-primary"
                  disabled={form.submitting || !form.dirty}
                  type="submit"
                >
                  {form.submitting ? (
                    <>
                      <span class="loading loading-spinner loading-sm" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Form"
                  )}
                </button>
              </div>
            </Form>
          </div>
        </div>

        {/* Form State Display (for development) */}
        <div class="collapse-arrow collapse mt-8 bg-base-100 shadow-xl">
          <input aria-label="Toggle form state display" type="checkbox" />
          <div class="collapse-title font-medium text-lg">
            Form State (Dev Info)
          </div>
          <div class="collapse-content">
            <div class="overflow-x-auto">
              <table class="table-sm table">
                <tbody>
                  <tr>
                    <td class="font-semibold">Dirty</td>
                    <td>{form.dirty ? "Yes" : "No"}</td>
                  </tr>
                  <tr>
                    <td class="font-semibold">Touched</td>
                    <td>{form.touched ? "Yes" : "No"}</td>
                  </tr>
                  <tr>
                    <td class="font-semibold">Submitting</td>
                    <td>{form.submitting ? "Yes" : "No"}</td>
                  </tr>
                  <tr>
                    <td class="font-semibold">Valid</td>
                    <td>{form.invalid ? "No" : "Yes"}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
