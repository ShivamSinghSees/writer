import React, { useState } from "react";
import ArrowIcon from "~/assets/icons/arrow.svg";
import RepeatIcon from "~/assets/icons/repeat.svg";
import ArrowDownIcon from "~/assets/icons/arrow-down.svg";

interface ModalProps {
  onClose: () => void;
  onInsert: (text: string) => void;
}

interface ChatResponse {
  role: "user" | "assistant";
  text: string;
}

const dummyResponse =
  "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask.";

export const Modal: React.FC<ModalProps> = ({ onClose, onInsert }) => {
  const [response, setResponse] = useState<ChatResponse[]>([]);
  const [command, setCommand] = useState("");

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  function handleGenerate() {
    setResponse((prev) => {
      return [...prev, { role: "user", text: command }];
    });

    // added a delay before showing response so looks authentic
    setTimeout(() => {
      setResponse((prev) => {
        return [...prev, { role: "assistant", text: dummyResponse }];
      });
    }, 1000);
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 test-modal "
      onClick={handleBackdropClick}
    >
      <div className="bg-[#F9FAFB] rounded-lg p-[26px] w-[870px] max-w-[90vw] text-end flex gap-[26px] flex-col ">
        {response && (
          <div className="flex gap-[26px] flex-col">
            {response?.map((chat) => {
              return (
                <span
                  className={`text-[24px] p-[16px] rounded-[12px] w-fit text-[#666D80] ${chat.role === "assistant" ? "text-start bg-[#DBEAFE] " : "self-end bg-[#DFE1E7]"} `}
                >
                  {" "}
                  {chat.text}
                </span>
              );
            })}
          </div>
        )}
        <input
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          className="w-full h-[61px] border rounded-[8px] text-[24px] leading-[29px] px-[16px] py-[5px] text-[#666D80] "
          placeholder="Your prompt"
        />
        {response.length ? (
          <div className="flex gap-[26px] justify-end ">
            <button
              onClick={() => onInsert(dummyResponse)}
              className=" flex w-fit gap-[12px] border border-[#666D80] text-[#666D80]  py-[12px] px-[24px] rounded-[15px] text-[24px] items-center"
            >
              <img src={ArrowDownIcon} alt="arrow" /> Insert
            </button>

            <button className="text-white flex w-fit gap-[16px] bg-[#3B82F6] py-[12px] px-[24px] rounded-[15px] text-[24px] cursor-default items-center ">
              <img src={RepeatIcon} alt="repeat" /> Regenerate
            </button>
          </div>
        ) : (
          <button
            onClick={handleGenerate}
            className="text-white flex w-fit gap-[10px] bg-[#3B82F6] py-[12px] px-[24px] rounded-[15px] text-[24px] self-end items-center "
          >
            <img src={ArrowIcon} alt="generate" />
            Generate
          </button>
        )}
      </div>
    </div>
  );
};
