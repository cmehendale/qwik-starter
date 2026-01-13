import { routeLoader$ } from "@builder.io/qwik-city";
import {
  formAction$,
  type InitialValues,
  valiForm$,
} from "@modular-forms/qwik";
import {
  type UserFormData,
  type UserFormInput,
  UserFormSchema,
} from "./schemas";

export const useUserFormLoader = routeLoader$<InitialValues<UserFormInput>>(
  () => ({
    name: "",
    age: 18,
    gender: "",
  })
);

export const useUserFormAction = formAction$<UserFormInput, UserFormData>(
  (values) => {
    console.log("Form submitted with values:", values);
    return {
      status: "success",
      message: "Your form has been submitted with the following data:",
      data: values,
    };
  },
  valiForm$(UserFormSchema)
);
