"use client";
import React, { useRef, useState } from "react";
import Footnotes from "../shared/Footnotes";
import { ShieldCheck, Upload, X } from "lucide-react";
import Papa from "papaparse";
import * as XLSX from "xlsx";

export interface ParsedBatchEntry {
  productName: string;
  price: number;
  category?: string;
  tags?: string[];
}

interface BatchLogProps {
  entries: ParsedBatchEntry[];
  onEntriesChange: (entries: ParsedBatchEntry[]) => void;
}

// Fuzzy-map common column name variants to our internal fields
function mapRow(row: Record<string, string>): ParsedBatchEntry | null {
  const keys = Object.keys(row).map((k) => k.toLowerCase().trim());
  const get = (variants: string[]) => {
    const key = keys.find((k) => variants.some((v) => k.includes(v)));
    return key ? row[Object.keys(row).find((k) => k.toLowerCase().trim() === key)!] : "";
  };

  const productName = get(["product", "name", "item"]);
  const rawPrice = get(["price", "amount", "cost"]);
  const category = get(["category", "cat", "type"]);
  const rawTags = get(["tag", "tags", "keyword"]);

  const price = parseFloat(rawPrice?.replace(/[^0-9.]/g, ""));
  if (!productName || !price || isNaN(price)) return null;

  return {
    productName,
    price,
    category: category || undefined,
    tags: rawTags ? rawTags.split(/[,;|]/).map((t) => t.trim().toLowerCase()).filter(Boolean) : [],
  };
}

const BatchLog: React.FC<BatchLogProps> = ({ entries, onEntriesChange }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [parsing, setParsing] = useState(false);
  const [parseError, setParseError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const parseFile = (file: File) => {
    setParseError(null);
    setParsing(true);

    const isExcel = file.name.match(/\.(xlsx?|xls)$/i);
    const isCsv = file.name.match(/\.csv$/i);

    if (!isExcel && !isCsv) {
      setParseError("Please upload a CSV or Excel (.xlsx, .xls) file.");
      setParsing(false);
      return;
    }

    if (isExcel) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target!.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: "array" });
          const sheet = workbook.Sheets[workbook.SheetNames[0]];
          const rows = XLSX.utils.sheet_to_json<Record<string, string>>(sheet, { defval: "" });
          const parsed = rows.map(mapRow).filter(Boolean) as ParsedBatchEntry[];
          if (parsed.length === 0) {
            setParseError("No valid rows found. Make sure your file has 'product name' and 'price' columns.");
          } else {
            onEntriesChange(parsed);
          }
        } catch {
          setParseError("Could not parse the Excel file. Please check the file format.");
        } finally {
          setParsing(false);
        }
      };
      reader.readAsArrayBuffer(file);
    } else {
      // CSV
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results: { data: Record<string, string>[] }) => {
          const rows = results.data;
          const parsed = rows.map(mapRow).filter(Boolean) as ParsedBatchEntry[];
          if (parsed.length === 0) {
            setParseError("No valid rows found. Make sure your file has 'product name' and 'price' columns.");
          } else {
            onEntriesChange(parsed);
          }
          setParsing(false);
        },
        error: () => {
          setParseError("Could not parse the CSV file.");
          setParsing(false);
        },
      });
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) parseFile(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) parseFile(file);
    e.target.value = "";
  };

  const clearEntries = () => {
    onEntriesChange([]);
    setParseError(null);
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Drop zone */}
      <div
        className={`w-full aspect-3/1 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors ${
          dragOver
            ? "border-brand-primary bg-brand-primary/5"
            : "bg-gray-50 hover:bg-gray-100"
        }`}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
      >
        <div className="p-2 bg-white rounded-full shadow-sm">
          <Upload className="size-5 text-slate-400" />
        </div>
        <p className="text-[11px] font-medium text-slate-500">
          {parsing ? "Parsing file…" : "Click or drag & drop your Excel or CSV file here."}
        </p>
        <input
          ref={inputRef}
          type="file"
          accept=".csv,.xlsx,.xls"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {/* Parse error */}
      {parseError && (
        <p className="text-xs text-red-500 text-center">{parseError}</p>
      )}

      {/* Preview table */}
      {entries.length > 0 && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <p className="text-[10px] uppercase tracking-widest text-text-2 font-bold">
              {entries.length} entries ready
            </p>
            <button
              type="button"
              onClick={clearEntries}
              className="flex items-center gap-1 text-[10px] text-text-muted hover:text-red-400 transition-colors"
            >
              <X className="size-3" /> Clear
            </button>
          </div>
          <div className="rounded-xl border overflow-hidden">
            <table className="w-full text-xs">
              <thead className="bg-neutral-50">
                <tr>
                  <th className="px-3 py-2 text-left font-semibold text-text-2">Product</th>
                  <th className="px-3 py-2 text-right font-semibold text-text-2">Price (₦)</th>
                  <th className="px-3 py-2 text-left font-semibold text-text-2 hidden sm:table-cell">Category</th>
                </tr>
              </thead>
              <tbody>
                {entries.slice(0, 5).map((entry, i) => (
                  <tr key={i} className="border-t border-neutral-100">
                    <td className="px-3 py-2 text-text-primary">{entry.productName}</td>
                    <td className="px-3 py-2 text-right text-text-primary">{entry.price.toLocaleString()}</td>
                    <td className="px-3 py-2 text-text-2 hidden sm:table-cell">{entry.category || "—"}</td>
                  </tr>
                ))}
                {entries.length > 5 && (
                  <tr className="border-t border-neutral-100">
                    <td colSpan={3} className="px-3 py-2 text-center text-text-muted">
                      +{entries.length - 5} more entries
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <Footnotes
        icon={<ShieldCheck className="size-4 shrink-0" />}
        text="For batch uploads, columns are auto-mapped. Your file must include 'product name' and 'price' columns."
      />
    </div>
  );
};

export default BatchLog;
