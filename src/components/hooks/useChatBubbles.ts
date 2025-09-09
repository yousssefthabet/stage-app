import { create } from "zustand";
import { persist } from "zustand/middleware";
import { type Discussion } from "@/apis/types/discussion-types";

interface ChatBubbleState {
  openBubbles: Discussion[];
  openBubble: (discussion: Discussion) => void;
  closeBubble: (discussion: Discussion) => void;
}

export const useChatBubbles = create<ChatBubbleState>()(
  persist(
    (set) => ({
      openBubbles: [],
      openBubble: (discussion) =>
        set((state) => ({
          openBubbles: [...state.openBubbles, discussion],
        })),
      closeBubble: (discussion) =>
        set((state) => ({
          openBubbles: state.openBubbles.filter(
            (discussionBubble) => discussionBubble !== discussion,
          ),
        })),
    }),
    {
      name: "chat-bubbles-storage",
      storage: {
        getItem: <T>(name: string): T | null => {
          const str = localStorage.getItem(name);
          return str ? (JSON.parse(str) as T) : null;
        },
        setItem: (name, value) => {
          localStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => {
          localStorage.removeItem(name);
        },
      },
    },
  ),
);
