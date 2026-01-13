import { component$ } from "@builder.io/qwik";
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

  return (
    <div class="mx-auto flex max-w-2xl flex-col gap-4">
      <h1 class="mb-2 font-bold text-4xl text-base-content">One Step Form</h1>

      {form?.submitted && <FormAlert response={form.response} />}

      <div class="card w-auto bg-base-100 shadow-xl">
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
                  options={GENDER_OPTIONS}
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
    </div>
  );
});
