import React, { useEffect, useState } from "react";
import { AIReplyButton } from "./AIReplyButton/index.tsx";
import { Modal } from "./MessageGeneratorModal/index.tsx";

export const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ top: 0, left: 0 });
  const [showButton, setShowButton] = useState(false);

  function handleGeneratedTextInsertion(text: string) {
    const input = document.querySelector('[role="textbox"]') as HTMLElement;

    if (input) {
      const paragraph = input.querySelector("p");

      if (paragraph) {
        paragraph.textContent = text;
      } else {
        const newParagraph = document.createElement("p");
        newParagraph.textContent = text;
        input.appendChild(newParagraph);
      }

      // Dispatch the input event to trigger any listeners
      input.dispatchEvent(new Event("input", { bubbles: true }));
    }

    setIsModalOpen(false);
  }

  const handleInputBlur = (event: FocusEvent) => {
    const target = event.target as HTMLElement;
    setTimeout(() => {
      if (target.getAttribute("role") === "textbox") {
        setShowButton(false);
      }
    }, 100);
  };

  useEffect(() => {
    const handleInputFocus = (event: FocusEvent) => {
      const target = event.target as HTMLElement;

      if (target.getAttribute("role") === "textbox") {
        const rect = target.getBoundingClientRect();
        const topOffset = rect.height - 40;
        const leftOffset = rect.width - 40;
        setButtonPosition({
          top: rect.top + topOffset,
          left: rect.left + leftOffset,
        });
        setShowButton(true);
      }
    };

    document.addEventListener("focusin", handleInputFocus);
    document.addEventListener("focusout", handleInputBlur);

    return () => {
      document.removeEventListener("focusin", handleInputFocus);
      document.removeEventListener("focusout", handleInputBlur);
    };
  }, []);

  return (
    <>
      {showButton && (
        <AIReplyButton
          position={buttonPosition}
          onClick={() => {
            setIsModalOpen(true);
          }}
        />
      )}
      {isModalOpen && (
        <Modal
          onClose={() => setIsModalOpen(false)}
          onInsert={handleGeneratedTextInsertion}
        />
      )}
    </>
  );
};
