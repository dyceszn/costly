import { ShieldCheck, Store, User } from "lucide-react";
import React from "react";
import CustomButton from "../shared/CustomButton";
import Footnotes from "../shared/Footnotes";
import CategoryCard from "./CategoryCard";

interface Step1CategoryProps {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}

const Step1Category: React.FC<Step1CategoryProps> = ({ setCurrentStep }) => {
  const footnote_text =
    "Trust is our Priority. We manually vet every seller to protect our community. Our verification is flexible and inclusive, ensuring authentic businesses of all sizes can thrive on Costly.";

  const vendor_info = {
    title: "Vendor",
    description:
      "A seller whose primary method of sales is digital. They may or may not have a physical store.",
  };
  const store_info = {
    title: "Store",
    description:
      "A seller (or group) that requires customers to visit a physical location to make a purchase.",
  };
  return (
    <div className="w-full flex flex-col items-center gap-8 ">
      <div className="grid sm:grid-cols-2 w-full gap-6 md:gap-16 md:h-68">
        <CategoryCard
          icon={<User className="size-6 text-brand-primary" />}
          title={vendor_info.title}
          description={vendor_info.description}
        />
        <CategoryCard
          icon={<Store className="size-6 text-brand-primary" />}
          title={store_info.title}
          description={store_info.description}
        />
      </div>

      <Footnotes
        icon={<ShieldCheck className="size-4 shrink-0" />}
        text={footnote_text}
      />
      <CustomButton text="Continue" onClick={() => setCurrentStep(2)} />
    </div>
  );
};

export default Step1Category;
