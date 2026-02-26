import LogsHeader from "@/components/logs/LogsHeader";
import LogsInterface from "@/components/logs/LogsInterface";
import React from "react";

export default function page() {
  return (
    <div className="py-16 flex flex-col gap-16 w-full items-center px-8 md:px-0">
      <LogsHeader />
      <LogsInterface />
    </div>
  );
}
