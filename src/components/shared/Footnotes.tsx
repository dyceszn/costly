import React from "react";

interface FootnotesProps {
  icon: React.ReactNode;
  text: string;
}

const Footnotes: React.FC<FootnotesProps> = ({ icon, text }) => {
  return (
    <div className="flex gap-1">
      {icon}
      <p className="text-[10px] text-center leading-relaxed">{text}</p>
    </div>
  );
};

export default Footnotes;
