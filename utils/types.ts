export interface ModalProps {
  onClose: () => void;
  onInsert: (text: string) => void;
}

export interface ChatMessageType {
  role: "user" | "assistant";
  text: string;
}
