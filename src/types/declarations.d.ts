// Type declaration shims for packages without bundled types.
// These are placeholders until the proper @types packages are installed.

// papaparse – install @types/papaparse for full type coverage
declare module "papaparse" {
  interface ParseConfig {
    header?: boolean;
    skipEmptyLines?: boolean;
    complete?: (results: { data: Record<string, string>[] }) => void;
    error?: (error: Error) => void;
  }
  function parse(input: File | string, config: ParseConfig): void;
  export default { parse };
  export { parse };
}
