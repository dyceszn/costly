import React from "react";
import Footnotes from "../shared/Footnotes";
import { ShieldCheck } from "lucide-react";
import SingleInputSet, { SingleLogData } from "./SingleInputSet";

interface SingleLogProps {
  data: SingleLogData;
  onChange: (patch: Partial<SingleLogData>) => void;
}

const SingleLog: React.FC<SingleLogProps> = ({ data, onChange }) => {
  return (
    <div className="w-full flex flex-col items-center gap-8">
      <SingleInputSet data={data} onChange={onChange} />
      <Footnotes
        icon={<ShieldCheck className="size-4 shrink-0" />}
        text="Input from everyone helps us with better precision. The more detailed, the better."
      />
    </div>
  );
};

export default SingleLog;
