import { component$, useSignal } from "@builder.io/qwik";
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

type TwoStepForm = InferInput<typeof FormSchema>;

export const useFormLoader = routeLoader$<InitialValues<TwoStepForm>>(() => ({
  name: "",
  age: 18,
  gender: "",
}));

export const useFormAction = formAction$<TwoStepForm>((values) => {
  // Server-side processing
  // Here you would typically save to database, send email, etc.
  return {
    status: "success",
    message: `Thank you, ${values.name}! Your two-step form has been submitted.`,
  };
}, valiForm$(FormSchema));

export default component$(() => {
  const [form, { Form, Field }] = useForm<TwoStepForm>({
    loader: useFormLoader(),
    action: useFormAction(),
    validate: valiForm$(FormSchema),
  });

  const currentStep = useSignal(1);

  console.log("form.response", form.response);

  return (
    <div class="min-h-screen bg-base-200 px-4 py-12">
      <div class="mx-auto max-w-2xl">
        {/* Header */}
        <div class="mb-8 text-center">
          <h1 class="mb-2 font-bold text-4xl text-base-content">
            Two-Step Form Wizard
          </h1>
          <p class="text-base-content/70">Step {currentStep.value} of 2</p>
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

        {/* Progress Indicator */}
        <div class="mb-6">
          <ul class="steps steps-horizontal w-full">
            <li class={`step ${currentStep.value >= 1 ? "step-primary" : ""}`}>
              Name & Age
            </li>
            <li class={`step ${currentStep.value >= 2 ? "step-primary" : ""}`}>
              Gender
            </li>
          </ul>
        </div>

        {/* Form Card */}
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <Form>
              {/* Step 1: Name and Age */}
              <div class={currentStep.value === 1 ? "" : "hidden"}>
                <h2 class="mb-4 font-semibold text-2xl">
                  Step 1: Basic Information
                </h2>

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

                {/* Navigation Buttons */}
                <div class="card-actions justify-end">
                  <button
                    class="btn btn-primary"
                    onClick$={() => {
                      currentStep.value = 2;
                    }}
                    type="button"
                  >
                    Next
                  </button>
                </div>
              </div>

              <div class={currentStep.value === 2 ? "" : "hidden"}>
                <h2 class="mb-4 font-semibold text-2xl">
                  Step 2: Additional Information
                </h2>

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

                {/* Navigation Buttons */}
                <div class="card-actions justify-between">
                  <button
                    class="btn btn-ghost"
                    onClick$={() => {
                      currentStep.value = 1;
                    }}
                    type="button"
                  >
                    Back
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
                    <td class="font-semibold">Current Step</td>
                    <td>{currentStep.value}</td>
                  </tr>
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
