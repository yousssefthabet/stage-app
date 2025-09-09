import React from "react";
import { FaEnvelope } from "react-icons/fa";
import { useRouter } from "next/navigation";
import SharedButton from "./SharedButton";

interface EmailsButtonProps {
  EmailsNumber: number;
  onClick?: () => void;
}

const EmailsButton: React.FC<EmailsButtonProps> = ({
  EmailsNumber,
  onClick,
}) => {
  const router = useRouter();

  const handleNavigate = () => {
    router.push(`/espace-mail?code=${localStorage.getItem("code")}`);
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
      <span className="bg-secondary absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full text-[9px] text-white">
        {EmailsNumber > 9 ? "9+" : EmailsNumber}
      </span>
      <FaEnvelope />
    </SharedButton>
  );
};

export default EmailsButton;
