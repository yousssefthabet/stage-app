"use client";

import { useEffect, useState } from "react";
import { Button } from "../../ui/button";
import { Expand, Shrink } from "lucide-react";

export default function FullScreenToggle() {
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);

  const handleFullScreenToggle = () => {
    if (document.fullscreenElement) {
      void document.exitFullscreen();
    }

    if (typeof document !== "undefined") {
      if (document.fullscreenElement) {
        void document.exitFullscreen();
      } else {
        void document.documentElement.requestFullscreen();
      }
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    if (typeof document !== "undefined") {
      document.addEventListener("fullscreenchange", handleFullscreenChange);

      return () => {
        document.removeEventListener(
          "fullscreenchange",
          handleFullscreenChange,
        );
      };
    }
  }, []);

  return (
    <Button
      variant="outline"
      className="bg-primary-dark hover:bg-primary-dark hover:text-secondary h-10 w-10 cursor-pointer rounded-full border-0"
      onClick={handleFullScreenToggle}
    >
      {isFullScreen ? (
        <Shrink className="h-5 w-5" />
      ) : (
        <Expand className="h-5 w-5" />
      )}
    </Button>
  );
}
