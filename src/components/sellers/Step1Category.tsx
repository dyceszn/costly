import { ShieldCheck, Store, User } from "lucide-react";
import React from "react";
import CustomButton from "../shared/CustomButton";
import Footnotes from "../shared/Footnotes";
import CategoryCard from "./CategoryCard";
import { OnboardingFormData } from "./OnboardingInterface";

interface Step1CategoryProps {
  formData: OnboardingFormData;
  update: (patch: Partial<OnboardingFormData>) => void;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}

const FOOTNOTE =
  "Trust is our Priority. We manually vet every seller to protect our community. Our verification is flexible and inclusive, ensuring authentic businesses of all sizes can thrive on Costly.";

const Step1Category: React.FC<Step1CategoryProps> = ({
  formData,
  update,
  setCurrentStep,
}) => {
  const handleSelect = (cat: "vendor" | "store") => {
    update({ category: cat });
    // Auto-advance after a short visual delay so the selection is visible
    setTimeout(() => setCurrentStep(2), 150);
  };

  return (
    <div className="w-full flex flex-col items-center gap-8">
      <div className="grid sm:grid-cols-2 w-full gap-6 md:gap-16 md:h-68">
        <CategoryCard
          icon={<User className="size-6 text-brand-primary" />}
          title="Vendor"
          description="A seller whose primary method of sales is digital. They may or may not have a physical store."
          selected={formData.category === "vendor"}
          onClick={() => handleSelect("vendor")}
        />
        <CategoryCard
          icon={<Store className="size-6 text-brand-primary" />}
          title="Store"
          description="A seller (or group) that requires customers to visit a physical location to make a purchase."
          selected={formData.category === "store"}
          onClick={() => handleSelect("store")}
        />
      </div>

      <Footnotes icon={<ShieldCheck className="size-4 shrink-0" />} text={FOOTNOTE} />
      <CustomButton
        text="Continue"
        disabled={!formData.category}
        onClick={() => formData.category && setCurrentStep(2)}
      />
    </div>
  );
};

export default Step1Category;
