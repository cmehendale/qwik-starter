import { component$, Slot } from "@builder.io/qwik";

export const Header = component$(() => (
  <header class="m-4 bg-base-200 p-4 text-center shadow"> Header </header>
));

export const Footer = component$(() => (
  <footer class="b-top m-4 bg-base-200 p-4 text-center"> Footer </footer>
));

export const Main = component$(() => (
  <main class="overflow-y-auto p-4">
    <Slot />
  </main>
));

export default component$(() => {
  return (
    <div class="grid h-screen grid-rows-[auto_1fr_auto] bg-base-300">
      <Header />
      <Main>
        {/* Need this to drill down into the main slot */}
        <Slot />
      </Main>
      <Footer />
    </div>
  );
});
