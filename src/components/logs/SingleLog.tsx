import React from "react";
import Footnotes from "../shared/Footnotes";
import { ShieldCheck } from "lucide-react";
import SingleInputSet from "./SingleInputSet";

const SingleLog = () => {
  return (
    <div className="w-full flex flex-col items-center gap-8">
      <SingleInputSet />
      <Footnotes
        icon={<ShieldCheck className="size-4 shrink-0" />}
        text="Input from everyone helps use with better precision. The more detailed, the better."
      />
    </div>
  );
};

export default SingleLog;
