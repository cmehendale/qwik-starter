import { component$, useSignal } from "@builder.io/qwik";
import { useForm, valiForm$ } from "@modular-forms/qwik";
import { FormAlert } from "~/components/alerts/FormAlert";
import { Select } from "~/components/form/Select";
import { TextInput } from "~/components/form/TextInput";
import {
  useUserFormAction,
  useUserFormLoader,
} from "~/components/userform/handlers";

import {
  GENDER_OPTIONS,
  type UserFormData,
  type UserFormInput,
  UserFormSchema,
} from "~/components/userform/schemas";

export const useFormLoader = useUserFormLoader;
export const useFormAction = useUserFormAction;

export default component$(() => {
  const [form, { Form, Field }] = useForm<UserFormInput, UserFormData>({
    loader: useFormLoader(),
    action: useFormAction(),
    validate: valiForm$(UserFormSchema),
  });

  const currentStep = useSignal(1);

  return (
    <div class="mx-auto flex max-w-2xl flex-col gap-4">
      <div class="flex flex-col gap-1 text-center">
        <h1 class="mb-2 font-bold text-4xl text-base-content">
          Two-Step Form Wizard
        </h1>
        <p class="text-base-content/70">Step {currentStep.value} of 2</p>
      </div>

      {form?.submitted && <FormAlert response={form.response} />}

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
                    options={GENDER_OPTIONS}
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
    </div>
  );
});
