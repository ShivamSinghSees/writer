import React from "react";
import AiIcon from "@/assets/icons/ai-icon.svg";

interface AIReplyButtonProps {
  position: { top: number; left: number };
  onClick: () => void;
}

export const AIReplyButton: React.FC<AIReplyButtonProps> = ({
  position,
  onClick,
}) => {
  return (
    <button
      className="fixed z-10"
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
      }}
      onClick={onClick}
    >
      <img src={AiIcon} alt="ask-ai" />
    </button>
  );
};
