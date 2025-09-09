import { useRef, useState } from "react";
import { io, type Socket } from "socket.io-client";
import { env } from "@/env";
import { type Message } from "@/apis/types/discussion-types";

type CallbackMap = Record<
  number,
  {
    socket: Socket;
    isFromBubble?: boolean;
    isFromWindow?: boolean;
  }
>;
export function useSocket() {
  const socketIo = io(env.NEXT_PUBLIC_API_BASE_URL, {
    transports: ["websocket"],
    withCredentials: true,
    autoConnect: false,
  });

  return {
    socketIo,
  };
}
export function useSocketDiscussion() {
  const callbacksRef = useRef<CallbackMap>({});
  const [discussionId, setDiscussionId] = useState<number | null>(null);
  const joinDiscussion = (
    discussionId: number,
    onMessageReceived: (msg: Message[]) => void,
    onConnect: (isConnected: boolean) => void,
    isFromBubble = false,
    isFromWindow = false,
  ) => {
    if (callbacksRef.current[discussionId]) {
      return;
    }

    callbacksRef.current[discussionId] = {
      socket: io(env.NEXT_PUBLIC_API_BASE_URL, {
        transports: ["websocket"],
        withCredentials: true,
        autoConnect: false,
      }),
    };
    if (isFromBubble) {
      callbacksRef.current[discussionId].isFromBubble = true;
    }
    if (isFromWindow) {
      callbacksRef.current[discussionId].isFromWindow = true;
    }
    callbacksRef.current[discussionId].socket.on("connect", () => {
      callbacksRef.current[discussionId]?.socket.emit(
        "join-discussion",
        { discussionId },
        () => {
          setDiscussionId(discussionId);
          onConnect(true);
        },
      );
    });

    callbacksRef.current[discussionId].socket.on(
      "discussionMessages",
      (data: Message[]) => {
        // onMessageReceived(data)
      },
    );

    callbacksRef.current[discussionId].socket.on(
      `messageReceived`,
      (data: Message) => {
        onMessageReceived([data]);
      },
    );

    callbacksRef.current[discussionId].socket.connect();
  };

  const closeSocket = (
    discussionId: number,
    isFromBubble = false,
    isFromWindow = false,
  ) => {
    if (callbacksRef.current[discussionId]) {
      if (isFromBubble) {
        callbacksRef.current[discussionId].isFromBubble = false;
      }
      if (isFromWindow) {
        callbacksRef.current[discussionId].isFromWindow = false;
      }

      if (
        !callbacksRef.current[discussionId].isFromBubble &&
        !callbacksRef.current[discussionId].isFromWindow
      ) {
        callbacksRef.current[discussionId].socket.off(); // retire les listeners
        callbacksRef.current[discussionId].socket.disconnect(); // ferme la socket
        callbacksRef.current[discussionId].socket.close(); // ferme la socket
        delete callbacksRef.current[discussionId];
      }
    }
  };

  const sendMessage = (
    discussionId: number,
    message: string,
    onMessageReceived: (msg: Message[]) => void,
  ) => {
    if (callbacksRef.current[discussionId]) {
      callbacksRef.current[discussionId].socket.emit(
        "send-message",
        {
          discussionId: discussionId,
          message: message,
        },
        (data: Message) => {
          onMessageReceived([data]);
        },
      );
    }
  };

  return {
    joinDiscussion,
    closeSocket,
    sendMessage,
  };
}
