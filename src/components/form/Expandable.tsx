import {
  $,
  component$,
  Slot,
  useOnWindow,
  useSignal,
  useVisibleTask$,
} from "@builder.io/qwik";
import clsx from "clsx";

type ExpandableProps = {
  class?: string;
  id?: string;
  expanded: boolean;
};

/**
 * Wrapper component to vertically expand or collapse content.
 */
export const Expandable = component$(
  ({ id, expanded, ...props }: ExpandableProps) => {
    // Use element signal
    const element = useSignal<HTMLDivElement>();

    /**
     * Updates the expandable element height.
     */

    const updateElementHeight = $(() => {
      if (element.value) {
        element.value.style.height = `${
          expanded ? element.value.scrollHeight : 0
        }px`;
      }
    });

    const resizeElementHeight = $(() => {
      if (element.value) {
        element.value.style.maxHeight = "0";
        updateElementHeight();
        element.value.style.maxHeight = "";
      }
    });

    // Expand or collapse content when expanded prop change
    // eslint-disable-next-line qwik/no-use-visible-task
    // biome-ignore lint/correctness/noQwikUseVisibleTask: <>
    useVisibleTask$(({ track }) => {
      track(() => expanded);
      updateElementHeight();
    });

    // Update element height when window size change
    useOnWindow("resize", resizeElementHeight);

    return (
      <div
        aria-hidden={!expanded}
        class={clsx(
          "!m-0 origin-top duration-200",
          !expanded && "invisible h-0 -translate-y-2 scale-y-75 opacity-0",
          props.class
        )}
        id={id}
        ref={element}
      >
        <Slot />
      </div>
    );
  }
);
