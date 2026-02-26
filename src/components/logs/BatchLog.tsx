import React from "react";
import Footnotes from "../shared/Footnotes";
import { ShieldCheck } from "lucide-react";
import DragAndDrop from "../shared/DragAndDrop";

const BatchLog = () => {
  return (
    <div className="flex flex-col gap-4">
      <DragAndDrop text="Click or drag & drop your excel or csv file here." />
      <Footnotes
        icon={<ShieldCheck className="size-4 shrink-0" />}
        text="For batch uploads, relevant headers are auto-mapped. Importantly, Fields that show the product name and price must be available and correctly organised."
      />
    </div>
  );
};

export default BatchLog;
