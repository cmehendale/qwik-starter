import { component$ } from "@builder.io/qwik";
import type { FormResponse, ResponseData } from "@modular-forms/qwik";
import clsx from "clsx";

type SuccessAlertProps<D extends ResponseData> = {
  response: FormResponse<D>;
};

export const FormAlert = component$(
  <D extends ResponseData>({ response }: SuccessAlertProps<D>) => {
    return (
      <div
        class={clsx("alert", {
          "alert-success": response.status === "success",
          "alert-error": response.status === "error",
        })}
      >
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
        <div class="flex flex-col gap-2">
          <span>{response.message}</span>
          <code>{JSON.stringify(response.data, undefined, "  ")}</code>
        </div>
      </div>
    );
  }
);
