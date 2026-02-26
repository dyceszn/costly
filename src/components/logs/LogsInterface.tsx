import React from "react";
import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import CustomButton from "../shared/CustomButton";
import BatchLog from "./BatchLog";
import SingleLog from "./SingleLog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

const LogsInterface = () => {
  return (
    <div className=" h-full flex flex-col items-center max-w-2xl gap-6 md:gap-12">
      <form className="flex flex-col gap-6 items-center w-full">
        <Field>
          <Input
            placeholder="Are you a seller? Input seller ID"
            className="text-center h-12 bg-white border placeholder:text-center placeholder:text-xs md:placeholder:txet-sm"
          />
          <FieldDescription className="text-xs leading-loose">
            By attaching a seller id, you are telling costly that customers may
            come to you to purchase the listed product(s). If you are seller but
            do not have the current product, Please leave blank.
          </FieldDescription>
        </Field>

        {/* Tabs and Content */}
        <Tabs className="w-full flex flex-col items-center gap-6">
          <TabsList variant={"line"} className="self-end">
            <TabsTrigger
              value="single"
              className="bg-white hover:bg-white text-text-muted cursor-pointer uppercase text-sm font-semibold"
            >
              Single
            </TabsTrigger>
            <TabsTrigger
              value="batch"
              className="bg-white hover:bg-white text-text-muted cursor-pointer uppercase text-sm"
            >
              Batch
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="single"
            className="w-full flex flex-col items-center gap-6"
          >
            <SingleLog />
            <CustomButton text="Send to costly" />
          </TabsContent>
          <TabsContent
            value="batch"
            className="w-full flex flex-col items-center gap-6"
          >
            <BatchLog />
            <CustomButton text="Send to costly" />
          </TabsContent>
        </Tabs>
      </form>
    </div>
  );
};

export default LogsInterface;
