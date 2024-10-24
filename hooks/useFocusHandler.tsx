import { useEffect, useRef, useState } from "react";

interface ButtonPosition {
  top: number;
  left: number;
}

interface UseFocusHandlerProps {
  AiIconHeight: number;
  AiIconWidth: number;
}

export const useFocusHandler = ({
  AiIconHeight,
  AiIconWidth,
}: UseFocusHandlerProps) => {
  const [showButton, setShowButton] = useState(false);
  const [buttonPosition, setButtonPosition] = useState<ButtonPosition>({
    top: 0,
    left: 0,
  });
  const activeInputRef = useRef<HTMLElement | null>(null);

  const handleInputFocus = (event: FocusEvent) => {
    const target = event.target as HTMLElement;

    if (target.getAttribute("role") === "textbox") {
      // Store the currently focused input
      activeInputRef.current = target;

      const rect = target.getBoundingClientRect();
      const topOffset = rect.height - AiIconHeight;
      const leftOffset = rect.width - AiIconWidth;

      setButtonPosition({
        top: rect.top + topOffset,
        left: rect.left + leftOffset,
      });
      setShowButton(true);
    }
  };

  const handleInputBlur = (event: FocusEvent) => {
    const target = event.target as HTMLElement;
    const relatedTarget = event.relatedTarget as HTMLElement;

    // Only proceed if this is the active input being blurred
    if (
      target === activeInputRef.current &&
      target.getAttribute("role") === "textbox"
    ) {
      // Check if we're moving to another textbox
      if (relatedTarget?.getAttribute("role") === "textbox") {
        // If moving to another textbox, update position immediately
        const rect = relatedTarget.getBoundingClientRect();
        const topOffset = rect.height - AiIconHeight;
        const leftOffset = rect.width - AiIconWidth;

        setButtonPosition({
          top: rect.top + topOffset,
          left: rect.left + leftOffset,
        });
        activeInputRef.current = relatedTarget;
      } else {
        // If not moving to another textbox, hide the button
        setTimeout(() => {
          // Only hide if we haven't focused another input
          if (activeInputRef.current === target) {
            setShowButton(false);
          }
        }, 100);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("focusin", handleInputFocus);
    document.addEventListener("focusout", handleInputBlur);

    return () => {
      document.removeEventListener("focusin", handleInputFocus);
      document.removeEventListener("focusout", handleInputBlur);
    };
  }, []);

  // Add window resize handler to update button position
  useEffect(() => {
    const handleResize = () => {
      if (activeInputRef.current) {
        const rect = activeInputRef.current.getBoundingClientRect();
        const topOffset = rect.height - AiIconHeight;
        const leftOffset = rect.width - AiIconWidth;

        setButtonPosition({
          top: rect.top + topOffset,
          left: rect.left + leftOffset,
        });
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [AiIconHeight, AiIconWidth]);

  return {
    showButton,
    buttonPosition,
    setShowButton,
    activeInputRef,
  };
};
