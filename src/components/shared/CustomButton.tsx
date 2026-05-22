import React from "react";
import { Button } from "../ui/button";

interface CustomButtonProps {
  text: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  text,
  onClick,
  type = "button",
  disabled = false,
}) => {
  return (
    <Button
      type={type}
      disabled={disabled}
      className="flex items-center gap-2 px-5 py-2.5 rounded-full border-black bg-white text-text-primary text-[10px] font-bold uppercase cursor-pointer tracking-[0.2em] hover:bg-text-primary hover:text-white hover:border-black transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
      onClick={onClick}
    >
      {text}
    </Button>
  );
};

export default CustomButton;
