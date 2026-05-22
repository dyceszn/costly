import React from "react";
import CustomButton from "../shared/CustomButton";
import Footnotes from "../shared/Footnotes";
import { Info } from "lucide-react";
import AboutUserForm from "./AboutUserForm";
import { OnboardingFormData } from "./OnboardingInterface";

interface Step2AboutUserProps {
  formData: OnboardingFormData;
  update: (patch: Partial<OnboardingFormData>) => void;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}

const FOOTNOTE = "Did you know? Costly is built and powered by dyce technology inc.";

const Step2AboutUser: React.FC<Step2AboutUserProps> = ({
  formData,
  update,
  setCurrentStep,
}) => {
  const isValid =
    formData.firstName.trim() &&
    formData.lastName.trim() &&
    formData.email.trim() &&
    formData.phone.trim();

  return (
    <div className="w-full flex flex-col items-center gap-8">
      <AboutUserForm formData={formData} update={update} />
      <Footnotes icon={<Info className="size-4 shrink-0" />} text={FOOTNOTE} />
      <CustomButton
        text="Continue"
        disabled={!isValid}
        onClick={() => isValid && setCurrentStep(3)}
      />
    </div>
  );
};

export default Step2AboutUser;
