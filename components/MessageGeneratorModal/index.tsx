import { DUMMY_RESPONSE } from "@/utils/constants";
import { ChatMessageType, ModalProps } from "@/utils/types";
import { ChatMessage } from "../ChatMessage";
import { ActionButton } from "../Buttons/ActionButton";
import Arrow from "~/assets/icons/arrow.svg";

export const Modal: React.FC<ModalProps> = ({ onClose, onInsert }) => {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [prompt, setPrompt] = useState("");

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleGenerate = () => {
    if (!prompt.trim()) return;

    setMessages((prev) => [...prev, { role: "user", text: prompt }]);
    setPrompt("");

    // added a delay before showing response so it looks authentic
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: DUMMY_RESPONSE,
        },
      ]);
    }, 1000);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 test-modal"
      onClick={handleBackdropClick}
    >
      <div className="bg-[#F9FAFB] p-[26px] w-[870px] max-w-[90vw] text-end flex gap-[26px] flex-col rounded-[15px] shadow-md">
        {messages.length > 0 && (
          <div className="flex gap-[26px] flex-col">
            {messages.map((message, index) => (
              <ChatMessage
                key={index}
                role={message.role}
                text={message.text}
              />
            ))}
          </div>
        )}

        <input
          disabled={!!messages.length}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full h-[61px] border rounded-[8px] text-[24px] leading-[29px] px-[16px] py-[5px] text-[#666D80]"
          placeholder="Your prompt"
        />

        {messages.length > 0 ? (
          <ActionButton
            onInsert={() => {
              // wait till the response is received
              if (messages.length == 2) {
                onInsert(DUMMY_RESPONSE);
              }
            }}
            onRegenerate={handleGenerate}
            showRegenerate
          />
        ) : (
          <button
            onClick={handleGenerate}
            disabled={!prompt}
            className="text-white flex w-fit gap-[10px] bg-[#3B82F6] py-[12px] px-[24px] rounded-[15px] text-[24px] self-end items-center"
          >
            <img src={Arrow} alt="generate" />
            Generate
          </button>
        )}
      </div>
    </div>
  );
};

export default Modal;
