import Logo from "@/components/search/Logo";

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-16 min-h-screen">
      <div className="w-full flex flex-col items-center justify-end gap-12 sm:gap-18 h-[calc(100vh/1.8)] md:h-[calc(100vh/2.2)] lg:h-[calc(100vh/2.7)] min-h-[300px]">
        <h1 className="text-lg md:text-2xl">Welcome to</h1>
        <Logo />
      </div>
      <div className="w-full flex-1 flex flex-col">{children}</div>
    </div>
  );
}
