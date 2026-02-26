import React from "react";
import CustomButton from "../shared/CustomButton";
import Footnotes from "../shared/Footnotes";
import { Info } from "lucide-react";
import AboutUserForm from "./AboutUserForm";

interface Step2AboutUserProps {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}

const Step2AboutUser: React.FC<Step2AboutUserProps> = ({ setCurrentStep }) => {
  const footnote_text =
    "Did you know? Costly is built and powered by dyce technology inc. Learn more.";
  return (
    <div className="w-full flex flex-col items-center gap-8">
      <AboutUserForm />
      <Footnotes
        icon={<Info className="size-4 shrink-0" />}
        text={footnote_text}
      />
      <CustomButton text="Continue" onClick={() => setCurrentStep(3)} />
    </div>
  );
};

export default Step2AboutUser;
