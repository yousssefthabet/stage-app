import { useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";

export default function useChatInterface() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [showConversations, setShowConversations] = useState(!isMobile);

  const handleSelectDiscussion = () => {
    if (isMobile) {
      setShowConversations(false);
    }
  };

  const handleBackToList = () => {
    setShowConversations(true);
  };

  return {
    isMobile,
    showConversations,
    handleSelectDiscussion,
    handleBackToList,
  };
}
