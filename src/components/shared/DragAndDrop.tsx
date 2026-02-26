import { ShieldCheck } from "lucide-react";
import React from "react";

interface DragAndDropProps {
  text: string;
}

const DragAndDrop: React.FC<DragAndDropProps> = ({ text }) => {
  return (
    <div className="w-full aspect-3/1 rounded-2xl border-2 border-dashed bg-gray-50 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-gray-100 transition-colors">
      <div className="p-2 bg-white rounded-full shadow-sm">
        <ShieldCheck className="size-5 text-slate-400" />
      </div>
      <p className="text-[11px] font-medium text-slate-500">{text}</p>
    </div>
  );
};

export default DragAndDrop;
