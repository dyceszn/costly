import React from "react";
import CustomButton from "../shared/CustomButton";
import Footnotes from "../shared/Footnotes";
import { ShieldCheck } from "lucide-react";
import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Select, SelectTrigger } from "../ui/select";
import SocialMediaForm from "./SocialMediaForm";

interface Step3AboutBusinessProps {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}

const Step3AboutBusiness: React.FC<Step3AboutBusinessProps> = ({
  setCurrentStep,
}) => {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="grid gap-x-4 md:grid-cols-6 grid-rows-3 w-full">
        <Field className="col-span-full md:col-span-4">
          <FieldLabel></FieldLabel>
          <Input
            placeholder="Name of business"
            className="text-center h-12 bg-white border placeholder:text-center placeholder:text-xs md:placeholder:txet-sm"
          />
          <FieldDescription></FieldDescription>
          <FieldError></FieldError>
        </Field>
        {true && (
          <Field className="col-span-full md:col-span-2">
            <FieldLabel></FieldLabel>
            <Input
              placeholder="Branch name"
              className="text-center h-12 bg-white border placeholder:text-center placeholder:text-xs md:placeholder:txet-sm"
            />
            <FieldDescription></FieldDescription>
            <FieldError></FieldError>
          </Field>
        )}
        <Field className="col-span-full md:col-span-3">
          <FieldLabel></FieldLabel>
          <Select>
            <SelectTrigger className="text-center min-h-12 bg-white border placeholder:text-center placeholder:text-xs md:placeholder:text-sm px-6">
              Nigeria
            </SelectTrigger>
          </Select>
          <FieldDescription></FieldDescription>
          <FieldError></FieldError>
        </Field>
        <Field className="col-span-full md:col-span-3">
          <FieldLabel></FieldLabel>
          <Select>
            <SelectTrigger className="text-center min-h-12 bg-white border placeholder:text-center placeholder:text-xs md:placeholder:txet-sm px-6">
              State
            </SelectTrigger>
          </Select>
          <FieldDescription></FieldDescription>
          <FieldError></FieldError>
        </Field>
        <Field className="col-span-full md:col-span-2">
          <FieldLabel></FieldLabel>
          <Select>
            <SelectTrigger className="text-center min-h-12 bg-white border placeholder:text-center placeholder:text-xs md:placeholder:text-sm px-6">
              City
            </SelectTrigger>
          </Select>
          <FieldDescription></FieldDescription>
          <FieldError></FieldError>
        </Field>
        <Field className="col-span-full md:col-span-4">
          <FieldLabel></FieldLabel>
          <Input
            placeholder="Address (residential or commercial)"
            className="text-center h-12 bg-white border placeholder:text-center placeholder:text-xs md:placeholder:text-sm"
          />
          <FieldDescription></FieldDescription>
          <FieldError></FieldError>
        </Field>
      </div>

      <SocialMediaForm />

      <Footnotes
        icon={<ShieldCheck className="size-4 shrink-0" />}
        text={
          "Address Data is used solely for partner verification and to improve your visibility in localized search results. We use url’s instead of handles for user safety."
        }
      />
      <CustomButton text="Continue" onClick={() => setCurrentStep(4)} />
    </div>
  );
};

export default Step3AboutBusiness;
