import React from "react";
import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { ShieldCheck } from "lucide-react";
import Footnotes from "../shared/Footnotes";
import CustomButton from "../shared/CustomButton";
import DragAndDrop from "../shared/DragAndDrop";

const Step4Verification = () => {
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

      <Field>
        <FieldLabel className="text-sm">Please create a seller ID.</FieldLabel>
        <div className="flex items-center h-12 w-full bg-white border border-input rounded-full px-6 focus-within:ring-1 focus-within:ring-ring">
          {/* The Prefix */}
          <span className="text-sm text-muted-foreground font-medium border-r pr-3 mr-3 whitespace-nowrap">
            S -
          </span>

          {/* The Input */}
          <input
            placeholder="your-unique-id"
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>
        <FieldDescription className="text-xs leading-loose">
          This ID is unique to your shop and helps you manage your products
          easily.
        </FieldDescription>
        <FieldError></FieldError>
      </Field>
      <Footnotes
        icon={<ShieldCheck className="size-4 shrink-0" />}
        text="By clicking confirm, you agree to our terms of service."
      />
      <CustomButton text="Confirm & Submit" />
    </div>
  );
};

export default Step4Verification;
