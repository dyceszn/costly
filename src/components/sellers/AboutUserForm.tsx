import React from "react";
import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";

const AboutUserForm = () => {
  return (
    <form className="md:w-2xl w-full flex flex-col items-center gap-6">
      <Field className="w-full">
        <FieldLabel className="hidden">Email Address</FieldLabel>
        <Input
          type="email"
          placeholder="Email address"
          required
          className="h-14 text-center placeholder:text-text-muted bg-white border placeholder:text-sm focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
        />
        <FieldDescription className="hidden">
          Enter your email address. This field is required.
        </FieldDescription>
        <FieldError className="hidden">
          Invalid email address. Please enter a valid email.
        </FieldError>
      </Field>

      <Field className="w-full">
        <FieldLabel className="hidden">First name</FieldLabel>
        <Input
          type="text"
          placeholder="First name"
          required
          className="h-14 text-center placeholder:text-text-muted bg-white border placeholder:text-sm focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
        />
        <FieldDescription className="hidden">
          Enter your First Name. This field is required.
        </FieldDescription>
        <FieldError className="hidden">
          Invalid First Name. Please enter a valid First Name.
        </FieldError>
      </Field>

      <Field className="w-full">
        <FieldLabel className="hidden">Last name</FieldLabel>
        <Input
          type="text"
          placeholder="Last name"
          required
          className="h-14 text-center placeholder:text-text-muted bg-white border placeholder:text-sm focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
        />
        <FieldDescription className="hidden">
          Enter your Last Name. This field is required.
        </FieldDescription>
        <FieldError className="hidden">
          Invalid Last Name. Please enter a valid last name.
        </FieldError>
      </Field>

      <Field className="w-full ">
        <FieldLabel className="hidden">Phone number</FieldLabel>
        <Input
          type="tel"
          placeholder="Phone number"
          required
          className="h-14 text-center placeholder:text-text-muted bg-white border placeholder:text-sm focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
        />
        <FieldDescription className="hidden">
          Enter your Phone Number. This field is required.
        </FieldDescription>
        <FieldError className="hidden">
          Invalid Phone Number. Please enter a valid phone number.
        </FieldError>
      </Field>
    </form>
  );
};

export default AboutUserForm;
