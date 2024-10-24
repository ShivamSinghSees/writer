import { createRoot } from "react-dom/client";
import { ContentScriptContext } from "wxt/client";
import { App } from "@/components/App";
import React from "react";
import "~/assets/tailwind.css";

export default defineContentScript({
  matches: ["*://*.linkedin.com/*"],
  cssInjectionMode: "ui",
  async main(ctx) {
    console.log("called");
    const ui = await createUi(ctx);
    ui.mount();
  },
});

function createUi(ctx: ContentScriptContext) {
  return createShadowRootUi(ctx, {
    name: "writer-helper",
    position: "inline",
    anchor: "body",
    append: "first",
    onMount: (uiContainer) => {
      const reactContainer = document.createElement("div");
      reactContainer.id = "react-shadow-root-container";
      uiContainer.append(reactContainer);
      const root = createRoot(reactContainer);

      root.render(React.createElement(App));
      return () => {
        root.unmount();
      };
    },
  });
}
