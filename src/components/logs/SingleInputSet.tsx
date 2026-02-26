import React from "react";
import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import {
  Combobox,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxValue,
} from "../ui/combobox";

const SingleInputSet = () => {
  const inputBase =
    "text-center h-12 bg-white border placeholder:text-center placeholder:text-xs md:placeholder:text-sm";

  return (
    <div className="grid md:grid-cols-3 grid-rows-2 gap-x-4 gap-y-4 w-full">
      <Field className="col-span-full">
        <Combobox>
          <ComboboxInput
            placeholder="Category"
            className={inputBase + "pl-4"}
          />
        </Combobox>
      </Field>
      <Field className="md:col-span-2">
        <Input placeholder="Product name" className={inputBase} />
      </Field>
      <Field className="col-span-1">
        <Input placeholder="Price" className={inputBase} />
      </Field>
      <Field className="col-span-full">
        <Combobox multiple>
          <ComboboxValue>
            <ComboboxChipsInput
              placeholder="Select Tags: This helps with searchability"
              className="text-center min-h-12 bg-white border placeholder:text-center placeholder:text-xs md:placeholder:text-sm rounded-lg"
            />
          </ComboboxValue>
          <ComboboxContent>
            <ComboboxEmpty>No options found.</ComboboxEmpty>
          </ComboboxContent>
        </Combobox>
      </Field>
    </div>
  );
};

export default SingleInputSet;
