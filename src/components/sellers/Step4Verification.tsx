import React from "react";
import { Field, FieldDescription, FieldLabel } from "../ui/field";
import { ShieldCheck } from "lucide-react";
import Footnotes from "../shared/Footnotes";
import CustomButton from "../shared/CustomButton";
import DragAndDrop from "../shared/DragAndDrop";
import { OnboardingFormData } from "./OnboardingInterface";

interface Step4VerificationProps {
  formData: OnboardingFormData;
  update: (patch: Partial<OnboardingFormData>) => void;
  onSubmit: () => void;
  submitting: boolean;
  submitError: string | null;
}

const Step4Verification: React.FC<Step4VerificationProps> = ({
  formData,
  update,
  onSubmit,
  submitting,
  submitError,
}) => {
  // handle slug must be lowercase letters, numbers, hyphens only
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleaned = e.target.value
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, "")
      .slice(0, 30);
    update({ handle: cleaned });
  };

  const isValid = formData.handle.trim().length >= 3;

  return (
    <div className="flex flex-col w-full gap-8 items-center">
      <div className="flex flex-col gap-2">
        <p className="text-xs leading-loose">
          To aid in your verification success, please upload any document
          (Government ID, CAC, or references) you feel will help prove the
          legitimacy of you, your character, or your business. These are used
          solely for verification and will be deleted afterward.
        </p>
        <DragAndDrop text="Click or drag & drop documents here." />
      </div>

      <Field className="w-full">
        <FieldLabel className="text-sm">Please create a seller ID.</FieldLabel>
        <div className="flex items-center h-12 w-full bg-white border border-input rounded-full px-6 focus-within:ring-1 focus-within:ring-ring">
          <span className="text-sm text-muted-foreground font-medium border-r pr-3 mr-3 whitespace-nowrap">
            S -
          </span>
          <input
            placeholder="your-unique-id"
            value={formData.handle}
            onChange={handleChange}
            maxLength={30}
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>
        <FieldDescription className="text-xs leading-loose">
          Lowercase letters, numbers, and hyphens only. This becomes your
          public seller ID (e.g. S-{formData.handle || "your-unique-id"}).
        </FieldDescription>
      </Field>

      {submitError && (
        <p className="text-xs text-red-500 text-center">{submitError}</p>
      )}

      <Footnotes
        icon={<ShieldCheck className="size-4 shrink-0" />}
        text="By clicking confirm, you agree to our terms of service."
      />
      <CustomButton
        text={submitting ? "Submitting…" : "Confirm & Submit"}
        type="button"
        disabled={!isValid || submitting}
        onClick={onSubmit}
      />
    </div>
  );
};

export default Step4Verification;
