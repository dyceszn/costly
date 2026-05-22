import React from "react";
import CustomButton from "../shared/CustomButton";
import Footnotes from "../shared/Footnotes";
import { ShieldCheck } from "lucide-react";
import { Field, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import SocialMediaForm from "./SocialMediaForm";
import { OnboardingFormData } from "./OnboardingInterface";

// All 36 Nigerian states + FCT
const NIGERIAN_STATES = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue",
  "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT",
  "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi",
  "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo",
  "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara",
];

interface Step3AboutBusinessProps {
  formData: OnboardingFormData;
  update: (patch: Partial<OnboardingFormData>) => void;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}

const inputClass =
  "text-center h-12 bg-white border placeholder:text-center placeholder:text-xs md:placeholder:text-sm";
const selectClass =
  "text-center h-12 w-full bg-white border rounded-lg px-4 text-sm focus:outline-none focus:ring-1 focus:ring-ring text-text-primary";

const Step3AboutBusiness: React.FC<Step3AboutBusinessProps> = ({
  formData,
  update,
  setCurrentStep,
}) => {
  const isValid =
    formData.businessName.trim() &&
    formData.state.trim() &&
    formData.city.trim() &&
    formData.address.trim();

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      <div className="grid gap-x-4 gap-y-4 md:grid-cols-6 w-full">
        {/* Business name */}
        <Field className="col-span-full md:col-span-4">
          <FieldLabel className="hidden">Business name</FieldLabel>
          <Input
            placeholder="Name of business"
            value={formData.businessName}
            onChange={(e) => update({ businessName: e.target.value })}
            className={inputClass}
          />
        </Field>

        {/* Branch name (optional) */}
        <Field className="col-span-full md:col-span-2">
          <FieldLabel className="hidden">Branch name</FieldLabel>
          <Input
            placeholder="Branch name (optional)"
            value={formData.branchName}
            onChange={(e) => update({ branchName: e.target.value })}
            className={inputClass}
          />
        </Field>

        {/* Country – fixed to Nigeria for now */}
        <Field className="col-span-full md:col-span-3">
          <FieldLabel className="hidden">Country</FieldLabel>
          <select
            value="Nigeria"
            disabled
            className={selectClass + " opacity-60 cursor-not-allowed"}
          >
            <option value="Nigeria">Nigeria</option>
          </select>
        </Field>

        {/* State */}
        <Field className="col-span-full md:col-span-3">
          <FieldLabel className="hidden">State</FieldLabel>
          <select
            value={formData.state}
            onChange={(e) => update({ state: e.target.value })}
            className={selectClass}
            required
          >
            <option value="" disabled>
              Select state
            </option>
            {NIGERIAN_STATES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </Field>

        {/* City */}
        <Field className="col-span-full md:col-span-2">
          <FieldLabel className="hidden">City</FieldLabel>
          <Input
            placeholder="City / LGA"
            value={formData.city}
            onChange={(e) => update({ city: e.target.value })}
            className={inputClass}
          />
        </Field>

        {/* Address */}
        <Field className="col-span-full md:col-span-4">
          <FieldLabel className="hidden">Address</FieldLabel>
          <Input
            placeholder="Address (residential or commercial)"
            value={formData.address}
            onChange={(e) => update({ address: e.target.value })}
            className={inputClass}
          />
        </Field>
      </div>

      <SocialMediaForm formData={formData} update={update} />

      <Footnotes
        icon={<ShieldCheck className="size-4 shrink-0" />}
        text="Address data is used solely for partner verification and to improve your visibility in localized search results."
      />
      <CustomButton
        text="Continue"
        disabled={!isValid}
        onClick={() => isValid && setCurrentStep(4)}
      />
    </div>
  );
};

export default Step3AboutBusiness;
