import React, { useState } from "react";
import { AIReplyButton } from "./AIReplyButton/index.tsx";
import { Modal } from "./MessageGeneratorModal/index.tsx";
import { useFocusHandler } from "@/hooks/useFocusHandler.tsx";

export const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { showButton, buttonPosition, activeInputRef } = useFocusHandler({
    AiIconHeight,
    AiIconWidth,
  });

  function handleGeneratedTextInsertion(text: string) {
    const input = activeInputRef.current;

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
