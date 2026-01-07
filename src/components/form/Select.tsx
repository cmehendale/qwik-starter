import { component$, type QRL, useSignal, useTask$ } from "@builder.io/qwik";
import clsx from "clsx";
import { InputError } from "./InputError";
import { InputLabel } from "./InputLabel";

type SelectProps = {
  ref: QRL<(element: HTMLSelectElement) => void>;
  name: string;
  value: string | string[] | null | undefined;
  onInput$: (event: Event, element: HTMLSelectElement) => void;
  onChange$: (event: Event, element: HTMLSelectElement) => void;
  onBlur$: (event: Event, element: HTMLSelectElement) => void;
  options: { label: string; value: string }[];
  multiple?: boolean;
  size?: number;
  placeholder?: string;
  required?: boolean;
  class?: string;
  label?: string;
  error?: string;
};

/**
 * Select field that allows users to select predefined values. Various
 * decorations can be displayed in or around the field to communicate the
 * entry requirements.
 */
export const Select = component$(
  ({ value, options, label, error, ...props }: SelectProps) => {
    const { name, required, placeholder } = props;

    // Create computed value of selected values
    const values = useSignal<string[]>([]);
    useTask$(({ track }) => {
      track(() => value);
      if (value) {
        values.value = Array.isArray(value) ? value : [value];
      }
    });

    return (
      <fieldset class="fieldset">
        <InputLabel label={label} name={name} required={required} />
        <div class="relative flex items-center">
          <select
            {...props}
            aria-errormessage={`${name}-error`}
            aria-invalid={!!error}
            class={clsx("select", error ? "input-error" : "")}
            id={name}
          >
            <option disabled hidden selected={!value} value="">
              {placeholder}
            </option>
            {options.map(({ label, value }) => (
              <option
                key={value}
                selected={values.value?.includes(value)}
                value={value}
              >
                {label}
              </option>
            ))}
          </select>
        </div>
        <InputError error={error} name={name} />
      </fieldset>
    );
  }
);
