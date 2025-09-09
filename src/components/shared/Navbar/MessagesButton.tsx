import React from "react";
import SharedButton from "./SharedButton";
import { FaComments } from "react-icons/fa";
import { useRouter } from "next/navigation";

interface MessagesButtonProps {
  MessagesNumber: number;
  onClick?: () => void;
}

const MessagesButton: React.FC<MessagesButtonProps> = ({
  MessagesNumber,
  onClick,
}) => {
  const router = useRouter();

  const handleNavigate = () => {
    router.push("/messenger");
  };

  return (
    <SharedButton
      className="relative"
      onClick={() => {
        handleNavigate();
        if (onClick) {
          onClick();
        }
      }}
    >
      <span className="bg-secondary-clr absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full text-[9px] text-white">
        {MessagesNumber > 9 ? "9+" : MessagesNumber}
      </span>
      <FaComments />
    </SharedButton>
  );
};

export default MessagesButton;
