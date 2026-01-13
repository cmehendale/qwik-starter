import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <div class="card mx-auto w-auto max-w-2xl">
      <div class="card-body p-8">
        <h1 class="card-title">Welcome to Demo Forms</h1>
        <div class="flex w-full flex-row gap-4 p-4">
          <a class="btn btn-primary" href="/onestep">
            Single Step Form
          </a>
          <a class="btn btn-secondary" href="/twostep">
            Multi Step Form
          </a>
        </div>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
