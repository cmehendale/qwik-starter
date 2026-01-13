import { component$ } from "@builder.io/qwik";
import type { FieldValues, FormStore, ResponseData } from "@modular-forms/qwik";

type FormStateDisplayProps<T extends FieldValues, D extends ResponseData> = {
  form: FormStore<T, D>;
  additionalRows?: Array<{ label: string; value: string | number }>;
};

export const FormStateDisplay = component$(
  <T extends FieldValues, D extends ResponseData>({
    form,
    additionalRows,
  }: FormStateDisplayProps<T, D>) => {
    return (
      <div class="collapse-arrow collapse mt-8 bg-base-100 shadow-xl">
        <input aria-label="Toggle form state display" type="checkbox" />
        <div class="collapse-title font-medium text-lg">
          Form State (Dev Info)
        </div>
        <div class="collapse-content">
          <div class="overflow-x-auto">
            <table class="table-sm table">
              <tbody>
                {additionalRows?.map((row) => (
                  <tr key={row.label}>
                    <td class="font-semibold">{row.label}</td>
                    <td>{row.value}</td>
                  </tr>
                ))}
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
    );
  }
);
