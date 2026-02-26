"use client";
import { ChevronLeft } from "lucide-react";
import React, { useState } from "react";
import Step1Category from "./Step1Category";
import Step2AboutUser from "./Step2AboutUser";
import Step3AboutBusiness from "./Step3AboutBusiness";
import Step4Verification from "./Step4Verification";

const OnboardingInterface = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const text = [
    {
      number: "Step 1 of 4",
      title: "Which best describes you?",
      description: "This will help us personalize your experience.",
    },
    {
      number: "Step 2 of 4",
      title: "Who is registering?",
      description: "This will help us personalize your experience.",
    },
    {
      number: "Step 3 of 4",
      title: "Your business?",
      description: "This will help us personalize your experience.",
    },
    {
      number: "Step 4 of 4",
      title: "Verification and Confirmation",
      description: "This will help us personalize your experience.",
    },
  ];

  return (
    <div className=" h-full flex flex-col items-center max-w-2xl gap-6 md:gap-8">
      <div className="flex w-full items-center gap-4 border-b pb-4">
        {currentStep > 1 && (
          <button
            className="p-2 -ml-2 hover:bg-slate-100 rounded-full transition-colors"
            onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 1))}
            disabled={currentStep === 1}
          >
            <ChevronLeft className="w-5 h-5 text-slate-600" />
          </button>
        )}
        <div className="flex flex-col gap-2">
          <p className="text-[10px] md:text-xs uppercase tracking-widest text-text-muted font-semibold">
            {text[currentStep - 1].number}
          </p>
          <p className="text-sm md:text-base font-medium">
            {text[currentStep - 1].title}
          </p>
        </div>
      </div>
      {currentStep === 1 && <Step1Category setCurrentStep={setCurrentStep} />}
      {currentStep === 2 && <Step2AboutUser setCurrentStep={setCurrentStep} />}
      {currentStep === 3 && (
        <Step3AboutBusiness setCurrentStep={setCurrentStep} />
      )}
      {currentStep === 4 && <Step4Verification />}
    </div>
  );
};

export default OnboardingInterface;
