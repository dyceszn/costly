"use client";
import { CheckCircle, ChevronLeft } from "lucide-react";
import React, { useState } from "react";
import Step1Category from "./Step1Category";
import Step2AboutUser from "./Step2AboutUser";
import Step3AboutBusiness from "./Step3AboutBusiness";
import Step4Verification from "./Step4Verification";

// All form state lives here and is passed down to each step
export interface OnboardingFormData {
  // Step 1
  category: "vendor" | "store" | "";
  // Step 2
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  // Step 3
  businessName: string;
  branchName: string;
  country: string;
  state: string;
  city: string;
  address: string;
  // Step 3 – channels
  instagram: string;
  whatsapp: string;
  facebook: string;
  tiktok: string;
  twitter: string;
  website: string;
  supportEmail: string;
  supportPhone: string;
  // Step 4
  handle: string;
}

const INITIAL_FORM: OnboardingFormData = {
  category: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  businessName: "",
  branchName: "",
  country: "Nigeria",
  state: "",
  city: "",
  address: "",
  instagram: "",
  whatsapp: "",
  facebook: "",
  tiktok: "",
  twitter: "",
  website: "",
  supportEmail: "",
  supportPhone: "",
  handle: "",
};

const STEPS = [
  { number: "Step 1 of 4", title: "Which best describes you?" },
  { number: "Step 2 of 4", title: "Who is registering?" },
  { number: "Step 3 of 4", title: "Your business?" },
  { number: "Step 4 of 4", title: "Verification and Confirmation" },
];

const OnboardingInterface = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<OnboardingFormData>(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const update = (patch: Partial<OnboardingFormData>) =>
    setFormData((prev) => ({ ...prev, ...patch }));

  const handleSubmit = async () => {
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/sellers/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          // Remove empty string channels – they're optional
          instagram: formData.instagram || undefined,
          whatsapp: formData.whatsapp || undefined,
          facebook: formData.facebook || undefined,
          tiktok: formData.tiktok || undefined,
          twitter: formData.twitter || undefined,
          website: formData.website || undefined,
          supportEmail: formData.supportEmail || undefined,
          supportPhone: formData.supportPhone || undefined,
          branchName: formData.branchName || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setSubmitError(data.error ?? "Submission failed. Please try again.");
        return;
      }
      setSubmitted(true);
    } catch {
      setSubmitError("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // ── Success screen ─────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="h-full flex flex-col items-center justify-center max-w-2xl gap-8 py-16 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-primary/10">
          <CheckCircle className="size-8 text-brand-primary" />
        </div>
        <div className="space-y-2">
          <p className="text-lg font-semibold tracking-tight">
            Application received!
          </p>
          <p className="text-sm text-text-muted max-w-sm">
            Your seller application for{" "}
            <span className="font-semibold">{formData.businessName}</span> has
            been submitted. We&apos;ll review it and reach out to{" "}
            <span className="font-semibold">{formData.email}</span>.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col items-center max-w-2xl gap-6 md:gap-8">
      {/* Step header */}
      <div className="flex w-full items-center gap-4 border-b pb-4">
        {currentStep > 1 && (
          <button
            className="p-2 -ml-2 hover:bg-slate-100 rounded-full transition-colors"
            onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 1))}
          >
            <ChevronLeft className="w-5 h-5 text-slate-600" />
          </button>
        )}
        <div className="flex flex-col gap-2">
          <p className="text-[10px] md:text-xs uppercase tracking-widest text-text-muted font-semibold">
            {STEPS[currentStep - 1].number}
          </p>
          <p className="text-sm md:text-base font-medium">
            {STEPS[currentStep - 1].title}
          </p>
        </div>
      </div>

      {currentStep === 1 && (
        <Step1Category
          formData={formData}
          update={update}
          setCurrentStep={setCurrentStep}
        />
      )}
      {currentStep === 2 && (
        <Step2AboutUser
          formData={formData}
          update={update}
          setCurrentStep={setCurrentStep}
        />
      )}
      {currentStep === 3 && (
        <Step3AboutBusiness
          formData={formData}
          update={update}
          setCurrentStep={setCurrentStep}
        />
      )}
      {currentStep === 4 && (
        <Step4Verification
          formData={formData}
          update={update}
          onSubmit={handleSubmit}
          submitting={submitting}
          submitError={submitError}
        />
      )}
    </div>
  );
};

export default OnboardingInterface;
