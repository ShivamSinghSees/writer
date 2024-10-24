import { ChatMessageType } from "@/utils/types";

export const ChatMessage: React.FC<ChatMessageType> = ({ role, text }) => (
  <span
    className={`
        text-[24px] p-[16px] rounded-[12px] w-fit text-[#666D80] 
        ${role === "assistant" ? "text-start bg-[#DBEAFE]" : "self-end bg-[#DFE1E7]"}
      `}
  >
    {text}
  </span>
);
