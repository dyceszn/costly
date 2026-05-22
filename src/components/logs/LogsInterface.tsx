"use client";
import React, { useState } from "react";
import { Field, FieldDescription } from "../ui/field";
import { Input } from "../ui/input";
import CustomButton from "../shared/CustomButton";
import BatchLog, { ParsedBatchEntry } from "./BatchLog";
import SingleLog from "./SingleLog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { SingleLogData } from "./SingleInputSet";
import { CheckCircle } from "lucide-react";

const EMPTY_SINGLE: SingleLogData = {
  category: "",
  productName: "",
  price: "",
  tags: [],
};

const LogsInterface = () => {
  const [sellerId, setSellerId] = useState("");
  const [singleData, setSingleData] = useState<SingleLogData>(EMPTY_SINGLE);
  const [batchEntries, setBatchEntries] = useState<ParsedBatchEntry[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("single");

  const resetFeedback = () => { setSuccess(null); setError(null); };

  // ── Single submission ──────────────────────────────────────────────────────
  const handleSingleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    resetFeedback();
    if (!singleData.productName.trim() || !singleData.price || !singleData.category) {
      setError("Please fill in category, product name, and price.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/logs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productName: singleData.productName.trim(),
          price: parseFloat(singleData.price),
          category: singleData.category,
          tags: singleData.tags,
          sellerId: sellerId.trim() || undefined,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Submission failed");
      }
      setSuccess("Price logged successfully! Thank you for contributing.");
      setSingleData(EMPTY_SINGLE);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  // ── Batch submission ───────────────────────────────────────────────────────
  const handleBatchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    resetFeedback();
    if (batchEntries.length === 0) {
      setError("Please upload a CSV or Excel file with price data.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/logs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          entries: batchEntries.map((e) => ({
            productName: e.productName,
            price: e.price,
            category: e.category || "Other",
            tags: e.tags || [],
          })),
          sellerId: sellerId.trim() || undefined,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Submission failed");
      }
      const data = await res.json();
      setSuccess(`${data.count} price entries logged successfully!`);
      setBatchEntries([]);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="h-full flex flex-col items-center max-w-2xl gap-6 md:gap-12">
      {/* Seller ID field (shared between tabs) */}
      <Field className="w-full">
        <Input
          placeholder="Are you a seller? Input your seller ID (e.g. S-yourstore)"
          value={sellerId}
          onChange={(e) => setSellerId(e.target.value)}
          className="text-center h-12 bg-white border placeholder:text-center placeholder:text-xs md:placeholder:text-sm"
        />
        <FieldDescription className="text-xs leading-loose">
          By attaching a seller ID, you are telling Costly that customers may
          come to you to purchase the listed product(s). Leave blank if you
          are not a registered seller.
        </FieldDescription>
      </Field>

      {/* Success / error feedback */}
      {success && (
        <div className="w-full flex items-center gap-2 rounded-xl bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-700 animate-in fade-in">
          <CheckCircle className="size-4 shrink-0" />
          {success}
        </div>
      )}
      {error && (
        <div className="w-full rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600 animate-in fade-in">
          {error}
        </div>
      )}

      {/* Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={(v) => { setActiveTab(v); resetFeedback(); }}
        className="w-full flex flex-col items-center gap-6"
      >
        <TabsList variant="line" className="self-end">
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

        <TabsContent value="single" className="w-full flex flex-col items-center gap-6">
          <form onSubmit={handleSingleSubmit} className="w-full flex flex-col items-center gap-6">
            <SingleLog data={singleData} onChange={(p) => setSingleData((prev) => ({ ...prev, ...p }))} />
            <CustomButton
              text={submitting ? "Sending…" : "Send to Costly"}
              type="submit"
              disabled={submitting}
            />
          </form>
        </TabsContent>

        <TabsContent value="batch" className="w-full flex flex-col items-center gap-6">
          <form onSubmit={handleBatchSubmit} className="w-full flex flex-col items-center gap-6">
            <BatchLog entries={batchEntries} onEntriesChange={setBatchEntries} />
            <CustomButton
              text={submitting ? "Sending…" : `Send to Costly${batchEntries.length > 0 ? ` (${batchEntries.length})` : ""}`}
              type="submit"
              disabled={submitting || batchEntries.length === 0}
            />
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LogsInterface;
