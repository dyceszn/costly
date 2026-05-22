import React from "react";
import { Field, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { OnboardingFormData } from "./OnboardingInterface";

interface AboutUserFormProps {
  formData: OnboardingFormData;
  update: (patch: Partial<OnboardingFormData>) => void;
}

const inputClass =
  "h-14 text-center placeholder:text-text-muted bg-white border placeholder:text-sm focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none";

const AboutUserForm: React.FC<AboutUserFormProps> = ({ formData, update }) => {
  return (
    <div className="md:w-2xl w-full flex flex-col items-center gap-6">
      <Field className="w-full">
        <FieldLabel className="hidden">Email Address</FieldLabel>
        <Input
          type="email"
          placeholder="Email address"
          required
          value={formData.email}
          onChange={(e) => update({ email: e.target.value })}
          className={inputClass}
        />
      </Field>

      <Field className="w-full">
        <FieldLabel className="hidden">First name</FieldLabel>
        <Input
          type="text"
          placeholder="First name"
          required
          value={formData.firstName}
          onChange={(e) => update({ firstName: e.target.value })}
          className={inputClass}
        />
      </Field>

      <Field className="w-full">
        <FieldLabel className="hidden">Last name</FieldLabel>
        <Input
          type="text"
          placeholder="Last name"
          required
          value={formData.lastName}
          onChange={(e) => update({ lastName: e.target.value })}
          className={inputClass}
        />
      </Field>

      <Field className="w-full">
        <FieldLabel className="hidden">Phone number</FieldLabel>
        <Input
          type="tel"
          placeholder="Phone number"
          required
          value={formData.phone}
          onChange={(e) => update({ phone: e.target.value })}
          className={inputClass}
        />
      </Field>
    </div>
  );
};

export default AboutUserForm;
