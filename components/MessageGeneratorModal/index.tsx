import React, { useState } from "react";
import ArrowIcon from "~/assets/icons/arrow.svg";

interface ModalProps {
  onClose: () => void;
  onInsert: (text: string) => void;
}

export const Modal: React.FC<ModalProps> = ({ onClose, onInsert }) => {
  const [step, setStep] = useState<"input" | "response">("input");
  const [command, setCommand] = useState("");
  const dummyResponse =
    "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask.";

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  console.log("modal open ");

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 test-modal "
      onClick={handleBackdropClick}
    >
      <div className="bg-[#F9FAFB] rounded-lg p-[26px] w-[870px] max-w-[90vw] text-end flex gap-[26] flex-col ">
        {step === "input" ? (
          <>
            <input
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              className="w-full h-[61px] border rounded-[8px] text-[24px] leading-[29px] px-3 text-[#666D80] "
              placeholder="Enter your command here..."
            />
            <button
              onClick={() => setStep("response")}
              className="inline-flex gap-[10px] bg-blue-600 py-[12px] px-[24px] rounded-[15px]"
            >
              <img src={ArrowIcon} alt="generate" />
              Generate
            </button>
          </>
        ) : (
          <>
            <div className="border rounded-lg p-3 mb-4">{dummyResponse}</div>
            <div className="flex gap-4">
              <button
                onClick={() => setStep("input")}
                className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg"
              >
                Regenerate
              </button>
              <button
                onClick={() => onInsert(dummyResponse)}
                className="bg-blue-600  px-4 py-2 rounded-lg"
              >
                Insert
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
