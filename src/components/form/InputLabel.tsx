import { component$ } from "@builder.io/qwik";

type InputLabelProps = {
  name: string;
  label?: string;
  required?: boolean;
};

/**
 * Input label for a form field.
 */
export const InputLabel = component$(
  ({ name, label, required }: InputLabelProps) => (
    <>
      {label && (
        <label class="flex flex-row gap-2 text-lg" for={name}>
          <span>{label}</span>
          {required && <span class="text-error">*</span>}
        </label>
      )}
    </>
  )
);
