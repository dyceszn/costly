import SearchResultInterface from "@/components/search/SearchResultInterface";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="w-full flex flex-col items-center px-4 justify-end md:justify-normal h-full flex-1 md:flex-0 py-4 md:py-0">
      <SearchResultInterface id={id} />
    </div>
  );
}
